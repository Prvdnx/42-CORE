// Date utilities
export const formatDate = (date) => {
    if (!date) return '';
    const d = date?.toDate ? date.toDate() : new Date(date);
    return d.toLocaleString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).replace(',', ' at');
};

export const getCalendarDate = (date) => {
    if (!date) return '';
    try {
        const d = date?.toDate ? date.toDate() : new Date(date);
        return d.toISOString().split('T')[0];
    } catch { return ''; }
};

// String utilities
export const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
export const sanitizeString = (str) => str?.trim() || '';

// Entry utilities
export const handleDeleteEntry = (entryId, deleteEntryFn, onSuccess) => {
    const { Alert } = require('react-native');
    Alert.alert(
        "Delete Entry",
        "Are you sure you want to delete this entry?",
        [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await deleteEntryFn(entryId);
                    if (onSuccess) onSuccess();
                }
            }
        ]
    );
};
