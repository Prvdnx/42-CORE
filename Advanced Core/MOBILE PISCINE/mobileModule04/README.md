# Mobile Module 04

Building a diary application with React Native.

## Overview
This module focuses on creating a diary/journal application, introducing data persistence and more complex app architecture.

## Project

### Diary App
A diary application with authentication:
- **Clerk authentication**: Sign in/sign up with secure token storage
- **5 screens**: WelcomeScreen, AuthOptionsScreen, EntriesListScreen, EntryDetailScreen, NewEntryScreen
- **Context API**: ThemeContext, OverlayContext, EntriesContext
- **Theme switching**: Light/dark mode with custom themes
- **SecureStore**: Secure token caching with expo-secure-store
- **Custom font**: Kalam_400Regular from Google Fonts
- **Navigation**: React Navigation with Stack Navigator
- **Conditional rendering**: SignedIn/SignedOut components

## Topics Covered
- Authentication with Clerk
- Secure token storage with SecureStore
- Context API for global state (Theme, Overlay, Entries)
- React Navigation (Stack Navigator)
- Conditional rendering based on auth state
- Custom fonts with expo-google-fonts
- SplashScreen handling
- Asset preloading with useAssets

## Technologies
- **React Native**: Cross-platform mobile development framework
- **Expo**: Development toolchain
- **React**: JavaScript library
- **Clerk**: Authentication service
- **Firebase Firestore**: Cloud database for diary entries
- **SecureStore**: Secure token storage
- **JavaScript/ES6**: Programming language

## Usage
Navigate to the diary_app directory and run:
```bash
# Using the run script (recommended)
./run rebuild  # Clean, install, and start with tunnel
./run start    # Start the development server
./run clean    # Clean project artifacts

# Or manually
npm install
npx expo start
```
