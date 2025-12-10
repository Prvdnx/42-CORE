# Mobile Module 05

Advanced diary application with enhanced features.

## Overview
This module builds upon Module 04 with an advanced diary application featuring more sophisticated functionality and better architecture.

## Project

### Advanced Diary App
Enhanced diary with tab navigation:
- **TabNavigator**: Bottom tab navigation component for multiple views
- **AgendaScreen**: Calendar/agenda view for entries (new screen)
- **6 screens total**: WelcomeScreen, AuthOptionsScreen, EntriesListScreen, EntryDetailScreen, NewEntryScreen, AgendaScreen
- All authentication and theming features from Module 04
- More complex navigation structure (Stack + Tab navigators)
- Calendar-based entry organization

## Topics Covered
- Tab navigation with React Navigation
- Calendar/agenda views for date-based data
- Complex navigation hierarchies (Stack + Tab)
- All Module 04 topics plus:
  - Multiple navigation patterns
  - Calendar UI components
  - Date-based data organization

## Technologies
- **React Native**: Cross-platform mobile development framework
- **Expo**: Development toolchain
- **React**: JavaScript library
- **AsyncStorage**: Local data persistence
- **JavaScript/ES6**: Programming language

## Usage
Navigate to the advanced_diary_app directory and run:
```bash
# Using the run script (recommended)
./run rebuild  # Clean, install, and start with tunnel
./run start    # Start the development server
./run clean    # Clean project artifacts

# Or manually
npm install
npx expo start
```
