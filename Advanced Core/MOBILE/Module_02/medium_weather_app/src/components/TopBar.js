import { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeocodingService } from '../services/GeocodingService';
import { LocationService } from '../services/LocationService';

const TopBar = ({ searchText, setSearchText, onLocationSelected, onLocationDenied, onCityNotFound }) => {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const searchCities = async () => {
      if (searchText.length < 2) {
        setCitySuggestions([]);
        setShowSuggestions(false);
        return;
      }
      setIsSearching(true);
      try {
        const cities = await GeocodingService.searchCities(searchText);
        setCitySuggestions(cities.slice(0, 5));
        setShowSuggestions(cities.length > 0);
      } catch (error) {
        console.error('Search error:', error);
        setShowSuggestions(false);
      } finally {
        setIsSearching(false);
      }
    };
    const timeoutId = setTimeout(searchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleCitySelect = (city) => {
    setSearchText(city.displayName);
    setShowSuggestions(false);
    Keyboard.dismiss();
    if (onLocationSelected) onLocationSelected(city);
  };

  const handleDirectSearch = async () => {
    const trimmedText = searchText.trim();
    if (!trimmedText || (trimmedText.includes(',') && trimmedText.split(',').length >= 2)) return;

    setIsSearching(true);
    Keyboard.dismiss();
    try {
      const cities = await GeocodingService.searchCities(trimmedText);
      if (cities.length > 0) {
        handleCitySelect(cities[0]);
      } else if (onCityNotFound) {
        onCityNotFound('Could not find any result for the supplied address or coordinate');
      }
    } catch (error) {
      console.error('Direct search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGeolocationPress = async () => {
    try {
      const coords = await LocationService.getCurrentPosition();
      if (onLocationSelected) onLocationSelected({ ...coords, isGeolocation: true });
    } catch (error) {
      console.error('Geolocation error:', error);
      if (onLocationDenied) onLocationDenied();
    }
  };

  return (
    <View>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.topBar}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a city..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleDirectSearch}
              placeholderTextColor="#999"
              returnKeyType="search"
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </View>
          <TouchableOpacity style={styles.geolocationButton} onPress={handleGeolocationPress}>
            <Ionicons name="location" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {showSuggestions && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={citySuggestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionItem} onPress={() => handleCitySelect(item)}>
                <Text>{item.displayName}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 12 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 },
  searchInput: { flex: 1, fontSize: 16 },
  searchIcon: { marginRight: 8 },
  geolocationButton: { padding: 8 },
  suggestionsContainer: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  suggestionItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
});

export default TopBar;
