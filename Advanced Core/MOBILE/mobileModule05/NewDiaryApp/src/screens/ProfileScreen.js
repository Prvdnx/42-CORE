import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();

  // Placeholder data
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };

  const stats = {
    totalEntries: 42,
    feelings: { happy: 50, sad: 20, neutral: 30 },
  };

  const recentEntries = [
    { id: '1', date: '2025-11-25', feeling: 'happy', title: 'A great day!' },
    { id: '2', date: '2025-11-24', feeling: 'sad', title: 'Feeling a bit down' },
  ];

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    safeArea: { flex: 1 },
    header: {
      padding: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.subtext,
    },
    avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
    name: { fontSize: 22, fontWeight: 'bold', color: theme.text },
    email: { fontSize: 16, color: theme.subtext },
    logoutButton: { position: 'absolute', top: 20, right: 20 },
    logoutText: { fontSize: 16, color: theme.primary },
    statsContainer: { padding: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 10 },
    chartPlaceholder: {
        height: 150,
        backgroundColor: theme.card,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    entryCard: {
      backgroundColor: theme.card,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    entryTitle: { fontSize: 18, fontWeight: '600', color: theme.text },
    entryDate: { fontSize: 14, color: theme.subtext, marginTop: 5 },
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.sectionTitle}>Stats</Text>
                <View style={styles.chartPlaceholder}>
                    <Text style={{color: theme.text}}>Feelings Distribution Chart</Text>
                    <Text style={{color: theme.subtext}}>(Placeholder)</Text>
                </View>
            </View>

            <View style={{paddingHorizontal: 20, flex: 1}}>
                <Text style={styles.sectionTitle}>Recent Entries</Text>
                <FlatList
                    data={recentEntries}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.entryCard} onPress={() => navigation.navigate('Agenda')}>
                            <Text style={styles.entryTitle}>{item.title}</Text>
                            <Text style={styles.entryDate}>{item.date}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <TouchableOpacity style={styles.fab}>
                <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
