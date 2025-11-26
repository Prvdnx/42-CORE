import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { ChevronLeft, ChevronRight, Smile, Frown } from 'lucide-react-native';

const dummyEntries = {
  '2025-11-20': [
    { id: '1', title: 'A Great Day', feeling: 'Happy' },
  ],
  '2025-11-18': [
    { id: '2', title: 'Feeling a bit down', feeling: 'Sad' },
  ],
};

const feelingIcons = {
  Happy: <Smile color="#FFD60A" size={20} />,
  Sad: <Frown color="#FF6B6B" size={20} />,
};

const AgendaScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('2025-11-20');

  const renderHeader = (date) => {
    const header = date.toString('MMMM yyyy');
    return (
      <View style={styles.calendarHeader}>
        <TouchableOpacity style={styles.monthNavButton}>
          <ChevronLeft color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{header}</Text>
        <TouchableOpacity style={styles.monthNavButton}>
          <ChevronRight color="white" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

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
            renderHeader={renderHeader}
            theme={{
              calendarBackground: 'transparent',
              dayTextColor: 'white',
              textDisabledColor: 'rgba(255, 255, 255, 0.5)',
              monthTextColor: 'white',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'normal',
              textDayFontSize: 14,
              textMonthFontSize: 24,
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
              }
            }}
          />
        </LinearGradient>

        <View style={styles.contentArea}>
          <Text style={styles.sectionTitle}>Entries for {selectedDate}</Text>
          {entriesForSelectedDate.length > 0 ? (
            entriesForSelectedDate.map(item => (
              <TouchableOpacity key={item.id} style={styles.entryCard} onPress={() => navigation.navigate('EntryDetail', { entry: { ...item, date: selectedDate, content: 'Details...' } })}>
                <View style={styles.cardHeader}>
                  {feelingIcons[item.feeling]}
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

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FA' },
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: { fontSize: 28, fontWeight: '500', color: 'white', marginBottom: 24 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 10 },
  monthNavButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  monthLabel: { fontSize: 24, fontWeight: '500', color: 'white' },
  contentArea: { padding: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '500', color: '#1C1C1E', marginBottom: 16 },
  entryCard: {
    backgroundColor: '#FFFFFF',
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
    color: '#1C1C1E',
  },
  noEntriesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEntriesText: {
    color: '#8E8E93',
  },
});

export default AgendaScreen;