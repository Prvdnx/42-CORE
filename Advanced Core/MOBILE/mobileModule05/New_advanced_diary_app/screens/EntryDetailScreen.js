import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { X, Trash2 } from 'lucide-react-native';
import FeelingIcon from '../components/FeelingIcon';
import { useTheme } from '../context/ThemeContext';
import { useOverlay } from '../context/OverlayContext';

const EntryDetailScreen = ({ entry }) => {
  const { colors } = useTheme();
  const { hideOverlay } = useOverlay();
  const styles = getStyles(colors, entry.feeling);

  return (
    <Modal animationType="fade" transparent={true} visible={true} onRequestClose={hideOverlay} >
      <View style={styles.overlay}>
        <View style={styles.panel}>
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
            <TouchableOpacity style={styles.closeButton} onPress={hideOverlay}>
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
            <TouchableOpacity style={styles.primaryButton} onPress={hideOverlay}>
              <Text style={styles.primaryButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors) => StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  panel: { width: '90%', maxHeight: '85%', backgroundColor: colors.card, borderRadius: 24, padding: 24, flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, },
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
  deleteButtonText: { color: '#FF6B6B', fontWeight: '500', },
  primaryButton: { flex: 1, height: 48, borderRadius: 12, backgroundColor: '#5B8CFF', justifyContent: 'center',
              alignItems: 'center', },
  primaryButtonText: { color: 'white', fontWeight: '500', },
});
 
export default EntryDetailScreen;
