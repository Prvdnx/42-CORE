import { Timestamp } from "firebase/firestore";

export const FEELINGS = [
	{ title: "amazing", emoji: "🤩" },
	{ title: "very good", emoji: "😊" },
	{ title: "good", emoji: "🙂" },
	{ title: "okay", emoji: "😐" },
	{ title: "bad", emoji: "😕" },
	{ title: "awful", emoji: "😢" },
	{ title: "terrible", emoji: "😭" },
] as const;

export type Feeling = (typeof FEELINGS)[number]["title"];

export interface Entry {
	id: string;
	title: string;
	date: Timestamp;
	feeling: Feeling;
	content?: string;
}

export const feelingIcons: Record<Feeling, string> = Object.fromEntries(
	FEELINGS.map((f) => [f.title, f.emoji])
) as Record<Feeling, string>;
