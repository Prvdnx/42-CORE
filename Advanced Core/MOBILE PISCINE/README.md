# Mobile Piscine

A comprehensive introduction to mobile development using React Native and Expo, progressing from basic UI concepts to advanced features like authentication and API integration.

## Overview

This piscine consists of 6 modules that progressively build mobile development skills:
- **Modules 00-03**: Focus on weather applications with increasing complexity
- **Modules 04-05**: Focus on diary applications with authentication and navigation

## Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development toolchain and platform
- **React Navigation**: Navigation library
- **Clerk**: Authentication service (Modules 04-05)
- **Context API**: State management
- **Weather APIs**: External data integration (Modules 02-03)

## Modules

### [Module 00](mobileModule00/) - Introduction to React Native
Introduction to React Native basics with Expo.
- **Projects**: ex00, ex01, ex02, calculator_app
- **Focus**: Core components, state management, responsive layouts
- **Key Topics**: TouchableOpacity, useState, useRef, portrait/landscape modes

### [Module 01](mobileModule01/) - UI Fundamentals
Building a weather app UI skeleton.
- **Project**: weather_app
- **Focus**: Navigation, tabs, search functionality
- **Key Topics**: PagerView, SafeAreaView, Ionicons, KeyboardAvoidingView
- **Note**: UI only, no actual API integration

### [Module 02](mobileModule02/) - API Integration
First real weather app with API integration.
- **Project**: medium_weather_app
- **Focus**: Weather API, geolocation, geocoding services
- **Key Topics**: Async/await, Promise.all, useCallback, useEffect, error handling
- **Services**: WeatherService, LocationService, GeocodingService

### [Module 03](mobileModule03/) - Advanced Features
Polished weather app with advanced UI/UX.
- **Project**: advanced_weather_app (+ light mode variant)
- **Focus**: Dark theme, responsive design, advanced error handling
- **Key Topics**: WeatherBackground component, useWindowDimensions, StatusBar, complex state management
- **Features**: Dynamic backgrounds, landscape support, consolidated error states

### [Module 04](mobileModule04/) - Authentication
Diary app with user authentication.
- **Project**: diary_app
- **Focus**: Clerk authentication, secure storage, Context API
- **Key Topics**: SecureStore, SignedIn/SignedOut, custom fonts, SplashScreen
- **Screens**: Welcome, AuthOptions, EntriesList, EntryDetail, NewEntry (5 total)
- **Contexts**: Theme, Overlay, Entries

### [Module 05](mobileModule05/) - Advanced Navigation
Enhanced diary with tab navigation and calendar views.
- **Project**: advanced_diary_app
- **Focus**: Tab navigation, calendar/agenda views
- **Key Topics**: TabNavigator component, complex navigation hierarchies (Stack + Tab)
- **Screens**: All Module 04 screens + AgendaScreen (6 total)
- **New Feature**: Calendar-based entry organization

## Running Projects

Each module (01-05) includes a `run` script for easy project management:

```bash
# Navigate to any project directory
cd mobileModule01/weather_app

# Clean, install, and start with tunnel
./run rebuild

# Start development server
./run start

# Clean project artifacts
./run clean

# Or manually
npm install
npx expo start
```

## Learning Path

1. **Module 00**: Learn React Native basics and component fundamentals
2. **Module 01**: Build UI layouts and navigation patterns
3. **Module 02**: Integrate external APIs and handle async operations
4. **Module 03**: Polish UI with themes, responsive design, and error handling
5. **Module 04**: Implement authentication and global state management
6. **Module 05**: Master complex navigation patterns and calendar UIs

## Prerequisites

- Node.js and npm installed
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Expo Go app on physical device (optional)

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Clerk Documentation](https://clerk.com/docs)
