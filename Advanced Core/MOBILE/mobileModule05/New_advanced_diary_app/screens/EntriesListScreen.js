import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, StatusBar } from 'react-native';
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
  const { theme, toggleTheme, colors } = useTheme();
  const { showOverlay } = useOverlay();
  const { signOut } = useAuth();
  const { user } = useUser();
  const { entries, loading } = useEntries();
  const styles = getStyles(colors);

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
              <Text style={styles.statsValue}>{totalEntries}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.feelingsScroll}>
              {feelingKeys.map(f => {
                const count = feelingCounts[f] || 0;
                const percentage = totalEntries > 0 ? Math.round((count / totalEntries) * 100) : 0;
                const displayName = capitalize(f); // capitalize first letter for display
                return (
                  <View key={f} style={styles.feelingStatItem}>
                    <FeelingIcon feeling={f} size={24} color="white" />
                    <Text style={styles.feelingStatPercentage}>{percentage}%</Text>
                    <Text style={styles.feelingStatName}>{displayName}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </LinearGradient>

        <View style={styles.contentArea} >
          <Text style={styles.sectionTitle}>Your last diary entries</Text>
          {loading ? <LoadingSpinner /> : entries.length > 0 ? (
            entries.slice(0, 2).map(item => (
              <TouchableOpacity key={item.id} style={styles.recentEntryCard} onPress={() => showOverlay(<EntryDetailScreen entry={item} />)}>
                <View style={styles.cardHeader}><Text style={styles.entryTitle}>{item.title}</Text><FeelingIcon feeling={item.feeling} /></View>
                <Text style={styles.entryContent} numberOfLines={2}>{item.content}</Text>
                <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: colors.secondaryText, marginBottom: 16 }}>No entries yet. Start by adding one!</Text>
          )}

          <Text style={[styles.sectionTitle, { marginTop: 32 }]}>All Entries</Text>
          {entries.map(item => <EntryListItem key={item.id} item={item} />)}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => showOverlay(<NewEntryScreen />)}>
        <Plus color="white" size={24} strokeWidth={2.5} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },
  container: { flex: 1, backgroundColor: colors.background, },
  header: { paddingTop: 15, paddingHorizontal: 24, paddingBottom: 30, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, },
  profileRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 16, },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.3)', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  userName: { fontSize: 28, fontWeight: '500', color: '#FFFFFF', marginBottom: 4 },
  userEmail: { fontSize: 16, color: 'rgba(255, 255, 255, 0.8)' },
  headerActions: { flexDirection: 'row', gap: 8, },
  headerButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', },
  statsCard: { marginTop: 24, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, padding: 16, },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, },
  statsLabel: { color: 'rgba(255, 255, 255, 0.9)', fontSize: 16, },
  statsValue: { color: 'white', fontSize: 16, fontWeight: '600', },
  statsValue: { color: 'white', fontSize: 14, fontWeight: '600', },
  feelingsScroll: { gap: 12, paddingRight: 16 },
  feelingStatItem: { backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 12, padding: 12, alignItems: 'center', justifyContent: 'center', minWidth: 80, gap: 4 },
  feelingStatPercentage: { color: 'white', fontSize: 18, fontWeight: '600', marginTop: 4 },
  feelingStatName: { color: 'rgba(255, 255, 255, 0.9)', fontSize: 14, fontWeight: '500' },
  contentArea: { paddingBottom: 120, padding: 24, },
  sectionTitle: { fontSize: 24, fontWeight: '500', color: colors.text, marginBottom: 16, },
  recentEntryCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.00, elevation: 1, },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, },
  entryTitle: { fontSize: 18, fontWeight: '500', color: colors.text, },
  entryContent: { fontSize: 16, color: colors.secondaryText, marginBottom: 8, lineHeight: 24, },
  entryDate: { fontSize: 14, color: colors.secondaryText, },
  fab: { position: 'absolute', right: 24, bottom: 96, width: 56, height: 56, borderRadius: 28, backgroundColor: '#5B8CFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8, },
});

export default EntriesListScreen;
