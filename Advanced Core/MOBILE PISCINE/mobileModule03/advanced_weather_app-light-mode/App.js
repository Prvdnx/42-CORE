import { useState, useRef, useEffect, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import PagerView from 'react-native-pager-view';
import TopBar from './src/components/TopBar';
import WeatherBackground from './src/components/WeatherBackground';
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
  const [isGeolocation, setIsGeolocation] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState({ current: null, today: null, weekly: null });
  
  const [appState, setAppState] = useState({
    isLoadingLocation: false,
    isLocationDenied: false,
    isLoadingWeather: false,
    error: null,
  });

  const pagerRef = useRef(null);

  const handleError = (errorType, message = null) => {
    setAppState(prevState => ({ ...prevState, error: { type: errorType, message } }));
  };

  const clearState = (isLoading = true) => {
    setAppState({
      isLoadingLocation: false,
      isLocationDenied: false,
      isLoadingWeather: isLoading,
      error: null,
    });
    if (!isLoading) setWeatherData({ current: null, today: null, weekly: null });
  };

  const loadWeatherData = useCallback(async (location) => {
    if (!location?.latitude || !location?.longitude) return;

    clearState();
    setSelectedLocation(location);

    try {
      const [current, today, weekly] = await Promise.all([
        WeatherService.getCurrentWeather(location.latitude, location.longitude),
        WeatherService.getTodayForecast(location.latitude, location.longitude),
        WeatherService.getWeeklyForecast(location.latitude, location.longitude),
      ]);
      setWeatherData({ current, today, weekly });
    } catch (err) {
      if (err.message.includes('Network')) {
        handleError('connection', 'The service connection is lost, please check your internet connection or try again later');
      } else {
        handleError('weather', 'Unable to load weather data. Please try again later.');
      }
    } finally {
      setAppState(prev => ({ ...prev, isLoadingWeather: false }));
    }
  }, []);

  useEffect(() => {
    const askForGeolocation = async () => {
      setAppState(prev => ({ ...prev, isLoadingLocation: true }));
      try {
        const coords = await LocationService.getCurrentPosition();
        const locationNameData = await GeocodingService.getLocationName(coords.latitude, coords.longitude);
        
        // Correctly combine the objects, preserving the precise coordinates
        const location = {
          ...locationNameData, // Get the name and display info
          ...coords,          // Overwrite with precise, numeric coordinates
          isGeolocation: true,
        };

        setIsGeolocation(true);
        setSearchText(location.displayName);
        loadWeatherData(location);

      } catch (error) {
        setIsGeolocation(false);
        if (error.message.includes('denied')) {
          setAppState(prev => ({ ...prev, isLocationDenied: true, isLoadingLocation: false }));
        } else {
          handleError('location', 'Could not get your current location.');
        }
      } finally {
        setAppState(prev => ({ ...prev, isLoadingLocation: false }));
      }
    };
    askForGeolocation();
  }, [loadWeatherData]);

  const handleLocationSelected = (location) => {
    setIsGeolocation(location.isGeolocation || false);
    setSearchText(location.displayName);
    loadWeatherData(location);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <WeatherBackground>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
              <TopBar
                searchText={searchText}
                setSearchText={setSearchText}
                isGeolocation={isGeolocation}
                setIsGeolocation={setIsGeolocation}
                onLocationSelected={handleLocationSelected}
                onLocationDenied={() => setAppState(prev => ({ ...prev, isLocationDenied: true }))}
                onConnectionError={(msg) => handleError('connection', msg)}
                onCityNotFound={(msg) => handleError('cityNotFound', msg)}
                isLoadingLocation={appState.isLoadingLocation}
                setIsLoadingLocation={(loading) => setAppState(prev => ({ ...prev, isLoadingLocation: loading }))}
              />

              <PagerView ref={pagerRef} style={styles.pagerView} initialPage={0} onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}>
                {SCREENS.map(({ key, component: ScreenComponent, dataKey }) => (
                  <View key={key}>
                    <ScreenComponent
                      forecastData={weatherData[dataKey]}
                      weatherData={weatherData[dataKey]}
                      locationData={selectedLocation}
                      isLoading={appState.isLoadingWeather}
                      error={appState.error?.type === 'weather' ? appState.error.message : null}
                      connectionError={appState.error?.type === 'connection' ? appState.error.message : null}
                      cityNotFoundError={appState.error?.type === 'cityNotFound' ? appState.error.message : null}
                      isLocationDenied={appState.isLocationDenied}
                    />
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
        </WeatherBackground>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  pagerView: { flex: 1 },
  tabBar: { flexDirection: 'row', backgroundColor: 'rgba(248, 249, 250, 0.7)', borderTopWidth: 1, borderTopColor: '#e0e0e0',
     paddingTop: 5, paddingBottom: 20 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  tabLabel: { fontSize: 12, fontWeight: '600', marginTop: 4 },
});
