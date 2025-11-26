import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { X, Trash2 } from 'lucide-react-native';
import FeelingIcon from '../components/FeelingIcon';
import { useTheme } from '../context/ThemeContext';

const EntryDetailScreen = ({ route, navigation }) => {
  const { entry } = route.params;
  const { colors } = useTheme();
  const styles = getStyles(colors, entry.feeling);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <View style={styles.feelingBadge}>
            <FeelingIcon feeling={entry.feeling} size={20} />
          </View>
          <View>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.feelingLabel}>{entry.feeling}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <X color={colors.secondaryText} size={20} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.date}>{entry.date}</Text>
        <View style={styles.contentCard}>
          <Text style={styles.content}>{entry.content}</Text>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.deleteButton}>
          <Trash2 color="#FF6B6B" size={16} />
          <Text style={styles.deleteButtonText}>Delete Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card, padding: 24, },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, },
  feelingBadge: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', },
  closeButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.background, justifyContent: 'center',
              alignItems: 'center', },
  title: { fontSize: 24, fontWeight: '500', color: colors.text, },
  feelingLabel: {fontSize: 14, color: colors.secondaryText, },
  scrollContainer: { flex: 1 },
  date: { fontSize: 14, color: colors.secondaryText, marginBottom: 16, },
  contentCard: { backgroundColor: colors.background, borderRadius: 16, padding: 16, },
  content: { fontSize: 16, color: colors.text, lineHeight: 26, },
  actions: { flexDirection: 'row', gap: 12, paddingTop: 16, marginTop: 24, borderTopWidth: 1,
          borderColor: colors.border, },
  deleteButton: { flex: 1, height: 48, borderRadius: 12, backgroundColor: 'rgba(255, 107, 107, 0.1)', flexDirection: 'row',
              justifyContent: 'center', alignItems: 'center', gap: 8, },
});
 
export default EntryDetailScreen;
