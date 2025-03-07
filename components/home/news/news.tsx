import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {Image, StyleSheet, Dimensions, View} from "react-native";
import { responsiveSize } from "@/components/utils/resposive";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

interface PetNewsCardProps {
    image: string;
    title: string;
    author: string;
    date: string;
    time: string;
}

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth * 0.8; // 80% of screen width

const PetNewsCard: React.FC<PetNewsCardProps> = ({ image, title, author, date, time }) => {

    const colorScheme = useColorScheme();

    return (
        <ThemedView style={[styles.petNewsCard, {borderColor: Colors[colorScheme ?? 'light'].tabIconDefault, backgroundColor: Colors[colorScheme ?? "light"].cardBg}]}>
            <View style={[styles.textContainer]}>
                <ThemedText fontWeight={"semiBold"} style={styles.petNewsTitle}>{title}</ThemedText>
                <View style={styles.petNewsFooter}>
                    <ThemedText fontSize={"tiny"} style={styles.petNewsAuthor}>By {author}</ThemedText>
                    <ThemedText fontSize={"tiny"} style={styles.petNewsDate}>{date} | {time}</ThemedText>
                </View>
            </View>
            <Image source={{ uri: image }} style={styles.petNewsImage} />
        </ThemedView>
    );
};

export default PetNewsCard;

const styles = StyleSheet.create({
    petNewsCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: responsiveSize(8),
        padding: responsiveSize(8),
        width: CARD_WIDTH,
        height: responsiveSize(100),
        marginRight: responsiveSize(16), // Optional: Add spacing between cards
    },
    textContainer: {
        flex: 1,
        marginRight: responsiveSize(8),
        justifyContent: "space-between"
    },
    petNewsTitle: {
        marginBottom: responsiveSize(4),
    },
    petNewsAuthor: {
    },
    petNewsDate: {
    },
    petNewsFooter: {
        justifyContent: "flex-end",
    },
    petNewsImage: {
        width: responsiveSize(100),
        height: "100%",
        borderRadius: responsiveSize(8),
    },
});
