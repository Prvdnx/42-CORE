import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessageDisplay = ({ icon, title, message }) => (
  <View style={styles.messageContainer}>
    {icon && <Ionicons name={icon} size={48} color="#666" />}
    {title && <Text style={styles.emptyTitle}>{title}</Text>}
    {message && <Text style={styles.emptyMessage}>{message}</Text>}
  </View>
);

const WeatherScreenLayout = ({
  data,
  locationData,
  isLoading,
  error,
  connectionError,
  cityNotFoundError,
  isLocationDenied,
  children,
}) => {
  const displayError = connectionError || cityNotFoundError || error;

  return (
    <View style={styles.container}>
      {displayError ? (
        <View style={styles.messageContainer}>
          <Text style={styles.errorMessage}>{displayError}</Text>
        </View>
      ) : isLoading ? (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      ) : !data || !locationData ? (
        isLocationDenied ? (
          <MessageDisplay
            icon="location-outline"
            title="Geolocation Unavailable"
            message="Geolocation is not available, please enable it in your device settings or search for a city directly"
          />
        ) : (
          <MessageDisplay
            icon="location-outline"
            title="No Location Selected"
            message="Search for a city or use your current location to see weather data"
          />
        )
      ) : (
        children()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  messageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, },
  loadingText: { marginTop: 16, fontSize: 16, color: '#666' },
  errorMessage: { fontSize: 16, color: '#FF6B6B', textAlign: 'center', lineHeight: 24, },
  emptyTitle: { fontSize: 20, fontWeight: '600', color: '#333', marginTop: 16, marginBottom: 8, textAlign: 'center', },
  emptyMessage: { fontSize: 16, color: '#666', textAlign: 'center', lineHeight: 24, },
});

export default WeatherScreenLayout;
