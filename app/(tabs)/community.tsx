// screens/CommunityScreen.js

import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Text,
} from 'react-native';
import {communityPosts, categories} from "@/assets/data/communityData";
import CategoryItem from "@/components/community/CategoryItem";
import CommunityPost from "@/components/community/CommunityPost";


const CommunityScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('1'); // Default to first category

    // Filter posts based on selected category
    const filteredPosts = communityPosts.filter(
        (post) => post.category === categories.find(cat => cat.id === selectedCategory).name
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Category Scroll */}
            <View style={styles.categoriesContainer}>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CategoryItem
                            category={item}
                            isSelected={item.id === selectedCategory}
                            onPress={setSelectedCategory}
                        />
                    )}
                />
            </View>

            {/* Community Posts */}
            <FlatList
                data={filteredPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CommunityPost post={item} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No posts in this category.</Text>
                    </View>
                }
                contentContainerStyle={
                    filteredPosts.length === 0 ? styles.emptyList : null
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    categoriesContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default CommunityScreen;
