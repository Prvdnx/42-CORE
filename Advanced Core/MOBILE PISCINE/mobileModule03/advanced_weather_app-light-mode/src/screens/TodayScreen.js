import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TemperatureChart from '../components/TemperatureChart';
import WeatherScreenLayout from '../components/WeatherScreenLayout';
import { getWeatherIcon } from '../utils/weatherUtils';

const TodayScreen = ({ forecastData, locationData, isLoading, error, connectionError, cityNotFoundError, isLocationDenied }) => {
  return (
    <WeatherScreenLayout
      data={forecastData}
      locationData={locationData}
      isLoading={isLoading}
      error={error}
      connectionError={connectionError}
      cityNotFoundError={cityNotFoundError}
      isLocationDenied={isLocationDenied}
    >
      {() => (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header with location */}
          <View style={styles.header}>
            <View style={styles.locationContainer}>
              <Ionicons 
                name={locationData.isGeolocation ? "location" : "location-outline"} 
                size={18} 
                color="#007AFF" 
              />
              <Text style={styles.locationText}>{locationData.displayName}</Text>
            </View>
            <Text style={styles.headerTitle}>Today's Forecast</Text>
          </View>

          {/* Temperature Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Today temperatures</Text>
            <TemperatureChart forecastData={forecastData} />
          </View>

          {/* List Header */}
          <View style={styles.listHeader}>
            <Text style={styles.columnHeader}>Time</Text>
            <Text style={styles.columnHeader}>Temp</Text>
            <Text style={styles.columnHeader}>Weather</Text>
            <Text style={styles.columnHeader}>Wind</Text>
          </View>

          {/* Hourly Forecast List */}
          <View style={styles.forecastContent}>
            {forecastData.map((item, index) => {
              const isCurrentHour = index === 0;
              return (
                <View key={index} style={[styles.hourlyItem, isCurrentHour && styles.currentHourItem]}>
                  <View style={styles.timeContainer}>
                    <Text style={[styles.hourText, isCurrentHour && styles.currentHourText]}>
                      {isCurrentHour ? 'Now' : item.time}
                    </Text>
                  </View>
                  <View style={styles.temperatureContainer}>
                    <Text style={[styles.temperatureText, isCurrentHour && styles.currentTemperatureText]}>
                      {item.temperature}°
                    </Text>
                  </View>
                  <View style={styles.weatherContainer}>
                    <Ionicons 
                      name={getWeatherIcon(item.weatherCode)} 
                      size={24} 
                      color="#FFA500" 
                    />
                    <Text style={[styles.descriptionText, isCurrentHour && styles.currentDescriptionText]}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={styles.windContainer}>
                    <Ionicons name="speedometer-outline" size={16} color="#45B7D1" />
                    <Text style={[styles.windText, isCurrentHour && styles.currentWindText]}>
                      {item.windSpeed} km/h
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Spacer at the bottom for full scroll */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </WeatherScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { paddingHorizontal: 20, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
     backgroundColor: 'rgba(255, 255, 255, 0.8)', marginHorizontal: 10, marginTop: 10, borderRadius: 12, },
  locationContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8, },
  locationText: { fontSize: 14, color: '#666', marginLeft: 6 },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333', textAlign: 'center' },
  chartContainer: { backgroundColor: 'rgba(255, 255, 255, 0.9)', marginHorizontal: 10, marginVertical: 10, borderRadius: 16,
     paddingVertical: 15, paddingHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowRadius: 4,
     shadowOpacity: 0.1, elevation: 3, },
  chartTitle: { fontSize: 16, fontWeight: '600', color: '#333', textAlign: 'center', marginBottom: 10, },
  forecastContent: { paddingHorizontal: 20, paddingBottom: 20 },
  bottomSpacer: { height: 100 },
  listHeader: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginTop: 10,
     marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 8, marginHorizontal: 5, },
  columnHeader: { flex: 1, fontSize: 14, fontWeight: '600', color: '#666', textAlign: 'center', },
  hourlyItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12,  borderBottomColor: '#f5f5f5',
     borderBottomWidth: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)', marginVertical: 1, borderRadius: 6, marginHorizontal: 5, },
  currentHourItem: { backgroundColor: 'rgba(240, 248, 255, 0.9)', borderRadius: 8, marginBottom: 10, paddingHorizontal: 8, },
  hourText: { flex: 1, fontSize: 15, color: '#333', textAlign: 'center', fontWeight: '500', },
  currentHourText: { color: '#007AFF', fontWeight: '600', paddingTop: 3, paddingRight: 18 },
  temperatureText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#333', textAlign: 'center', paddingLeft: 40, },
  currentTemperatureText: { color: '#007AFF', fontSize: 18 },
  descriptionText: { fontSize: 10, color: '#666', textAlign: 'center', marginLeft: 4, },
  currentDescriptionText: { color: '#007AFF', fontWeight: '500' },
  windText: { fontSize: 10, color: '#666', textAlign: 'center', marginLeft: 4, },
  currentWindText: { color: '#007AFF', fontWeight: '500' },
  timeContainer: { flex: 1, alignItems: 'center' },
  temperatureContainer: { flex: 1, alignItems: 'center' },
  weatherContainer: { flex: 2, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', },
  windContainer: { flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', },
});

export default TodayScreen;
