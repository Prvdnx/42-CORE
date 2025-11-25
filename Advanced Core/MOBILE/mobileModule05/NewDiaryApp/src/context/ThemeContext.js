import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

const lightColors = {
  primary: '#5B8CFF',
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: '#1C1C1E',
  subtext: '#6C6C6E',
  accent: '#FFD700',
  // other colors...
};

const darkColors = {
  primary: '#5B8CFF',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  subtext: '#A9A9A9',
  accent: '#FFD700',
  // other colors...
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const theme = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
