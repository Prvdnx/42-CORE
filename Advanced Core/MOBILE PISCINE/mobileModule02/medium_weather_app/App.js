import { useState, useRef, useEffect, useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import TopBar from './src/components/TopBar';
import CurrentlyScreen from './src/screens/CurrentlyScreen';
import TodayScreen from './src/screens/TodayScreen';
import WeeklyScreen from './src/screens/WeeklyScreen';
import { WeatherService } from './src/services/WeatherService';
import { LocationService } from './src/services/LocationService';
import { GeocodingService } from './src/services/GeocodingService';

const SCREENS = [
  { key: '0', name: 'Currently', component: CurrentlyScreen, dataKey: 'current', icon: 'today', iconOutline: 'today-outline' },
  { key: '1', name: 'Today', component: TodayScreen, dataKey: 'today', icon: 'calendar', iconOutline: 'calendar-outline' },
  { key: '2', name: 'Weekly', component: WeeklyScreen, dataKey: 'weekly', icon: 'calendar-clear', iconOutline: 'calendar-clear-outline' },
];

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState({ current: null, today: null, weekly: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pagerRef = useRef(null);

  const loadWeatherData = useCallback(async (location) => {
    if (!location?.latitude || !location?.longitude) return;

    setIsLoading(true);
    setError(null);
    setSelectedLocation(location);

    try {
      const [current, today, weekly] = await Promise.all([
        WeatherService.getCurrentWeather(location.latitude, location.longitude),
        WeatherService.getTodayForecast(location.latitude, location.longitude),
        WeatherService.getWeeklyForecast(location.latitude, location.longitude),
      ]);
      setWeatherData({ current, today, weekly });
    } catch (err) {
      setError('Could not load weather data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const askForGeolocation = async () => {
      try {
        const coords = await LocationService.getCurrentPosition();
        const locationNameData = await GeocodingService.getLocationName(coords.latitude, coords.longitude);
        const location = { ...locationNameData, ...coords, isGeolocation: true };
        loadWeatherData(location);
        setSearchText(location.displayName);
      } catch (error) {
        console.error(error);
        setError('Permission to access location was denied.');
      }
    };
    askForGeolocation();
  }, [loadWeatherData]);

  const handleLocationSelected = (location) => {
    setSearchText(location.displayName);
    loadWeatherData(location);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'}>
          <View style={styles.container}>
            <TopBar
              searchText={searchText}
              setSearchText={setSearchText}
              onLocationSelected={handleLocationSelected}
              onLocationDenied={() => setError('Permission to access location was denied.')}
              onCityNotFound={(message) => setError(message)}
            />

            <PagerView ref={pagerRef} style={styles.pagerView} initialPage={0} onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}>
              {SCREENS.map(({ key, component: ScreenComponent, dataKey }) => (
                <View key={key}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                  ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                  ) : (
                    <ScreenComponent
                      forecastData={weatherData[dataKey]}
                      weatherData={weatherData[dataKey]}
                      locationData={selectedLocation}
                    />
                  )}
                </View>
              ))}
            </PagerView>

            <SafeAreaView edges={['bottom']}>
              <View style={styles.tabBar}>
                {SCREENS.map(({ name, icon, iconOutline }, index) => (
                  <TouchableOpacity key={name} style={styles.tabItem} onPress={() => pagerRef.current?.setPage(index)}>
                    <Ionicons name={activeTab === index ? icon : iconOutline} size={24} color={activeTab === index ? '#007AFF' : 'gray'} />
                    <Text style={[styles.tabLabel, { color: activeTab === index ? '#007AFF' : 'gray' }]}>{name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  pagerView: { flex: 1 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e0e0e0', paddingTop: 5 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  tabLabel: { fontSize: 12, fontWeight: '600', marginTop: 4 },
});
