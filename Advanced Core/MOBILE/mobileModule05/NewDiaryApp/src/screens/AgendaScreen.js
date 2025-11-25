import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeContext';

const AgendaScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  // Placeholder data
  const entries = {
    '2025-11-26': [
      { id: '3', title: 'Today is a good day', feeling: 'happy' },
      { id: '4', title: 'Worked on the diary app', feeling: 'happy' }
    ],
    '2025-11-25': [{ id: '1', title: 'A great day!', feeling: 'happy' }],
    '2025-11-24': [{ id: '2', title: 'Feeling a bit down', feeling: 'sad' }],
  };

  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    container: { flex: 1 },
    entryCard: {
      backgroundColor: theme.card,
      borderRadius: 10,
      padding: 15,
      marginHorizontal: 20,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    entryTitle: { fontSize: 18, fontWeight: '600', color: theme.text },
    entryFeeling: { fontSize: 14, color: theme.subtext, marginTop: 5 },
    noEntriesText: {
        textAlign: 'center',
        marginTop: 20,
        color: theme.subtext,
        fontSize: 16
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
        padding: 10
    },
    backButtonText: {
        color: theme.primary,
        fontSize: 18,
    }
  });

  const calendarTheme = {
    backgroundColor: theme.background,
    calendarBackground: theme.background,
    textSectionTitleColor: theme.text,
    selectedDayBackgroundColor: theme.primary,
    selectedDayTextColor: '#ffffff',
    todayTextColor: theme.primary,
    dayTextColor: theme.text,
    textDisabledColor: theme.subtext,
    dotColor: theme.primary,
    selectedDotColor: '#ffffff',
    arrowColor: theme.primary,
    monthTextColor: theme.text,
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Calendar
              onDayPress={day => setSelectedDate(day.dateString)}
              markedDates={{
                ...Object.keys(entries).reduce((acc, date) => {
                  acc[date] = { marked: true };
                  return acc;
                }, {}),
                [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: theme.primary, selectedTextColor: 'white' },
              }}
              theme={calendarTheme}
            />
            <FlatList
              data={entries[selectedDate] || []}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.entryCard}>
                  <Text style={styles.entryTitle}>{item.title}</Text>
                  <Text style={styles.entryFeeling}>Feeling: {item.feeling}</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.noEntriesText}>No entries for this date.</Text>}
            />
        </View>
    </SafeAreaView>
  );
};

export default AgendaScreen;
