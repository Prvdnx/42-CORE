import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WeeklyTemperatureChart from '../components/WeeklyTemperatureChart';
import WeatherScreenLayout from '../components/WeatherScreenLayout';
import { getWeatherIcon } from '../utils/weatherUtils';

const WeeklyScreen = ({ forecastData, locationData, isLoading, error, connectionError, cityNotFoundError, isLocationDenied }) => {
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
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Weekly Temperature Forecast</Text>
            <WeeklyTemperatureChart forecastData={forecastData} />
          </View>
          
          <View style={styles.dailyListContainer}>
            <Text style={styles.listTitle}>7-Day Forecast</Text>
            {forecastData.map((item, index) => {
              const dayName = index === 0 ? 'Today' : item.date.split(',')[0].trim();
              const datePart = item.date.split(',')[1].trim();
              
              return (
                <View key={index} style={styles.dailyItem}>
                  <View style={styles.dayInfo}>
                    <Text style={styles.dayName}>{dayName}</Text>
                    <Text style={styles.date}>{datePart}</Text>
                  </View>
                  
                  <View style={styles.weatherInfo}>
                    <Ionicons 
                      name={getWeatherIcon(item.weatherCode)} 
                      size={24} 
                      color="#0A84FF" 
                    />
                    <View style={styles.tempRange}>
                      <Text style={styles.maxTemp}>
                        {item.maxTemp}°
                      </Text>
                      <Text style={styles.minTemp}>
                        {item.minTemp}°
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </WeatherScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  chartContainer: { backgroundColor: 'rgba(30, 30, 30, 0.85)', marginHorizontal: 20, marginTop: 20, marginBottom: 10, borderRadius: 12, padding: 16 },
  chartTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  dailyListContainer: { backgroundColor: 'rgba(30, 30, 30, 0.85)', marginHorizontal: 20, marginBottom: 20, borderRadius: 12, padding: 16 },
  listTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginBottom: 16 },
  dailyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333333' },
  dayInfo: { flex: 1 },
  dayName: { fontSize: 16, fontWeight: '500', color: '#FFFFFF' },
  date: { fontSize: 14, color: '#A9A9A9', marginTop: 2 },
  weatherInfo: { flexDirection: 'row', alignItems: 'center' },
  tempRange: { marginLeft: 12, alignItems: 'flex-end' },
  maxTemp: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  minTemp: { fontSize: 14, color: '#A9A9A9' },
});

export default WeeklyScreen;
