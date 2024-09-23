// screens/MarketplaceScreen.tsx

import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TextInput, View,} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {productCategories, products} from "@/assets/data/marketplace";
import CategoryItem from "@/components/community/CategoryItem";
import ProductCard from "@/components/marketplace/ProductCard";
import {ThemedView} from "@/components/ThemedView";

interface Product {
    id: string;
    name: string;
    category: string;
    image: string;
    price: string;
    rating: number;
}

interface Category {
    id: string;
    name: string;
    icon: string;
}

const MarketplaceScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter products based on selected category and search query
    const filteredProducts = products.filter((product: Product) => {
        const matchesCategory =
            selectedCategory === 'all' ||
            product.category ===
            productCategories.find((cat: Category) => cat.id === selectedCategory)?.name;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handle category selection
    const handleCategoryPress = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    // Handle product press (navigate to product details)
    const handleProductPress = (product: Product) => {
        // navigation.navigate('ProductDetail', { product });
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#999"/>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>

                {/* Category Scroll */}
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={[{id: 'all', name: 'All', icon: 'grid-outline'}, ...productCategories]}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                            <CategoryItem
                                category={item}
                                isSelected={
                                    item.id === selectedCategory ||
                                    (selectedCategory === 'all' && item.id === 'all')
                                }
                                onPress={handleCategoryPress}
                            />
                        )}
                    />
                </View>

                {/* Product Listings */}
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <ProductCard product={item} onPress={handleProductPress}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No products found.</Text>
                        </View>
                    }
                    contentContainerStyle={
                        filteredProducts.length === 0 ? styles.emptyList : null
                    }
                    numColumns={2} // Display products in a grid with 2 columns
                    columnWrapperStyle={styles.columnWrapper}
                />
            </SafeAreaView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    categoriesContainer: {
        paddingVertical: 10,
        marginBottom: 5,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
});

export default MarketplaceScreen;
