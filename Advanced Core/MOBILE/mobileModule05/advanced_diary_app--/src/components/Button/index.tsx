import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
	buttonText?: string;
	txcolor?: string;
	icolor?: string;
	bgcolor?: string;
	isLoading?: boolean
	loadcolor?: string;
	isize?: number;
	icon?: keyof typeof Ionicons.glyphMap;
}

export function Button({ buttonText, txcolor = '#000000', isLoading = false, icon, icolor = '#000000', isize = 24, bgcolor = 'transparent', loadcolor = '#ffffff', ...rest }: ButtonProps) {
	return (
		<TouchableOpacity style={[styles.container, { backgroundColor: bgcolor }]} disabled={isLoading} activeOpacity={0.8} {...rest}>
			{isLoading ? (
				<ActivityIndicator color={loadcolor}/>
			) : (
				<>
					{icon && <Ionicons name={icon} size={isize} color={icolor} />}
					{buttonText && <Text style={[{ color: txcolor, fontFamily: "Kalam-Bold" }, styles.text]}>{buttonText}</Text>}
				</>
			)}
		</TouchableOpacity>
	)
}