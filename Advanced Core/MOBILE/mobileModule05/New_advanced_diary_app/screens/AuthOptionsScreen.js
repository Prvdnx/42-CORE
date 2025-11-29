import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useTheme, } from '../context/ThemeContext';

const AuthOptionsScreen = () => {
  const { colors, isLandscape } = useTheme();
  const styles = getStyles(colors, isLandscape);

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
          <Image source={require('../assets/images/WritingGIF+.gif')} style={styles.smallGif} contentFit="contain" autoplay loop />
          <Text style={styles.subtitle}>Login to document your feelings daily</Text>
          
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => handleOAuth(startGoogle)}>
            <FontAwesome name="google" size={24} color="#DB4437" style={{ marginRight: 15 }} />
            <Text style={styles.secondaryButtonText}>Continue with Google</Text>
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

const getStyles = (colors, isLandscape) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingBottom: !isLandscape ? 70 : 0 , backgroundColor: 'transparent' },
  smallGif: { width: 120, height: 120, elevation: 8, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.secondaryText, marginBottom: 24 },
  button: { width: '100%', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 12, maxWidth: 320 },
  secondaryButton: { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderWidth: 2, borderColor: '#272a2eff', elevation: 5 },
  secondaryButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },
});

export default AuthOptionsScreen;
