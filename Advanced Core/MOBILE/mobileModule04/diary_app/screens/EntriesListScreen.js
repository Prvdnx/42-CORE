import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, LogOut, Sun, Moon } from 'lucide-react-native';

import FeelingIcon, { feelingKeys } from '../components/FeelingIcon';
import EntryListItem from '../components/EntryListItem';
import LoadingSpinner from '../components/LoadingSpinner';
import NewEntryScreen from './NewEntryScreen';
import EntryDetailScreen from './EntryDetailScreen';
import { useTheme } from '../context/ThemeContext';
import { useOverlay } from '../context/OverlayContext';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useEntries } from '../context/EntriesContext';
import { formatDate, capitalize } from '../utils/appUtils';

const EntriesListScreen = () => {
  const { theme, toggleTheme, colors, isLandscape, fontFamily } = useTheme();
  const { showOverlay } = useOverlay();
  const { signOut } = useAuth();
  const { user } = useUser();
  const { entries, loading, addEntry } = useEntries();
  const styles = getStyles(colors, fontFamily);

  // calculate stats
  const totalEntries = entries.length;
  const feelingCounts = entries.reduce((acc, entry) => {
    const feeling = (entry.feeling || 'Unknown').toLowerCase().trim();
    acc[feeling] = (acc[feeling] || 0) + 1;
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#5B8CFF" translucent={false} />
      <ScrollView style={styles.container}>
        <LinearGradient colors={['#5B8CFF', '#4A7AE8']} style={styles.header} >
          <View style={styles.profileRow}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                {user?.imageUrl ? (<Image source={{ uri: user.imageUrl }} style={styles.avatarImage} />) : (<Text>👤</Text>)}
              </View>
              <View>
                <Text style={styles.userName}>
                  {(() => {
                    const name = user?.fullName || 'User';
                    return !isLandscape && name.length > 16 ? name.substring(0, 16) + '...' : name;
                  })()}
                </Text>
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
        </LinearGradient>

          <View style={styles.contentArea} >
            {loading ? <LoadingSpinner /> : entries.length > 0 ? (
              entries.map(item => <EntryListItem key={item.id} item={item} />)
            ) : (
              <Text style={{ color: colors.secondaryText, marginBottom: 16, textAlign: 'center', fontSize: 18, fontFamily }}>No entries yet. Start by adding one!</Text>
            )}
          </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => showOverlay(<NewEntryScreen />)}>
        <Plus color="white" size={24} strokeWidth={2.5} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (colors, fontFamily, isLandscape) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },
  container: { flex: 1, backgroundColor: colors.background, },
  header: { paddingTop: isLandscape ? 20 : 24, paddingHorizontal: 24, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, },
  profileRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 9, },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.3)', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  userName: { fontSize: 28, fontWeight: '500', color: '#FFFFFF', marginBottom: 4, fontFamily },
  userEmail: { fontSize: 16, color: 'rgba(255, 255, 255, 0.8)' },
  headerActions: { flexDirection: 'row', gap: 8, },
  headerButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', },
  statsCard: { marginTop: 24, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, padding: 16, },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, },
  statsLabel: { color: 'rgba(255, 255, 255, 0.9)', fontSize: 18, fontFamily },
  statsValue: { color: 'white', fontSize: 18, fontWeight: '600', fontFamily },
  feelingsScroll: { gap: 12, paddingRight: 16 },
  feelingStatItem: { backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 12, padding: 12, alignItems: 'center', justifyContent: 'center', minWidth: 80, gap: 4 },
  feelingStatPercentage: { color: 'white', fontSize: 20, fontWeight: '600', marginTop: 4, fontFamily },
  feelingStatName: { color: 'rgba(255, 255, 255, 0.9)', fontSize: 16, fontWeight: '500', fontFamily },
  contentArea: { paddingBottom: 120, padding: 24, },
  sectionTitle: { fontSize: 25, fontWeight: '500', color: colors.text, marginBottom: 16, fontFamily },
  recentEntryCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.00, elevation: 1, },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, },
  entryTitle: { fontSize: 22, fontWeight: '500', color: colors.text, fontFamily },
  entryContent: { fontSize: 18, color: colors.secondaryText, marginBottom: 8, lineHeight: 26, fontFamily },
  entryDate: { fontSize: 16, color: colors.secondaryText, fontFamily },
  fab: { position: 'absolute', right: 24, bottom: 96, width: 56, height: 56, borderRadius: 28, backgroundColor: '#5B8CFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8, },
});

export default EntriesListScreen;
