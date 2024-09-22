// components/ProductCard.js

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductCard = ({ product, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {product.name}
                </Text>
                <Text style={styles.price}>{product.price}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 }, // iOS shadow
        shadowOpacity: 0.1, // iOS shadow
        shadowRadius: 5, // iOS shadow
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
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 14,
        color: '#1da1f2',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 12,
        color: '#555',
    },
});

export default ProductCard;
