# Mobile Module 03

API integration and advanced weather application.

## Overview
This module focuses on integrating external APIs and building a feature-rich weather application with React Native.

## Projects

### Advanced Weather App
A polished weather application with advanced features:
- **WeatherBackground component**: Dynamic background based on weather conditions
- **Dark theme**: Dark UI with custom colors (#121212 background, #0A84FF accents)
- **Landscape support**: Responsive layout using useWindowDimensions
- **Advanced error handling**: Separate error types (weather, location, connection, cityNotFound)
- **StatusBar**: Light content for dark theme
- **Complex state management**: Consolidated appState object
- All features from Module 02 plus visual polish

## Topics Covered
- Custom background components
- Dark theme implementation
- Responsive design with useWindowDimensions
- Advanced error handling patterns
- StatusBar customization
- Complex state management (multiple loading/error states)
- Dynamic styling based on orientation
- Component composition and prop drilling

## Technologies
- **React Native**: Cross-platform mobile development framework
- **Expo**: Development toolchain
- **React**: JavaScript library
- **JavaScript/ES6**: Programming language
- **Weather API**: External data source

## Usage
Navigate to the advanced_weather_app directory and run:
```bash
# Using the run script (recommended)
./run rebuild  # Clean, install, and start with tunnel
./run start    # Start the development server
./run clean    # Clean project artifacts

# Or manually
npm install
npx expo start
```
