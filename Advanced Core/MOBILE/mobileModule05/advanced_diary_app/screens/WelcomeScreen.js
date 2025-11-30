import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { colors, isLandscape, fontFamily } = useTheme();
  const styles = getStyles(colors, isLandscape, fontFamily);


  return (
    <View style={{ flex: 1 }}>
      <Image source={require('../assets/images/pexels-ken-cheung.jpg')} style={StyleSheet.absoluteFill} contentFit="cover" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <Image source={require('../assets/images/WritingGIF+.gif')} style={styles.gif} contentFit="contain" autoplay loop />
            <Text style={styles.title}>Welcome to your Diary</Text>
          </View>

          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => navigation.navigate('AuthOptions')}>
            <FontAwesome name="sign-in" size={24} color="white" style={{ marginRight: 15 }} />
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const getStyles = (colors, isLandscape, fontFamily) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingBottom: !isLandscape ? 60 : 0, backgroundColor: 'transparent' },
  gif: { width: 130, height: 140, elevation: 8 },
  title: { fontSize: 52, fontWeight: '500', textAlign: 'center', color: colors.text, letterSpacing: -0.5, fontFamily },
  button: {
    width: '35%', height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
    marginTop: !isLandscape ? 122 : 0, maxWidth: 320,
  },
  primaryButton: { backgroundColor: '#2d76f461', borderWidth: 2, borderColor: '#a8adb4ff', elevation: 5 },
  primaryButtonText: { color: 'white', fontSize: 20, fontWeight: '500' },
});

export default WelcomeScreen;

// #2d76f4ff #a8adb4ff