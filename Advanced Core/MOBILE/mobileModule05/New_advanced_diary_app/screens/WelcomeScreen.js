import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useTheme } from '../context/ThemeContext';

const WelcomeScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { startOAuthFlow: startGoogle } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startGithub } = useOAuth({ strategy: 'oauth_github' });

  const handleOAuth = React.useCallback(async (start) => {
    try {
      const { createdSessionId, setActive } = await start();
      if (createdSessionId) await setActive({ session: createdSessionId });
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <ImageBackground source={require('../assets/images/pexels-ken-cheung.jpg')} style={{flex: 1}}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image source={require('../assets/images/WritingGIF+.gif')} style={styles.gif} contentFit="contain" autoplay loop />
 
          <Text style={styles.title}>42 Diary App</Text>
          <Text style={styles.subtitle}>Your personal journal</Text>

          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => handleOAuth(startGoogle)}>
            <FontAwesome name="google" size={24} color="white" style={{ marginRight: 15 }} />
            <Text style={styles.primaryButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => handleOAuth(startGithub)}>
            <FontAwesome name="github" size={24} color="white" style={{ marginRight: 15 }} />
            <Text style={styles.secondaryButtonText}>Continue with GitHub</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const getStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, backgroundColor: 'transparent' },
  // iconContainer: { borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8, marginBottom: 8 },
  gif: { width: 200, height: 200, elevation: 8 },
  title: { fontSize: 28, fontWeight: '500', color: colors.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: colors.secondaryText, marginBottom: 32 },
  button: { width: '100%', height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 12,  maxWidth: 320, },
  primaryButton: { backgroundColor: '#5B8CFF',borderWidth: 1, borderColor: '#a8adb4ff', elevation: 5 },
  primaryButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },
  secondaryButton: { backgroundColor: '#161b22', borderWidth: 2, borderColor: '#30363d', elevation: 5 },
  secondaryButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },
});

export default WelcomeScreen;
