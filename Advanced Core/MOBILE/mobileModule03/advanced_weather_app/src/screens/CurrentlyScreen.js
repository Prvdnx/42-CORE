import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WeatherScreenLayout from '../components/WeatherScreenLayout';
import { getWeatherIconAndColor } from '../utils/weatherUtils';

const CurrentlyScreen = ({ weatherData, locationData, isLoading, error, connectionError, cityNotFoundError, isLocationDenied }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const styles = getStyles(isLandscape);

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
          {isLandscape ? (
            // --- LANDSCAPE LAYOUT ---
            <View style={styles.landscapeContainer}>
              <View style={styles.temperatureContainer}>
                <Ionicons 
                  name={getWeatherIconAndColor(weatherData.weatherCode).icon} 
                  size={80} 
                  color={getWeatherIconAndColor(weatherData.weatherCode).color}
                />
                <Text style={styles.temperature}>{weatherData.temperature}°</Text>
                <Text style={styles.description}>{weatherData.description}</Text>
              </View>

              <View style={styles.rightColumn}>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={16} color="#0A84FF" />
                  <Text style={styles.locationText}>{locationData.displayName}</Text>
                </View>
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
            </View>
          ) : (
            // --- PORTRAIT LAYOUT ---
            <View style={styles.content}>
              <View style={styles.locationContainer}>
                <Ionicons 
                  name={locationData.isGeolocation ? "location" : "location-outline"} 
                  size={20} 
                  color="#0A84FF" 
                />
                <Text style={styles.locationText}>{locationData.displayName}</Text>
              </View>
              <View style={styles.temperatureContainer}>
                <Ionicons 
                  name={getWeatherIconAndColor(weatherData.weatherCode).icon} 
                  size={120} 
                  color={getWeatherIconAndColor(weatherData.weatherCode).color}
                />
                <Text style={styles.temperature}>{weatherData.temperature}°</Text>
                <Text style={styles.description}>{weatherData.description}</Text>
              </View>
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
          )}
        </ScrollView>
      )}
    </WeatherScreenLayout>
  );
};

const getStyles = (isLandscape) => StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  landscapeContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 },
  rightColumn: { justifyContent: 'center', alignItems: 'center', marginLeft: 20 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30, 30, 30, 0.85)', padding: 12, borderRadius: 20, marginBottom: isLandscape ? 20 : 32 },
  locationText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginLeft: 8 },
  temperatureContainer: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(30, 30, 30, 0.85)', borderRadius: 15, padding: 20, marginBottom: isLandscape ? 0 : 40 },
  temperature: { fontSize: isLandscape ? 60 : 80, fontWeight: '200', color: '#FFFFFF' },
  description: { fontSize: isLandscape ? 18 : 22, fontWeight: '500', color: '#A9A9A9', marginTop: 8, textTransform: 'capitalize' },
  detailsContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgba(30, 30, 30, 0.85)', borderRadius: 15, padding: 20, alignSelf: 'stretch' },
  detailItem: { alignItems: 'center', flex: 1 },
  detailLabel: { fontSize: 14, color: '#A9A9A9', marginTop: 8, marginBottom: 4 },
  detailValue: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
});

export default CurrentlyScreen;
