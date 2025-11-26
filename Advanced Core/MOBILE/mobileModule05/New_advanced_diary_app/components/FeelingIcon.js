import React from 'react';
import { Smile, Frown, Zap, Wind, AlertCircle, Angry, Annoyed } from 'lucide-react-native';

const feelingMap = {
  Happy: { Icon: Smile, defaultColor: '#FFD60A' },
  Sad: { Icon: Frown, defaultColor: '#FF6B6B' },
  Excited: { Icon: Zap, defaultColor: '#FF9500' },
  Calm: { Icon: Wind, defaultColor: '#64D2FF' },
  Anxious: { Icon: AlertCircle, defaultColor: '#BF5AF2' },
  Angry: { Icon: Angry, defaultColor: '#FF3B30' },
  Annoyed: { Icon: Annoyed, defaultColor: '#A0A0A0' },
};

const FeelingIcon = ({ feeling, size = 20, color }) => {
  const feelingData = feelingMap[feeling];

  if (!feelingData) {
    // Return a default or null if feeling is not found
    return null;
  }

  const { Icon, defaultColor } = feelingData;
  const iconColor = color || defaultColor;

  return <Icon color={iconColor} size={size} />;
};

export default FeelingIcon;