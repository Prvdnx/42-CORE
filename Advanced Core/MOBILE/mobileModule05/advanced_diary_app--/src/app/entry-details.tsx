import React from "react";
import { View, Text, StyleSheet, Alert, SafeAreaView, StatusBar } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Button } from "../components/Button";
import { db } from "../services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Entry, feelingIcons } from "../constants/feelings";

export default function EntryDetails() {
	const params = useLocalSearchParams();
	const entry = params.entry ? JSON.parse(params.entry as string) as Entry : null;
	
	const giveup = () => {
		router.back();
	};

	const deleteEntry = async () => {
		if (!entry) return;
		Alert.alert(
			"Delete Entry",
			"Are you sure you want to delete this entry?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							await deleteDoc(doc(db, "entries", entry.id));
							console.log("Entrada deletada:", entry.id);
							router.back();
						} catch (error) {
							console.error("Erro ao deletar entrada:", error);
							Alert.alert("Error", "Failed to delete entry.");
						}
					},
				},
			]
		);
	};

	if (!entry) {
		return (
			<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ fontFamily: "Kalam-Regular", fontSize: 18 }}>Loading...</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="default" />
			<View style={styles.container}>
				<Text style={styles.title}>{entry.title}</Text>
				<Text style={styles.date}>{entry.date ? new Date(entry.date.seconds * 1000).toLocaleDateString() : "No date"}</Text>
				<Text style={styles.text}>Your mood of the day:</Text>
				<Text style={styles.feeling}>
					Feeling {entry.feeling} {feelingIcons[entry.feeling] || "😐"}
				</Text>
				<Text style={styles.text}>Your thoughts:</Text>
				<Text style={styles.content}>{entry.content}</Text>
			</View>
			<View style={styles.order}>
				<Button
					icon="trash"
					icolor="#ffffff"
					buttonText="Delete"
					txcolor="#ffffff"
					bgcolor="red"
					loadcolor="#ffffff"
					onPress={deleteEntry}
				/>
				<Button
					icon="return-down-back"
					icolor="#fff"
					buttonText="Go back to profile"
					txcolor="#fff"
					bgcolor="blue"
					loadcolor="#ffffff"
					onPress={giveup}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		paddingVertical: 50,
	},
	order: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 15,
		width: "100%",
		paddingLeft: 10,
		paddingRight: 10,
		gap: 5,
	},
	text: {
		textAlign: "center",
		fontFamily: "Kalam-Regular",
		marginBottom: 3,
		fontSize: 13,
	},
	title: {
		fontSize: 32,
		fontFamily: "Kalam-Bold",
		borderBottomWidth: 1,
		marginBottom: 5,
		textAlign: "center",
	},
	date: {
		fontSize: 18,
		fontFamily: "Kalam-Regular",
		color: "#666",
		marginBottom: 10,
		textAlign: "center",
	},
	feeling: {
		fontSize: 20,
		fontFamily: "Kalam-Regular",
		marginBottom: 15,
		borderWidth: 1,
		borderRadius: 9,
		padding: 6,
		textAlign: "center",
	},
	content: {
		fontSize: 20,
		fontFamily: "Kalam-Regular",
		borderWidth: 1,
		borderRadius: 9,
		padding: 6,
		lineHeight: 24,
		marginBottom: 20,
		textAlign: "center",
	},
});