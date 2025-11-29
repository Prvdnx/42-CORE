import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarPicker from 'react-native-calendar-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import EntryListItem from '../components/EntryListItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTheme } from '../context/ThemeContext';
import { useEntries } from '../context/EntriesContext';
import { getCalendarDate } from '../utils/appUtils';

const AgendaScreen = ({ navigation }) => {
  const { colors, theme, fontFamily, isLandscape } = useTheme();
  const styles = getStyles(colors, fontFamily);
  const { entries, loading } = useEntries();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const entriesForSelectedDate = useMemo(() =>
    entries.filter(entry => getCalendarDate(entry.date) === selectedDate),
    [entries, selectedDate]);

  const markedDates = useMemo(() => {
    return entries.map(entry => {
      const date = getCalendarDate(entry.date);
      return date ? new Date(date) : null;
    }).filter(Boolean);
  }, [entries]);

  const handleDateChange = (date) => {
    setSelectedDate(getCalendarDate(date));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#5B8CFF" translucent={false} />
      <ScrollView style={styles.container}>
        <LinearGradient colors={['#5B8CFF', '#4A7AE8']} style={styles.header}>
          <Text style={styles.headerTitle}>Mood Calendar</Text>
          <CalendarPicker
            onDateChange={handleDateChange}
            selectedDayColor="#FFFFFF" selectedDayTextColor="#5B8CFF"
            todayBackgroundColor="rgba(255, 255, 255, 0.3)" todayTextStyle={{ color: '#6f1e70ff' }}
            textStyle={{ color: '#FFFFFF', fontFamily, fontSize: isLandscape ? 24 : 18 }}
            monthTitleStyle={{ color: '#FFFFFF', fontSize: isLandscape ? 28 : 22, fontWeight: '500', fontFamily }}
            yearTitleStyle={{ color: '#FFFFFF', fontSize: isLandscape ? 28 : 22, fontWeight: '500', fontFamily }}
            dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
            customDatesStyles={markedDates.map(date => ({
              date, style: { backgroundColor: 'rgba(255, 255, 255, 0.2)' }, textStyle: { color: '#FFFFFF' }
            }))}
            previousComponent={<View style={styles.monthNavButton}><ChevronLeft color="white" size={20} /></View>}
            nextComponent={<View style={styles.monthNavButton}><ChevronRight color="white" size={20} /></View>}
            width={isLandscape ? 600 : 350} scaleFactor={375}
          />
        </LinearGradient>

        <View style={styles.contentArea}>
          <Text style={styles.sectionTitle}>Entries for {selectedDate}</Text>
          {loading ? <LoadingSpinner /> : entriesForSelectedDate.length > 0 ? (entriesForSelectedDate.map(item => (
            <EntryListItem key={item.id} item={{ ...item, date: selectedDate }} showDate={false} />)))
            : (<View style={styles.noEntriesCard}>
              <Text style={styles.noEntriesText}>No entries for this date</Text>
            </View>)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors, fontFamily) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },
  container: { flex: 1, backgroundColor: colors.background, },
  header: { paddingTop: 15, paddingHorizontal: 24, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, },
  headerTitle: { fontSize: 35, textAlign: 'center', fontWeight: '500', color: '#FFFFFF', marginBottom: 20, marginTop: 5, fontFamily },
  monthNavButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  contentArea: { padding: 24, marginBottom: 70 },
  sectionTitle: { fontSize: 25, fontWeight: '500', color: colors.text, marginBottom: 16, fontFamily },
  loadingContainer: { paddingVertical: 60, alignItems: 'center', gap: 16 },
  loadingText: { fontSize: 16, color: colors.secondaryText },
  noEntriesCard: { backgroundColor: colors.card, borderRadius: 16, padding: 32, alignItems: 'center', justifyContent: 'center', },
  noEntriesText: { color: colors.secondaryText, fontFamily },
});

export default AgendaScreen;
