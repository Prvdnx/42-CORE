import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WeatherScreenLayout from '../components/WeatherScreenLayout';
import { getWeatherIconAndColor } from '../utils/weatherUtils';

const CurrentlyScreen = ({ weatherData, locationData, isLoading, error, connectionError, cityNotFoundError, isLocationDenied }) => {
  return (
    <WeatherScreenLayout
      data={weatherData}
      locationData={locationData}
      isLoading={isLoading}
      error={error}
      connectionError={connectionError}
      cityNotFoundError={cityNotFoundError}
      isLocationDenied={isLocationDenied}
    >
      {() => (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Location */}
            <View style={styles.locationContainer}>
              <Ionicons 
                name={locationData.isGeolocation ? "location" : "location-outline"} 
                size={20} 
                color="#0A84FF" 
              />
              <Text style={styles.locationText}>{locationData.displayName}</Text>
            </View>

            {/* Main Temperature */}
            <View style={styles.temperatureContainer}>
              <Ionicons 
                name={getWeatherIconAndColor(weatherData.weatherCode).icon} 
                size={120} 
                color={getWeatherIconAndColor(weatherData.weatherCode).color}
                style={styles.weatherIcon}
              />
              <Text style={styles.temperature}>
                {weatherData.temperature}°{weatherData.unit?.replace('°', '') || 'C'}
              </Text>
              <Text style={styles.description}>{weatherData.description}</Text>
            </View>

            {/* Weather Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Ionicons name="water-outline" size={24} color="#4ECDC4" />
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="speedometer-outline" size={24} color="#45B7D1" />
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>{weatherData.windSpeed} km/h</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </WeatherScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollContent: { flexGrow: 1, paddingBottom: 320 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, paddingHorizontal: 20, paddingVertical: 12, backgroundColor: 'rgba(30, 30, 30, 0.85)', borderRadius: 20, maxWidth: '90%', alignSelf: 'center' },
  locationText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginLeft: 8, textAlign: 'center' },
  temperatureContainer: { alignItems: 'center', marginBottom: 40, backgroundColor: 'rgba(30, 30, 30, 0.85)', paddingVertical: 20, paddingHorizontal: 60, borderRadius: 15, marginHorizontal: 20, maxWidth: '90%', alignSelf: 'center' },
  weatherIcon: { marginBottom: 10 },
  temperature: { fontSize: 80, fontWeight: '200', color: '#FFFFFF', textAlign: 'center' },
  description: { fontSize: 22, fontWeight: '500', color: '#A9A9A9', marginTop: 8, textAlign: 'center', textTransform: 'capitalize' },
  detailsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', maxWidth: 350, backgroundColor: 'rgba(30, 30, 30, 0.85)', paddingVertical: 20, paddingHorizontal: 15, borderRadius: 15, marginHorizontal: 20, alignSelf: 'center' },
  detailItem: { alignItems: 'center', flex: 1, paddingHorizontal: 10 },
  detailLabel: { fontSize: 14, color: '#A9A9A9', marginTop: 8, marginBottom: 4, textAlign: 'center' },
  detailValue: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
});

export default CurrentlyScreen;
