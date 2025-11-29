import React from 'react';
import { Smile, Frown, Zap, Wind, AlertCircle, Angry, Annoyed, ThumbsUp, ThumbsDown } from 'lucide-react-native';

const feelingMap = {
  good: { Icon: ThumbsUp, defaultColor: '#34C759' },
  bad: { Icon: ThumbsDown, defaultColor: '#FF3B30' },
  happy: { Icon: Smile, defaultColor: '#FFD60A' },
  sad: { Icon: Frown, defaultColor: '#FF6B6B' },
  excited: { Icon: Zap, defaultColor: '#FF9500' },
  calm: { Icon: Wind, defaultColor: '#64D2FF' },
  anxious: { Icon: AlertCircle, defaultColor: '#BF5AF2' },
  angry: { Icon: Angry, defaultColor: '#FF3B30' },
  annoyed: { Icon: Annoyed, defaultColor: '#A0A0A0' }
};

const FeelingIcon = ({ feeling, size = 20, color }) => {
  if (!feeling) return null;

  const normalizedFeeling = feeling.toLowerCase().trim();
  const feelingData = feelingMap[normalizedFeeling];

  if (!feelingData) { // if unknown feeling
    console.log(`FeelingIcon: Unknown feeling "${feeling}"`);
    return null;
  }

  const { Icon, defaultColor } = feelingData;
  const iconColor = color || defaultColor;

  return <Icon color={iconColor} size={size} />;
};

export const feelingKeys = Object.keys(feelingMap);
export default FeelingIcon;
