import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

// Define the types for the post prop
interface Post {
    title: string;
    category: string;
    author: string;
    date: string;
    content: string;
    upvotes: number;
    comments: number;
}

interface CommunityPostProps {
    post: Post;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
    const colorSchemes = useColorScheme();

    return (
        <ThemedView style={[styles.card, {borderBottomColor: Colors[colorSchemes ?? "light"].tabIconDefault}]}>
            <View style={styles.header}>
                <ThemedText fontSize={"tiny"} style={styles.title}>{post.title}</ThemedText>
                <ThemedText fontSize={"tiny"} style={styles.category}>{post.category}</ThemedText>
            </View>
            <View style={styles.meta}>
                <ThemedText fontSize={"tiny"} style={styles.author}>by {post.author}</ThemedText>
                <ThemedText fontSize={"tiny"} style={styles.date}>{post.date}</ThemedText>
            </View>
            <ThemedText style={styles.content}>{post.content}</ThemedText>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="arrow-up-outline" size={20} color={Colors[colorSchemes ?? "light"].tint} />
                    <ThemedText fontSize={"tiny"} style={styles.footerText}>{post.upvotes}</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="chatbubble-outline" size={20} color={Colors[colorSchemes ?? "light"].tint} />
                    <ThemedText fontSize={"tiny"} style={styles.footerText}>{post.comments}</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        // marginHorizontal: 15,
        // marginVertical: 8,
        borderBottomWidth: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        marginRight: 10,
    },
    category: {
        alignSelf: 'center',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    author: {},
    date: {},
    content: {
        marginVertical: 10,
    },
    footer: {
        flexDirection: 'row',
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    footerText: {
        marginLeft: 5,
    },
});

export default CommunityPost;
