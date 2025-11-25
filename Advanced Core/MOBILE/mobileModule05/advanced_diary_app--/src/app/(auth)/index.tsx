import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, StatusBar, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import EntriesList from "../../components/EntriesList";
import { collection, query, where, onSnapshot, limit } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Feeling, feelingIcons, FEELINGS } from "../../constants/feelings";

const backgroundImage = require("../../../assets/images/top_profile.png");

export default function Profile() {
	const { user } = useUser();
	const { signOut } = useAuth();

	const [totalEntries, setTotalEntries] = useState(0);
	const [feelingPercentages, setFeelingPercentages] = useState<Record<Feeling, number>>(
		() => Object.fromEntries(FEELINGS.map(f => [f.title, 0])) as Record<Feeling, number>
	);

	useEffect(() => {
		if (user && user.primaryEmailAddress?.emailAddress) {
			const q = query(
				collection(db, "entries"),
				where("userEmail", "==", user.primaryEmailAddress.emailAddress)
			);
			const unsubscribe = onSnapshot(q, (snapshot) => {
				const entries = snapshot.docs
					.map((doc) => doc.data())
					.filter((entry) => entry.date != null);
				setTotalEntries(entries.length);

				const feelingCounts = Object.fromEntries(FEELINGS.map(f => [f.title, 0])) as Record<Feeling, number>;

				entries.forEach((entry) => {
					const feeling = entry.feeling as Feeling;
					if (feeling in feelingCounts) {
						feelingCounts[feeling]++;
					}
				});

				const percentages = { ...feelingCounts };

				FEELINGS.map((f) => f.title).forEach((feeling) => {
					percentages[feeling] =
						entries.length > 0
							? Math.round((feelingCounts[feeling] / entries.length) * 100)
							: 0;
				});
				setFeelingPercentages(percentages);
			});
			return () => unsubscribe();
		}
	}, [user]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
			<StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
			<ImageBackground
				source={backgroundImage}
				style={styles.orderTopProfile}
				resizeMode="cover"
				imageStyle={{ borderRadius: 16 }}
			>
				<View style={styles.headerLeft}>
					<Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
					<Text style={styles.text}>{user?.firstName}</Text>
				</View>
				<View style={{ justifyContent: "center", alignItems: "flex-end" }}>
					<Button
						icon="log-out-outline"
						icolor="#ef4444"
						isize={32}
						onPress={() => signOut()}
						style={{ padding: 0 }}
					/>
				</View>
			</ImageBackground>
			<View style={styles.statsOrder}>
				<View style={styles.statsContainer}>
					<Text style={styles.statsTitle}>Your Stats</Text>
					<Text style={styles.statsText}>Total Entries: {totalEntries}</Text>
				</View>
				<View style={styles.percentageContainer}>
					<Text style={styles.moodTitle}>Your Mood For Entries</Text>
					<View style={styles.moodGrid}>
						{FEELINGS.map(({ title: feeling }) => (
							<Text key={feeling} style={styles.percentageText}>
								{feelingIcons[feeling]}: {feelingPercentages[feeling]}%
							</Text>
						))}
					</View>
				</View>
			</View>
			<View style={styles.container}>
				<Text style={styles.mainTitle}>Your last diary entries</Text>
				<EntriesList />
				<Button
					icon="add"
					icolor="#ffffff"
					buttonText="New Diary Entry"
					txcolor="#ffffff"
					bgcolor="#3b82f6"
					loadcolor="#ffffff"
					onPress={() => router.navigate("/new-entry")}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8fafc",
		padding: 20,
		alignItems: "center",
		gap: 16,
	},
	orderTopProfile: {
		marginHorizontal: 8,
		marginVertical: 18,
		padding: 15,
		paddingLeft: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	text: {
		fontSize: 25,
		fontFamily: "Kalam-Bold",
		color: "#1f2937",
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	mainTitle: {
		fontSize: 28,
		fontFamily: "Kalam-Bold",
		color: "#1f2937",
		textAlign: "center",
		// marginBottom: 8,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 3,
		borderColor: "#ffffff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},
	statsContainer: {
		width: "90%",
		padding: 20,
		backgroundColor: "#ffffff",
		borderRadius: 16,
		marginBottom: 16,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	statsTitle: {
		fontSize: 20,
		fontFamily: "Kalam-Bold",
		color: "#374151",
		marginBottom: 8,
	},
	statsText: {
		fontSize: 18,
		fontFamily: "Kalam-Regular",
		color: "#6b7280",
	},
	percentageContainer: {
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 20,
		backgroundColor: "#ffffff",
		borderRadius: 16,
		marginBottom: 16,
		gap: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		borderWidth: 1,
		borderColor: "#e5e7eb",
		flexWrap: "wrap",
	},
	percentageText: {
		fontSize: 16,
		fontFamily: "Kalam-Regular",
		color: "#4b5563",
		textAlign: "center",
		minWidth: 60,
	},
	moodTitle: {
		fontSize: 18,
		fontFamily: "Kalam-Bold",
		color: "#374151",
		textAlign: "center",
		marginBottom: 12,
	},
	moodGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		width: "100%",
	},
	statsOrder: {
		alignItems: "center",
		marginTop: 16,
		width: "100%",
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	headerRight: {
		justifyContent: "center",
		alignItems: "flex-end",
	},
});