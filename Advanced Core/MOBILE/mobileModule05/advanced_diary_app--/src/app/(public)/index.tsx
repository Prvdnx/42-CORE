import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../../components/Button";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function Signin() {
	const [isLoading, setIsLoading] = useState(false);
	const googleOAuth = useOAuth({ strategy: "oauth_google" });
	const githubOAuth = useOAuth({ strategy: "oauth_github" });

	async function onGoogleSignIn() {
		try {
			setIsLoading(true);
			const redirectUrl = Linking.createURL("/");
			const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });
			if (oAuthFlow.authSessionResult?.type === "success") {
				if (oAuthFlow.setActive) {
					await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
				}
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	async function onGitHubSignIn() {
		try {
			setIsLoading(true);
			const redirectUrl = Linking.createURL("/");
			const oAuthFlow = await githubOAuth.startOAuthFlow({ redirectUrl });
			if (oAuthFlow.authSessionResult?.type === "success") {
				if (oAuthFlow.setActive) {
					await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
				}
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	useEffect(() => {
		WebBrowser.warmUpAsync();

		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.welcomeCard}>
				<Text style={styles.title}>📝 Diary App</Text>
				<Text style={styles.subtitle}>Welcome to Your Personal Mood Journal</Text>
				<Text style={styles.simpleText}>Choose your preferred sign-in method</Text>
			</View>
			<View style={styles.order}>
				<Button
					icon='logo-google'
					icolor="#ffffff"
					buttonText="Continue with Google"
					txcolor="#ffffff"
					bgcolor="#4285f4"
					loadcolor="#ffffff"
					onPress={onGoogleSignIn}
					isLoading={isLoading}
				/>
				<Button
					icon='logo-github'
					icolor='#ffffff'
					buttonText="Continue with GitHub"
					txcolor="#ffffff"
					bgcolor='#333333'
					loadcolor="#ffffff"
					onPress={onGitHubSignIn}
					isLoading={isLoading}
				/>
			</View>
			<Text style={styles.creditText}>Made with ❤️ ookamonu</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
		backgroundColor: '#f8fafc',
	},
	welcomeCard: {
		alignItems: 'center',
		padding: 30,
		borderRadius: 20,
		backgroundColor: '#ffffff',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		marginBottom: 10,
	},
	title: {
		fontSize: 32,
		fontFamily: "Kalam-Bold",
		fontWeight: '700',
		color: '#1f2937',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 20,
		fontFamily: "Kalam-Regular",
		fontWeight: '500',
		color: '#6b7280',
		textAlign: 'center',
		marginBottom: 12,
	},
	simpleText: {
		fontSize: 20,
		fontFamily: "Kalam-Regular",
		fontWeight: '400',
		color: '#374151',
		textAlign: 'center',
	},
	order: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingBottom: 30,
		paddingTop: 30,
		gap: 15,
	},
	creditText: {
		fontSize: 14,
		fontFamily: "Kalam-Regular",
		color: '#9ca3af',
		fontWeight: '400',
		marginTop: 20,
	},
});