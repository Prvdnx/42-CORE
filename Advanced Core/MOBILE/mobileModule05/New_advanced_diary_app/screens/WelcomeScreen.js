import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen } from 'lucide-react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useTheme } from '../context/ThemeContext';

const WelcomeScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // Provider-specific OAuth (works in Expo Go)
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
    <ImageBackground
      source={require('../assets/images/pexels-ken-cheung-3355734-5574638.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <LinearGradient colors={['#5B8CFF', '#4A7AE8']} style={styles.gradient}>
              <BookOpen color="white" size={32} strokeWidth={1.5} />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Diary App</Text>
          <Text style={styles.subtitle}>Your personal journal</Text>

          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => handleOAuth(startGoogle)}>
            <Text style={styles.primaryButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => handleOAuth(startGithub)}>
            <Text style={styles.secondaryButtonText}>Continue with GitHub</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const getStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, backgroundColor: colors.background },
  iconContainer: { borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8, marginBottom: 8 },
  gradient: { width: 88, height: 88, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '500', color: colors.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: colors.secondaryText, marginBottom: 32 },
  button: { width: '100%', height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 12 },
  primaryButton: { backgroundColor: '#5B8CFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  primaryButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },
  secondaryButton: { backgroundColor: '#161b22' },
  secondaryButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },
});

export default WelcomeScreen;
