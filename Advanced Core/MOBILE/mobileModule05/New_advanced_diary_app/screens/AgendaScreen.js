import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import FeelingIcon from '../components/FeelingIcon';
import { useTheme } from '../context/ThemeContext';

const dummyEntries = {
  '2025-11-20': [
    { id: '1', title: 'A Great Day', feeling: 'Happy' },
  ],
  '2025-11-18': [
    { id: '2', title: 'Feeling a bit down', feeling: 'Sad' },
  ],
  '2025-10-15': [
    { id: '8', title: 'October day', feeling: 'Calm' },
  ]
};

const AgendaScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [selectedDate, setSelectedDate] = useState('2025-11-20');
  
  const entriesForSelectedDate = dummyEntries[selectedDate] || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <LinearGradient colors={['#5B8CFF', '#4A7AE8']} style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
          <Calendar
            current={'2025-11-20'}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              ...Object.keys(dummyEntries).reduce((acc, date) => ({ ...acc, [date]: { marked: true, dotColor: 'white' } }), {}),
              [selectedDate]: { selected: true, selectedColor: '#FFFFFF', selectedTextColor: '#5B8CFF' },
            }}
            renderArrow={(direction) => (
              <View style={styles.monthNavButton}>
                {direction === 'left' 
                  ? <ChevronLeft color="white" size={20} /> 
                  : <ChevronRight color="white" size={20} />
                }
              </View>
            )}
            enableSwipeMonths={true}
            theme={{
              calendarBackground: 'transparent',
              dayTextColor: '#FFFFFF',
              textDisabledColor: 'rgba(255, 255, 255, 0.5)',
              monthTextColor: '#FFFFFF',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'normal',
              textDayFontSize: 16,
              monthTextFontWeight: '500', // Corrected prop name for newer versions
              textDayHeaderFontSize: 12,
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                },
                dayHeader: {
                  color: 'rgba(255, 255, 255, 0.7)',
                }
              },
              'stylesheet.day.basic': { text: { color: '#FFFFFF' } }
            }}
          />
        </LinearGradient>

        <View style={styles.contentArea}>
          <Text style={styles.sectionTitle}>Entries for {selectedDate}</Text>
          {entriesForSelectedDate.length > 0 ? (
            entriesForSelectedDate.map(item => (
              <TouchableOpacity key={item.id} style={styles.entryCard} onPress={() => navigation.navigate('EntryDetail', { entry: { ...item, date: selectedDate, content: 'Details...' } })}>
                <View style={styles.cardHeader}>
                  <FeelingIcon feeling={item.feeling} />
                  <Text style={styles.entryTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noEntriesCard}>
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
  header: {
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: { fontSize: 28, fontWeight: '500', color: '#FFFFFF', marginBottom: 24 },
  monthNavButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  contentArea: { padding: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '500', color: colors.text, marginBottom: 16 },
  entryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  noEntriesCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEntriesText: {
    color: colors.secondaryText,
  },
});

export default AgendaScreen;