import { View, Text, StyleSheet, FlatList } from 'react-native';

const WeeklyScreen = ({ forecastData, locationData }) => {
  if (!forecastData || !locationData) {
    return <View style={styles.container}><Text>No data</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{locationData.displayName}</Text>
      <FlatList
        data={forecastData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.dailyItem}>
            <Text>{item.date}</Text>
            <Text>Min: {item.minTemp}°</Text>
            <Text>Max: {item.maxTemp}°</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  location: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  dailyItem: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
});

export default WeeklyScreen;
