import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingSpinner = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#5B8CFF" />
    </View>
);

const styles = StyleSheet.create({
    container: { paddingVertical: 60, alignItems: 'center' },
});

export default LoadingSpinner;
