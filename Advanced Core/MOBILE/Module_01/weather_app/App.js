import { useState, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import PagerView from 'react-native-pager-view';

const SCREENS = [
  { key: '0', name: 'Currently', icon: 'today', iconOutline: 'today-outline' },
  { key: '1', name: 'Today', icon: 'calendar', iconOutline: 'calendar-outline' },
  { key: '2', name: 'Weekly', icon: 'calendar-clear', iconOutline: 'calendar-clear-outline' },
];

const TopBar = ({ searchText, setSearchText, onGeolocationPress }) => {
  return (
    <View style={styles.topBarContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={{marginRight: 10}} />
        <TextInput
          style={{flex: 1, fontSize: 16}}
          placeholder="Search for a city..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <TouchableOpacity onPress={onGeolocationPress} style={styles.geoButton}>
        <Ionicons name="location" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};


export default function App() {
  const [searchText, setSearchText] = useState('');
  const [isGeolocation, setIsGeolocation] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef(null);

  const handleGeolocationPress = () => {
    setIsGeolocation(true);
    setSearchText(''); // Clear search text when geolocation is used
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (isGeolocation) {
      setIsGeolocation(false); // Disable geolocation when user types
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
              <TopBar
                searchText={searchText}
                setSearchText={handleSearchTextChange}
                onGeolocationPress={handleGeolocationPress}
              />

              <PagerView ref={pagerRef} style={styles.pagerView} initialPage={0} onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}>
                {SCREENS.map(({ key, name }) => (
                  <View key={key} style={styles.page}>
                    <Text style={styles.pageText}>Tab: {name}</Text>
                    <Text style={styles.pageText}>
                        {isGeolocation ? "Geolocation" : (searchText ? `Searched for: ${searchText}`: "")}
                    </Text>
                  </View>
                ))}
              </PagerView>

              <View style={styles.tabBar}>
                {SCREENS.map(({ name, icon, iconOutline }, index) => (
                  <TouchableOpacity key={name} style={styles.tabItem} onPress={() => pagerRef.current?.setPage(index)}>
                    <Ionicons name={activeTab === index ? icon : iconOutline} size={24} color={activeTab === index ? '#007AFF' : 'gray'} />
                    <Text style={[styles.tabLabel, { color: activeTab === index ? '#007AFF' : 'gray' }]}>{name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  pagerView: { flex: 1 },
  page: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageText: { fontSize: 20 },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e0e0e0', paddingTop: 5, paddingBottom: 20 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  tabLabel: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  topBarContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10,
        borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0',
        borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 },
  geoButton: { marginLeft: 10, padding: 8 },
});
