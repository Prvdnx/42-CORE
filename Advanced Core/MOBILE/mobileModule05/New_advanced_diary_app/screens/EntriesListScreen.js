import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, LogOut, Sun, Moon } from 'lucide-react-native';

import FeelingIcon from '../components/FeelingIcon';
import EntryListItem from '../components/EntryListItem';
import NewEntryScreen from './NewEntryScreen';
import EntryDetailScreen from './EntryDetailScreen';
import { useTheme } from '../context/ThemeContext';
import { useOverlay } from '../context/OverlayContext';
import { useAuth, useUser } from '@clerk/clerk-expo';

const dummyEntries = [
  { id: '1', title: 'A Great Day', date: 'Nov 20, 2025', content: 'Had a wonderful time with friends, feeling very happy and grateful...', feeling: 'Happy' },
  { id: '2', title: 'Productive Morning', date: 'Nov 19, 2025', content: 'Finished a big project at work. Felt very excited and accomplished.', feeling: 'Excited' },
  { id: '3', title: 'Feeling a bit down', date: 'Nov 18, 2025', content: 'Work was stressful today. Trying to stay positive for tomorrow.', feeling: 'Sad' },
  { id: '4', title: 'A Calm Evening', date: 'Nov 17, 2025', content: 'Spent the evening reading a book. It was very relaxing.', feeling: 'Calm' },
  { id: '5', title: 'Anxious about tomorrow', date: 'Nov 16, 2025', content: 'Have a big presentation tomorrow and feeling a bit anxious.', feeling: 'Anxious' },
  { id: '6', title: 'Traffic Jam', date: 'Nov 15, 2025', content: 'Stuck in traffic for an hour. So angry.', feeling: 'Angry' },
  { id: '7', title: 'Minor Setback', date: 'Nov 14, 2025', content: 'A small mistake at work was annoying.', feeling: 'Annoyed' },
];

const EntriesListScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const { showOverlay } = useOverlay();
  const { signOut } = useAuth();
  const { user } = useUser();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <LinearGradient colors={['#5B8CFF', '#4A7AE8']} style={styles.header} >
          <View style={styles.profileRow}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}><Text>👤</Text></View>
              <View>
                <Text style={styles.userName}>{user?.fullName || 'User'}</Text>
                {/* <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text> */}
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton} onPress={toggleTheme}>
                {theme === 'light' ? <Moon color="white" size={20} /> : <Sun color="white" size={20} />}
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={() => signOut()}>
                <LogOut color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Stats for all Entries</Text>
              <Text style={styles.statsValue}>{dummyEntries.length}</Text>
            </View>
            <View style={styles.feelingsDistribution}>
              <View style={styles.feelingStatItem}><FeelingIcon feeling="Happy" size={16} color="white" /><Text style={styles.feelingStatText}>45%</Text></View>
              <View style={styles.feelingStatItem}><FeelingIcon feeling="Sad" size={16} color="white" /><Text style={styles.feelingStatText}>15%</Text></View>
              <View style={styles.feelingStatItem}><FeelingIcon feeling="Excited" size={16} color="white" /><Text style={styles.feelingStatText}>20%</Text></View>
              <View style={styles.feelingStatItem}><FeelingIcon feeling="Calm" size={16} color="white" /><Text style={styles.feelingStatText}>15%</Text></View>
              <View style={styles.feelingStatItem}><FeelingIcon feeling="Anxious" size={16} color="white" /><Text style={styles.feelingStatText}>5%</Text></View>
              <View style={styles.feelingStatItem}><FeelingIcon feeling="Angry" size={16} color="white" /><Text style={styles.feelingStatText}>15%</Text></View>
              <View style={styles.feelingStatItem}><FeelingIcon feeling="Annoyed" size={16} color="white" /><Text style={styles.feelingStatText}>5%</Text></View>
              </View>
          </View>
        </LinearGradient>

        <View style={styles.contentArea} >
          <Text style={styles.sectionTitle}>Your last diary entries</Text>
          {dummyEntries.slice(0, 2).map(item => (
            <TouchableOpacity key={item.id} style={styles.recentEntryCard} onPress={() => showOverlay(<EntryDetailScreen entry={item} />)}>
              <View style={styles.cardHeader}><Text style={styles.entryTitle}>{item.title}</Text><FeelingIcon feeling={item.feeling} /></View>
              <Text style={styles.entryContent} numberOfLines={2}>{item.content}</Text>
              <Text style={styles.entryDate}>{item.date}</Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 32 }]}>All Entries</Text>
          {dummyEntries.map(item => <EntryListItem key={item.id} item={item} />)}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => showOverlay(<NewEntryScreen />)}>
        <Plus color="white" size={24} strokeWidth={2.5} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, },
  container: { flex: 1, backgroundColor: colors.background, },
  header: { paddingTop: 56, paddingHorizontal: 24, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, },
  profileRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 16, },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.3)', justifyContent: 'center', alignItems: 'center', },
  userName: { fontSize: 24, fontWeight: '500', color: '#FFFFFF', marginBottom: 4 },
  userEmail: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' },
  headerActions: { flexDirection: 'row', gap: 8, },
  headerButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', },
  statsCard: { marginTop: 24, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, padding: 16, },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, },
  statsLabel: { color: 'rgba(255, 255, 255, 0.9)', fontSize: 14, },
  statsValue: { color: 'white', fontSize: 14, fontWeight: '600', },
  feelingsDistribution: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, },
  feelingStatItem: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 8, padding: 8, alignItems: 'center', gap: 4, },
  feelingStatText: { color: 'white', fontSize: 12, },
  contentArea: { paddingBottom: 120, padding: 24, },
  sectionTitle: { fontSize: 20, fontWeight: '500', color: colors.text, marginBottom: 16, },
  recentEntryCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.00, elevation: 1, },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, },
  entryTitle: { fontSize: 16, fontWeight: '500', color: colors.text, },
  entryContent: { fontSize: 14, color: colors.secondaryText, marginBottom: 8, lineHeight: 20, },
  entryDate: { fontSize: 12, color: colors.secondaryText, },
  fab: { position: 'absolute', right: 24, bottom: 96, width: 56, height: 56, borderRadius: 28, backgroundColor: '#5B8CFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8, },
});
 
export default EntriesListScreen;
