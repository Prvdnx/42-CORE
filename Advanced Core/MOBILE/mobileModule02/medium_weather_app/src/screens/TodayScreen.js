import { View, Text, StyleSheet, FlatList } from 'react-native';

const TodayScreen = ({ forecastData, locationData }) => {
  if (!forecastData || !locationData) {
    return <View style={styles.container}><Text>No data</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{locationData.displayName}</Text>
      <FlatList
        data={forecastData}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <View style={styles.hourlyItem}>
            <Text>{item.time}</Text>
            <Text>{item.temperature}°</Text>
            <Text>{item.description}</Text>
            <Text>{item.windSpeed} km/h</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  location: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  hourlyItem: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
});

export default TodayScreen;
