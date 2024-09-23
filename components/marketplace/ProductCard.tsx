// components/ProductCard.tsx

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

interface Product {
    image: string;
    name: string;
    price: string;
    rating: number;
}

interface ProductCardProps {
    product: Product;
    onPress: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    const colorSchemes = useColorScheme();

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <ThemedView style={[styles.infoContainer, {backgroundColor: Colors[colorSchemes ?? "light"].cardBg}]}>
                <ThemedText style={styles.name} numberOfLines={1}>
                    {product.name}
                </ThemedText>
                <ThemedText fontSize={"small"} style={styles.price}>{product.price}</ThemedText>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <ThemedText style={styles.ratingText}>{product.rating}</ThemedText>
                </View>
            </ThemedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        flex: 1,
        margin: 5,
    },
    image: {
        width: '100%',
        height: 120,
        backgroundColor: '#e0e0e0',
    },
    infoContainer: {
        padding: 10,
    },
    name: {

    },
    price: {
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
    },
});

export default ProductCard;
