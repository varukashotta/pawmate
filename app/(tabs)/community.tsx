// screens/CommunityScreen.js

import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import {categories, communityPosts} from "@/assets/data/community";
import CategoryItem from "@/components/community/CategoryItem";
import CommunityPost from "@/components/community/CommunityPost";
import {ThemedView} from "@/components/ThemedView";


const CommunityScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('1'); // Default to first category

    // Filter posts based on selected category
    const filteredPosts = communityPosts.filter(
        (post) => post.category === categories.find(cat => cat.id === selectedCategory).name
    );

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.container}>
                {/* Category Scroll */}
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
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
                    renderItem={({item}) => <CommunityPost post={item}/>}
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
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoriesContainer: {
        paddingVertical: 10,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default CommunityScreen;
