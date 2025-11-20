import * as Location from 'expo-location';

export const LocationService = {
  // Request permissions and get the current position
  async getCurrentPosition() {
    try {
      // First, check existing permissions
      let { status } = await Location.getForegroundPermissionsAsync();
      
      // If no permission, request it
      if (status !== 'granted') {
        const permissionResult = await Location.requestForegroundPermissionsAsync();
        status = permissionResult.status;
        
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }
      }

      // Get the current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 15000, // 15-second timeout
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      throw error;
    }
  }
};
