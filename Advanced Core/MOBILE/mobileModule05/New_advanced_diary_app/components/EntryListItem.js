import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Trash2 } from 'lucide-react-native';
import FeelingIcon from './FeelingIcon';
import { useTheme } from '../context/ThemeContext';

const EntryListItem = ({ item, showDate = true }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(colors);

  const handlePress = () => {
    navigation.navigate('EntryDetail', { entry: item });
  };

  const handleDelete = () => {
    // In a real app, this would dispatch an action to delete the item from the database
    console.log('Delete item:', item.id);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.clickableArea} onPress={handlePress}>
        <View style={styles.header}>
          <FeelingIcon feeling={item.feeling} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        {showDate && item.date && <Text style={styles.date}>{item.date}</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Trash2 color="#FF6B6B" size={16} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 2,
        alignItems: 'center', },
  clickableArea: { flex: 1, },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, },
  title: { fontSize: 16, fontWeight: '500', color: colors.text, },
  date: { fontSize: 12, color: colors.secondaryText, marginTop: 4, },
  deleteButton: { padding: 8, marginLeft: 16, },
});

export default EntryListItem;
