import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { X } from 'lucide-react-native';
import FeelingIcon, { feelingKeys } from '../components/FeelingIcon';
import { useTheme } from '../context/ThemeContext';
import { useOverlay } from '../context/OverlayContext';
import { useEntries } from '../context/EntriesContext';
import { capitalize } from '../utils/appUtils';

const NewEntryScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [feeling, setFeeling] = useState('');
  const { colors, fontFamily } = useTheme();
  const { hideOverlay } = useOverlay();
  const { addEntry } = useEntries();
  const styles = getStyles(colors, fontFamily);

  const saveEntry = async () => {
    if (!title.trim() || !content.trim() || !feeling) {
      Alert.alert("Missing Information", "Please fill in all fields and select a feeling.");
      return;
    }

    try {
      await addEntry({ title, content, feeling });
      hideOverlay();
    } catch (error) {
      console.error("Error saving entry:", error);
      Alert.alert("Error", "Failed to save entry. Please try again.");
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={true} onRequestClose={hideOverlay} >
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.title}>New Entry</Text>
              <TouchableOpacity style={styles.closeButton} onPress={hideOverlay}>
                <X color={colors.secondaryText} size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} placeholder="Enter a title"
              placeholderTextColor={colors.secondaryText} value={title} onChangeText={setTitle}
            />
            <Text style={styles.label}>How are you feeling?</Text>
            <View style={styles.feelingSelector}>
              {feelingKeys.map(f => (
                <TouchableOpacity key={f} style={[styles.feelingButton,
                feeling === f && styles.feelingSelected]} onPress={() => setFeeling(f)}
                >
                  <FeelingIcon feeling={f} size={16} color={feeling === f ? 'white' : colors.text} />
                  <Text style={[styles.feelingText, feeling === f && styles.feelingTextSelected]}>{capitalize(f)}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Content</Text>
            <TextInput style={[styles.input, styles.multilineInput]} placeholder="Write your thoughts..."
              placeholderTextColor={colors.secondaryText} value={content} onChangeText={setContent} multiline
            />
            <View style={styles.actions}>
              <TouchableOpacity style={styles.secondaryButton} onPress={hideOverlay}>
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={saveEntry}>
                <Text style={styles.primaryButtonText}>Save Entry</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors, fontFamily) => StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', },
  panel: { width: '90%', maxHeight: '85%', backgroundColor: colors.card, borderRadius: 24, padding: 24, flex: 1 },
  scrollContent: { flexGrow: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, },
  closeButton: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: colors.background, justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '500', color: colors.text, fontFamily },
  label: { fontSize: 18, color: colors.secondaryText, marginBottom: 8, marginTop: 16, fontFamily },
  input: {
    width: '100%', padding: 16, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, fontSize: 20, color: colors.text, fontFamily,
  },
  multilineInput: { height: 120, textAlignVertical: 'top', },
  feelingSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, },
  feelingButton: {
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 12, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border,
  },
  feelingSelected: { backgroundColor: '#5B8CFF', borderColor: '#5B8CFF', },
  feelingText: { color: colors.text, fontSize: 18, fontFamily },
  feelingTextSelected: { color: 'white' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 32, paddingTop: 16, borderTopWidth: 1, borderColor: colors.border, },
  secondaryButton: {
    flex: 1, height: 48, borderRadius: 12, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border
  },
  secondaryButtonText: { color: colors.text, fontWeight: '500' },
  primaryButton: { flex: 1, height: 48, borderRadius: 12, backgroundColor: '#5B8CFF', justifyContent: 'center', alignItems: 'center' },
  primaryButtonText: { color: 'white', fontWeight: '500' },
});

export default NewEntryScreen;
