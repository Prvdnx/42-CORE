import { ImageBackground, StyleSheet } from 'react-native';

const WeatherBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/weather_background.jpeg')} style={styles.container}
      resizeMode="cover" imageStyle={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, },
  backgroundImage: { flex: 1, resizeMode: 'cover', },
});

export default WeatherBackground;
