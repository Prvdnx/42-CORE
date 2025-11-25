import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 20,
      fontFamily: 'System', // Replace with a soft rounded font if available
    },
    illustration: {
      width: 100,
      height: 100,
      marginBottom: 40,
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 15,
      paddingHorizontal: 80,
      borderRadius: 25,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme.subtext,
    },
    dividerText: {
      marginHorizontal: 10,
      color: theme.subtext,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginBottom: 15,
      borderColor: theme.primary,
      borderWidth: 1,
    },
    socialIcon: {
      width: 24,
      height: 24,
      marginRight: 15,
    },
    socialButtonText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Diary App</Text>
      <Image 
        source={{ uri: 'https://img.icons8.com/ios/100/000000/book.png' }} 
        style={styles.illustration} 
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or continue with</Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity style={styles.socialButton}>
        <Image 
          source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} 
          style={styles.socialIcon} 
        />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Image 
          source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/github.png' }} 
          style={styles.socialIcon} 
        />
        <Text style={styles.socialButtonText}>Continue with GitHub</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
