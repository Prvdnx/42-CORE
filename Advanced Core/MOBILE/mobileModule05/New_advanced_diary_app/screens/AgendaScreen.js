import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import FeelingIcon from '../components/FeelingIcon';
import EntryListItem from '../components/EntryListItem';
import { useTheme } from '../context/ThemeContext';
import { useEntries } from '../context/EntriesContext';

const AgendaScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { entries } = useEntries();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getCalendarDate = (date) => {
    if (!date) return '';
    try {
      const d = date?.toDate ? date.toDate() : new Date(date);
      return d.toISOString().split('T')[0];
    } catch { return ''; }
  };

  const entriesForSelectedDate = useMemo(() =>
    entries.filter(entry => getCalendarDate(entry.date) === selectedDate),
    [entries, selectedDate]);

  const markedDates = useMemo(() => {
    const marks = entries.reduce((acc, entry) => {
      const date = getCalendarDate(entry.date);
      if (date) acc[date] = { marked: true, dotColor: 'white' };
      return acc;
    }, {});

    return {
      ...marks,
      [selectedDate]: {
        ...(marks[selectedDate] || {}),
        selected: true,
        selectedColor: '#FFFFFF',
        selectedTextColor: '#5B8CFF'
      },
    };
  }, [entries, selectedDate]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <LinearGradient colors={['#5B8CFF', '#4A7AE8']} style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            renderArrow={(direction) => (
              <View style={styles.monthNavButton}>
                {direction === 'left' ? <ChevronLeft color="white" size={20} /> : <ChevronRight color="white" size={20} />}
              </View>
            )}
            enableSwipeMonths={true}
            theme={{
              calendarBackground: 'transparent', dayTextColor: '#FFFFFF', textDisabledColor: 'rgba(255, 255, 255, 0.5)',
              monthTextColor: '#FFFFFF', textDayFontWeight: '500', textMonthFontWeight: 'bold', textDayHeaderFontWeight: 'normal',
              textDayFontSize: 16, monthTextFontWeight: '500', textDayHeaderFontSize: 12,
              'stylesheet.calendar.header': {
                week: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-around', },
                dayHeader: { color: 'rgba(255, 255, 255, 0.7)', }
              },
              'stylesheet.day.basic': { text: { color: '#FFFFFF' } }
            }}
          />
        </LinearGradient>

        <View style={styles.contentArea}>
          <Text style={styles.sectionTitle}>Entries for {selectedDate}</Text>
          {entriesForSelectedDate.length > 0 ? (entriesForSelectedDate.map(item => (
            <EntryListItem key={item.id} item={{ ...item, date: selectedDate }} showDate={false} />)))
            : (<View style={styles.noEntriesCard}>
              <Text style={styles.noEntriesText}>No entries for this date</Text>
            </View>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingTop: 56, paddingHorizontal: 24, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, },
  headerTitle: { fontSize: 28, fontWeight: '500', color: '#FFFFFF', marginBottom: 24 },
  monthNavButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  contentArea: { padding: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '500', color: colors.text, marginBottom: 16 },
  noEntriesCard: { backgroundColor: colors.card, borderRadius: 16, padding: 32, alignItems: 'center', justifyContent: 'center', },
  noEntriesText: { color: colors.secondaryText, },
});

export default AgendaScreen;
