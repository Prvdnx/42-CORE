import * as Location from 'expo-location';

export const LocationService = {
  async getCurrentPosition() {
    try {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        const permissionResult = await Location.requestForegroundPermissionsAsync();
        status = permissionResult.status;
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }
      }
      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      throw error;
    }
  }
};
