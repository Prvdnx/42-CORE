import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { router, Stack } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "../utils/tokenCache";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
	.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
	const { isSignedIn, isLoaded } = useAuth();

	const [fontsLoaded] = useFonts({
		"Kalam-Regular": require("../../assets/fonts/Kalam-Regular.ttf"),
		"Kalam-Bold": require("../../assets/fonts/Kalam-Bold.ttf"),
	});

	useEffect(() => {
		if (!isLoaded || !fontsLoaded) return;

		if (isSignedIn) {
			router.replace("/(auth)");
		} else {
			router.replace("/(public)");
		}
	}, [isSignedIn, isLoaded, fontsLoaded]);

	if (!isLoaded || !fontsLoaded) {
		return <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(auth)" />
			<Stack.Screen name="(public)" />
			<Stack.Screen name="entry-details" />
			<Stack.Screen name="new-entry" />
		</Stack>
	);
}

export default function Layout() {
	return (
		<ClerkProvider
			publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}
		>
			<InitialLayout />
		</ClerkProvider>
	);
}