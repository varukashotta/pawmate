// screens/MarketplaceScreen.tsx

import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Text,
    TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { products, productCategories } from "@/assets/data/marketplace";
import CategoryItem from "@/components/community/CategoryItem";
import ProductCard from "@/components/marketplace/ProductCard";

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
        <SafeAreaView style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#999" />
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
                    data={[{ id: 'all', name: 'All', icon: 'grid-outline' }, ...productCategories]}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
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
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={handleProductPress} />
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 15,
        paddingHorizontal: 10,
        borderRadius: 20,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 1 }, // iOS shadow
        shadowOpacity: 0.1, // iOS shadow
        shadowRadius: 2, // iOS shadow
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    categoriesContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
        marginBottom: 5,
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
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
});

export default MarketplaceScreen;
