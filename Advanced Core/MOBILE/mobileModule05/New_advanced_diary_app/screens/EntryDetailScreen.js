import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { X, Trash2, Smile, Frown, Zap, Wind, AlertCircle } from 'lucide-react-native';

const feelingMap = {
  Happy: { icon: Smile, color: '#FFD60A' },
  Sad: { icon: Frown, color: '#FF6B6B' },
  Excited: { icon: Zap, color: '#FF9500' },
  Calm: { icon: Wind, color: '#64D2FF' },
  Anxious: { icon: AlertCircle, color: '#BF5AF2' },
};

const EntryDetailScreen = ({ route, navigation }) => {
  const { entry } = route.params;
  const feeling = feelingMap[entry.feeling] || feelingMap.Happy;
  const FeelingIcon = feeling.icon;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <View style={[styles.feelingBadge, { backgroundColor: `${feeling.color}20` }]}>
            <FeelingIcon color={feeling.color} size={20} />
          </View>
          <View>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.feelingLabel}>{entry.feeling}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <X color="#8E8E93" size={20} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  feelingBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24, // xl
    fontWeight: '500',
    color: '#1C1C1E',
  },
  feelingLabel: {
    fontSize: 14, // sm
    color: '#8E8E93',
  },
  scrollContainer: { flex: 1 },
  date: {
    fontSize: 14, // sm
    color: '#8E8E93',
    marginBottom: 16,
  },
  contentCard: {
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    padding: 16,
  },
  content: {
    fontSize: 16,
    color: '#1C1C1E',
    lineHeight: 26, // relaxed
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
  },
  deleteButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#5B8CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default EntryDetailScreen;
