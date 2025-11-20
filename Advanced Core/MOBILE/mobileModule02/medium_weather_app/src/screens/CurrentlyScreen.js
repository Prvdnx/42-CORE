import { View, Text, StyleSheet } from 'react-native';

const CurrentlyScreen = ({ weatherData, locationData }) => {
  if (!weatherData || !locationData) {
    return <View style={styles.container}><Text>No data</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text>{locationData.displayName}</Text>
      <Text>Temperature: {weatherData.temperature}°</Text>
      <Text>Description: {weatherData.description}</Text>
      <Text>Wind Speed: {weatherData.windSpeed} km/h</Text>
      <Text>Humidity: {weatherData.humidity}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CurrentlyScreen;
