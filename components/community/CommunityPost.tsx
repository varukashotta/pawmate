// components/CommunityPost.js

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityPost = ({ post }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.category}>{post.category}</Text>
            </View>
            <View style={styles.meta}>
                <Text style={styles.author}>by {post.author}</Text>
                <Text style={styles.date}>{post.date}</Text>
            </View>
            <Text style={styles.content}>{post.content}</Text>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="arrow-up-outline" size={20} color="#1da1f2" />
                    <Text style={styles.footerText}>{post.upvotes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="chatbubble-outline" size={20} color="#1da1f2" />
                    <Text style={styles.footerText}>{post.comments}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 10,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // Android shadow
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    category: {
        fontSize: 12,
        color: '#1da1f2',
        alignSelf: 'center',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    author: {
        fontSize: 14,
        color: '#555',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    content: {
        fontSize: 14,
        color: '#333',
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
        color: '#1da1f2',
    },
});

export default CommunityPost;
