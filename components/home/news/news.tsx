import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Image, StyleSheet, Dimensions } from "react-native";
import { responsiveSize } from "@/components/utils/resposive";

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
    return (
        <ThemedView style={styles.petNewsCard}>
            <ThemedView style={styles.textContainer}>
                <ThemedText type="defaultSemiBold" style={styles.petNewsTitle}>{title}</ThemedText>
                <ThemedView style={styles.petNewsFooter}>
                    <ThemedText type="default" style={styles.petNewsAuthor}>By {author}</ThemedText>
                    <ThemedText type="default" style={styles.petNewsDate}>{date} | {time}</ThemedText>
                </ThemedView>
            </ThemedView>
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
        borderColor: '#e1e1e1',
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
        fontSize: responsiveSize(16),
        marginBottom: responsiveSize(4),
    },
    petNewsAuthor: {
        fontSize: responsiveSize(14),
        color: '#666',
    },
    petNewsDate: {
        fontSize: responsiveSize(12),
        color: '#999',
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
