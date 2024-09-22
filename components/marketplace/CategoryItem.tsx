// components/CategoryItem.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryItem = ({ category, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isSelected ? styles.selectedContainer : null,
            ]}
            onPress={() => onPress(category.id)}
        >
            <Ionicons
                name={category.icon}
                size={24}
                color={isSelected ? '#fff' : '#1da1f2'}
            />
            <Text
                style={[
                    styles.text,
                    isSelected ? styles.selectedText : null,
                ]}
            >
                {category.name}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    selectedContainer: {
        backgroundColor: '#1da1f2',
    },
    text: {
        marginTop: 5,
        fontSize: 12,
        color: '#1da1f2',
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CategoryItem;
