import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import FeelingIcon from './FeelingIcon';
import EntryDetailScreen from '../screens/EntryDetailScreen';
import { useTheme } from '../context/ThemeContext';
import { useOverlay } from '../context/OverlayContext';
import { useEntries } from '../context/EntriesContext';
import { formatDate, handleDeleteEntry } from '../utils/appUtils';

const EntryListItem = ({ item, showDate = true }) => {
  const { colors, fontFamily } = useTheme();
  const { showOverlay } = useOverlay();
  const { deleteEntry } = useEntries();
  const styles = getStyles(colors, fontFamily);

  const handlePress = () => { showOverlay(<EntryDetailScreen entry={item} />); };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.clickableArea} onPress={handlePress}>
        <View style={styles.header}>
          <FeelingIcon feeling={item.feeling} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        {showDate && item.date && <Text style={styles.date}>{formatDate(item.date)}</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEntry(item.id, deleteEntry)}>
        <Trash2 color="#FF6B6B" size={16} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors, fontFamily) => StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 2, alignItems: 'center',
  },
  clickableArea: { flex: 1, },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, },
  title: { fontSize: 20, fontWeight: '500', color: colors.text, fontFamily },
  date: { fontSize: 16, color: colors.secondaryText, marginTop: 4, fontFamily },
  deleteButton: { padding: 8, marginLeft: 16, },
});

export default EntryListItem;
