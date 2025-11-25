import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import { Entry, feelingIcons } from "../constants/feelings";

export default function EntriesList() {
	const { user } = useUser();
	const [entries, setEntries] = useState<Entry[]>([]);
	
	// Get screen dimensions to handle orientation changes
	const { height } = useWindowDimensions();
	const isPortrait = height > useWindowDimensions().width;

	const formatDateToLocal = (timestamp: Timestamp) => {
		if (!timestamp || !timestamp.toDate) return null;
		const date = timestamp.toDate();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	useEffect(() => {
		if (user && user.primaryEmailAddress?.emailAddress) {
			const q = query(
				collection(db, "entries"),
				where("userEmail", "==", user.primaryEmailAddress.emailAddress),
				orderBy("date", "desc"),
				limit(2)
			);
			const unsubscribe = onSnapshot(
				q,
				(snapshot) => {
					const entriesData: Entry[] = snapshot.docs
						.map((doc) => ({
							id: doc.id,
							...doc.data(),
						} as Entry))
						.filter((entry) => entry.date != null);
					setEntries(entriesData);
				},
				(error) => {
					console.error("Error fetching entries:", error);
				}
			);
			return () => unsubscribe();
		}
	}, [user]);

	const truncateTitle = (title: string, maxLength: number) => {
		if (title.length > maxLength) {
			return title.substring(0, maxLength - 3) + "...";
		}
		return title;
	};

	return (
		<FlatList
            style={styles.listContainer} // Set list width to match parent containers
			key={isPortrait ? 'portrait' : 'landscape'} // Force re-render on orientation change
			data={entries}
			keyExtractor={(item) => item.id}
			numColumns={isPortrait ? 1 : 2} // 1 column for portrait, 2 for landscape
			renderItem={({ item }) => (
				<TouchableOpacity
					style={styles.box} // The flex: 1 style will handle the width distribution
					onPress={() => router.push(`/entry-details?entry=${encodeURIComponent(JSON.stringify(item))}`)}
				>
					<View style={styles.boxContent}>
						<Text style={{ fontSize: 18, marginRight: 5 }}>
							{feelingIcons[item.feeling] || "😐"}
						</Text>
						<Text style={styles.entryTitle}>{truncateTitle(item.title, 15)}</Text>
					</View>
					<Text style={styles.text}>
						{item.date ? formatDateToLocal(item.date)?.split('-').reverse().join('/') : "No date"}
					</Text>
				</TouchableOpacity>
			)}
			ListEmptyComponent={<Text style={styles.emptyText}>No recent entries found.</Text>}
		/>
	);
}

const styles = StyleSheet.create({
    listContainer: {
        width: '95%',
    },
	box: {
		flex: 1,
		backgroundColor: "#ffffff",
		padding: 16,
		borderRadius: 12,
		marginVertical: 4,
		marginHorizontal: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	boxContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	entryTitle: {
		fontSize: 18,
		fontFamily: "Kalam-Regular",
	},
	text: {
		fontSize: 14,
		fontFamily: "Kalam-Regular",
		color: "#6b7280",
	},
	emptyText: {
		padding: 10,
		textAlign: "center",
		fontFamily: "Kalam-Regular",
		color: "#9ca3af",
	},
});
