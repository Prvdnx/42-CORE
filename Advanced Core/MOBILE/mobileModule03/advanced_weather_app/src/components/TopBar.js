import { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeocodingService } from '../services/GeocodingService';
import { LocationService } from '../services/LocationService';

const TopBar = ({ searchText, setSearchText, isGeolocation, setIsGeolocation, onLocationSelected, onLocationDenied, onConnectionError, onCityNotFound, isLoadingLocation, setIsLoadingLocation, isLandscape }) => {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const styles = getStyles(isLandscape);

  useEffect(() => {
    const searchCities = async () => {
      if (searchText.length < 2 || isGeolocation) {
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
        if (onConnectionError && error.message.includes('Failed to fetch')) {
          onConnectionError('The service connection is lost, please check your internet connection or try again later');
        }
      } finally {
        setIsSearching(false);
      }
    };
    const timeoutId = setTimeout(searchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [searchText, isGeolocation, onConnectionError]);

  const handleGeolocationPress = useCallback(async () => {
    if (isGeolocation) {
      setIsGeolocation(false);
      setSearchText('');
      return;
    }
    setIsLoadingLocation(true);
    try {
      const coords = await LocationService.getCurrentPosition();
      const locationData = await GeocodingService.getLocationName(coords.latitude, coords.longitude);
      const location = { ...coords, ...locationData, isGeolocation: true };

      setIsGeolocation(true);
      setSearchText(location.displayName);
      setShowSuggestions(false);
      if (onLocationSelected) onLocationSelected(location);
    } catch (error) {
      console.error('Geolocation error:', error);
      const isDenied = error.message.includes('denied');
      Alert.alert(
        isDenied ? 'Location Access Denied' : 'Geolocation Error',
        isDenied ? 'Location permission was denied. You need to enable it in your device settings.' : 'Could not get your current location.',
        [{ text: 'OK' }]
      );
      if (isDenied && onLocationDenied) onLocationDenied();
    } finally {
      setIsLoadingLocation(false);
    }
  }, [isGeolocation, setIsLoadingLocation, setIsGeolocation, setSearchText, onLocationSelected, onLocationDenied]);

  const handleCitySelect = useCallback((city) => {
    setSearchText(city.displayName);
    setShowSuggestions(false);
    setIsGeolocation(false);
    Keyboard.dismiss();
    if (onLocationSelected) onLocationSelected({ ...city, isGeolocation: false });
  }, [setSearchText, setIsGeolocation, onLocationSelected]);

  const handleDirectSearch = useCallback(async () => {
    const trimmedText = searchText.trim();
    if (!trimmedText || isGeolocation || isSearching || trimmedText.includes(',')) return;

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
      if (onConnectionError) {
        onConnectionError('The service connection is lost, please check your internet connection or try again later');
      }
    } finally {
      setIsSearching(false);
    }
  }, [searchText, isGeolocation, isSearching, handleCitySelect, onCityNotFound, onConnectionError]);
  
  const clearSearch = () => {
    setSearchText('');
    setShowSuggestions(false);
    setCitySuggestions([]);
    setIsGeolocation(false);
  };

  const renderSearchAccessory = () => {
    if (isSearching) return <ActivityIndicator size="small" color="#0A84FF" style={styles.loadingIcon} />;
    if (searchText.length > 0) {
      return (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#A9A9A9" />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.topBar}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={isLandscape ? 16 : 20} color="#A9A9A9" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a city..."
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                if (isGeolocation && text !== selectedLocation?.displayName) setIsGeolocation(false);
              }}
              onSubmitEditing={handleDirectSearch}
              placeholderTextColor="#A9A9A9"
              editable={!isLoadingLocation}
              returnKeyType="search"
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {renderSearchAccessory()}
          </View>
          <TouchableOpacity style={[styles.geolocationButton, isGeolocation && styles.geolocationButtonActive]} onPress={handleGeolocationPress} disabled={isLoadingLocation}>
            {isLoadingLocation ? <ActivityIndicator size="small" color={isGeolocation ? '#fff' : '#0A84FF'} /> : <Ionicons name="location" size={isLandscape ? 18 : 24} color={isGeolocation ? '#fff' : '#0A84FF'} />}
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
                <Ionicons name="location-outline" size={16} color="#A9A9A9" />
                <View style={styles.suggestionTextContainer}>
                  <Text style={styles.suggestionName}>{item.name}</Text>
                  <Text style={styles.suggestionDetails}>{item.region && `${item.region}, `}{item.country}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const getStyles = (isLandscape) => StyleSheet.create({
  container: { backgroundColor: 'rgba(30, 30, 30, 0.85)', borderBottomWidth: 1, borderBottomColor: '#333333' },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: isLandscape ? 4 : 10, gap: 12 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#2c2c2e', borderRadius: 20, paddingHorizontal: 12, paddingVertical: isLandscape ? 4 : 8 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: isLandscape ? 14 : 16, color: '#FFFFFF' },
  loadingIcon: { marginLeft: 8 },
  clearButton: { padding: 4 },
  geolocationButton: { width: isLandscape ? 34 : 44, height: isLandscape ? 34 : 44, borderRadius: isLandscape ? 17 : 22, backgroundColor: '#2c2c2e', borderWidth: 1, borderColor: '#0A84FF', justifyContent: 'center', alignItems: 'center' },
  geolocationButtonActive: { backgroundColor: '#0A84FF' },
  suggestionsContainer: { backgroundColor: '#1E1E1E', borderBottomWidth: 1, borderBottomColor: '#333333', maxHeight: 200 },
  suggestionsList: { backgroundColor: '#1E1E1E' },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333333' },
  suggestionTextContainer: { marginLeft: 10, flex: 1 },
  suggestionName: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  suggestionDetails: { fontSize: 14, color: '#A9A9A9', marginTop: 2 },
});

export default TopBar;
