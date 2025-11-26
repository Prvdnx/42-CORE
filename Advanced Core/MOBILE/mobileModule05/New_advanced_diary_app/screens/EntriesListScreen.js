import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, LogOut, Sun, Smile, Frown, Zap, Wind, AlertCircle, Trash2 } from 'lucide-react-native';

const dummyEntries = [
  { id: '1', title: 'A Great Day', date: 'Nov 20, 2025', content: 'Had a wonderful time with friends, feeling very happy and grateful...', feeling: 'Happy' },
  { id: '2', title: 'Productive Morning', date: 'Nov 19, 2025', content: 'Finished a big project at work. Felt very excited and accomplished.', feeling: 'Excited' },
  { id: '3', title: 'Feeling a bit down', date: 'Nov 18, 2025', content: 'Work was stressful today. Trying to stay positive for tomorrow.', feeling: 'Sad' },
  { id: '4', title: 'A Calm Evening', date: 'Nov 17, 2025', content: 'Spent the evening reading a book. It was very relaxing.', feeling: 'Calm' },
  { id: '5', title: 'Anxious about tomorrow', date: 'Nov 16, 2025', content: 'Have a big presentation tomorrow and feeling a bit anxious.', feeling: 'Anxious' },
];

const feelingIcons = {
  Happy: <Smile color="#FFD60A" size={20} />,
  Sad: <Frown color="#FF6B6B" size={20} />,
  Excited: <Zap color="#FF9500" size={20} />,
  Calm: <Wind color="#64D2FF" size={20} />,
  Anxious: <AlertCircle color="#BF5AF2" size={20} />,
};
const feelingStatsIcons = {
  Happy: <Smile color="white" size={16} />,
  Sad: <Frown color="white" size={16} />,
  Excited: <Zap color="white" size={16} />,
  Calm: <Wind color="white" size={16} />,
  Anxious: <AlertCircle color="white" size={16} />,
};

const EntriesListScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <LinearGradient
          colors={['#5B8CFF', '#4A7AE8']}
          style={styles.header}
        >
          <View style={styles.profileRow}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text>👤</Text>
              </View>
              <View>
                <Text style={styles.userName}>Sarah Johnson</Text>
               </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Sun color="white" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Welcome')}>
                <LogOut color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Card */}
          <View style={styles.statsCard}>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Total Entries</Text>
              <Text style={styles.statsValue}>{dummyEntries.length}</Text>
            </View>
            <View style={styles.feelingsDistribution}>
              <View style={styles.feelingStatItem}>
                {feelingStatsIcons.Happy}
                <Text style={styles.feelingStatText}>45%</Text>
              </View>
              <View style={styles.feelingStatItem}>
                {feelingStatsIcons.Sad}
                <Text style={styles.feelingStatText}>15%</Text>
              </View>
              <View style={styles.feelingStatItem}>
                {feelingStatsIcons.Excited}
                <Text style={styles.feelingStatText}>20%</Text>
              </View>
              <View style={styles.feelingStatItem}>
                {feelingStatsIcons.Calm}
                <Text style={styles.feelingStatText}>15%</Text>
              </View>
              <View style={styles.feelingStatItem}>
                {feelingStatsIcons.Anxious}
                <Text style={styles.feelingStatText}>5%</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Content Area */}
        <View style={styles.contentArea} >
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          {dummyEntries.map(item => (
            <TouchableOpacity key={item.id} style={styles.entryCard} onPress={() => navigation.navigate('EntryDetail', { entry: item })}>
              <View style={styles.cardHeader}>
                <Text style={styles.entryTitle}>{item.title}</Text>
                {feelingIcons[item.feeling]}
              </View>
              <Text style={styles.entryContent} numberOfLines={2}>{item.content}</Text>
              <Text style={styles.entryDate}>{item.date}</Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>All Entries</Text>
          {dummyEntries.map(item => (
            <View key={item.id} style={styles.entryCard}>
              <TouchableOpacity style={styles.allEntriesClickable} onPress={() => navigation.navigate('EntryDetail', { entry: item })}>
                <View style={styles.allEntriesHeader}>
                  {feelingIcons[item.feeling]}
                  <Text style={styles.entryTitle}>{item.title}</Text>
                </View>
                <Text style={styles.entryDate}>{item.date}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Trash2 color="#FF6B6B" size={16} />
              </TouchableOpacity>
            </View>
          ))}

        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewEntry')}>
        <Plus color="white" size={24} strokeWidth={2.5} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24, // xl
    fontWeight: '500',
    color: 'white',
  },
  userEmail: {
    fontSize: 14, // sm
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  statsValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  feelingsDistribution: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  feelingStatItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    gap: 4,
  },
  feelingStatText: {
    color: 'white',
    fontSize: 12,
  },
  contentArea: {
    paddingBottom: 120, // Extra padding for FAB and nav bar
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20, // lg
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  entryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    alignItems: 'center',
  },
  allEntriesClickable: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  allEntriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  entryTitle: {
    fontSize: 16, // base
    fontWeight: '500',
    color: '#1C1C1E',
  },
  entryContent: {
    fontSize: 14, // sm
    color: '#8E8E93',
    marginBottom: 8,
    lineHeight: 20,
  },
  entryDate: {
    fontSize: 12, // xs
    color: '#8E8E93',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 96,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5B8CFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default EntriesListScreen;
