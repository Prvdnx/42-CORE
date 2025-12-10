# Mobile Module 01

Building a weather application with React Native.

## Overview
This module focuses on creating a weather app, introducing API integration and data display in React Native.

## Project

### Weather App
A weather app UI skeleton featuring:
- Search bar with city search functionality
- Geolocation button for current location
- Three tab navigation (Currently, Today, Weekly)
- PagerView for swipeable screens
- Basic state management with React hooks
- No actual weather API integration yet (displays search text and geolocation status)

## Topics Covered
- React Native core components (View, Text, TouchableOpacity, TextInput)
- PagerView for swipeable tabs
- SafeAreaView for notch/status bar handling
- State management with useState and useRef
- Ionicons for icons
- KeyboardAvoidingView for iOS keyboard handling

## Technologies
- **React Native**: Cross-platform mobile development framework
- **Expo**: Development toolchain
- **React**: JavaScript library
- **JavaScript/ES6**: Programming language

## Usage
Navigate to the weather_app directory and run:
```bash
# Using the run script (recommended)
./run rebuild  # Clean, install, and start with tunnel
./run start    # Start the development server
./run clean    # Clean project artifacts

# Or manually
npm install
npx expo start
```
