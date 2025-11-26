import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import FeelingIcon from '../components/FeelingIcon';
import { useTheme } from '../context/ThemeContext';

const NewEntryScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [feeling, setFeeling] = useState('');
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const saveEntry = () => {
    console.log('Saving entry:', { title, content, feeling });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Entry</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <X color={colors.secondaryText} size={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a title"
        placeholderTextColor={colors.secondaryText}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>How are you feeling?</Text>
      <View style={styles.feelingSelector}>
        {['Happy', 'Sad', 'Excited', 'Calm', 'Anxious', 'Angry', 'Annoyed'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.feelingButton, feeling === f && styles.feelingSelected]}
            onPress={() => setFeeling(f)}
          >
            <FeelingIcon feeling={f} size={16} color={feeling === f ? 'white' : colors.text} />
            <Text style={[styles.feelingText, feeling === f && styles.feelingTextSelected]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Write your thoughts..."
        placeholderTextColor={colors.secondaryText}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={saveEntry}>
          <Text style={styles.primaryButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card, padding: 24, },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, },
  closeButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.background, justifyContent: 'center',
              alignItems: 'center', },
  title: { fontSize: 24, fontWeight: '500', color: colors.text, },
  label: { fontSize: 14, color: colors.secondaryText, marginBottom: 8, marginTop: 16, },
  input: { width: '100%', padding: 16, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border,
        borderRadius: 12, fontSize: 16, color: colors.text, },
  multilineInput: { height: 120, textAlignVertical: 'top', },
  feelingSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, },
  feelingButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 16,
                borderRadius: 12, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, },
  feelingSelected: { backgroundColor: '#5B8CFF', borderColor: '#5B8CFF', },
  feelingText: { color: colors.text, fontSize: 14 },
  feelingTextSelected: { color: 'white' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 32, paddingTop: 16, borderTopWidth: 1, borderColor: colors.border,},
  secondaryButton: { flex: 1, height: 48, borderRadius: 12, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  secondaryButtonText: { color: colors.text, fontWeight: '500' },
  primaryButton: { flex: 1, height: 48, borderRadius: 12, backgroundColor: '#5B8CFF', justifyContent: 'center', alignItems: 'center' },
  primaryButtonText: { color: 'white', fontWeight: '500' },
});

export default NewEntryScreen;
