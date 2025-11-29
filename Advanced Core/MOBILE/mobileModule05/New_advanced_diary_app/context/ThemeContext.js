import React, { createContext, useState, useContext } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';

// color palettes
const LightColors = {
  primary: '#5B8CFF',
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: '#1C1C1E',
  secondaryText: '#8E8E93',
  border: '#E5E5EA',
  notification: '#FF6B6B',
};

const DarkColors = {
  primary: '#5B8CFF',
  background: '#1C1C1E',
  card: '#2C2C2E',
  text: '#FFFFFF',
  secondaryText: '#98989D',
  border: '#38383A',
  notification: '#FF6B6B',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // dark or light
  const [theme, setTheme] = useState(systemScheme || 'light');
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  const toggleTheme = () => { setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light')); };

  const colors = theme === 'light' ? LightColors : DarkColors;
  const fontFamily = 'Kalam_400Regular'; // Handwriting font for the app

  return <ThemeContext.Provider value={{ theme, toggleTheme, colors, isLandscape, fontFamily }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
