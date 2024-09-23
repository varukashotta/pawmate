// components/CategoryItem.tsx

import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Define the shape of a category object
interface Category {
    id: string | number;
    name: string;
    icon: keyof typeof Ionicons.glyphMap; // Ensures icon name is valid
}

// Define the props for the CategoryItem component
interface CategoryItemProps {
    category: Category;
    isSelected: boolean;
    onPress: (id: string | number) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
                                                       category,
                                                       isSelected,
                                                       onPress,
                                                   }) => {
    const colorScheme = useColorScheme();

    // Determine the icon color based on selection and color scheme
    const iconColor = isSelected
        ? Colors[colorScheme ?? 'light'].icon
        : Colors[colorScheme ?? 'light'].icon;

    // Handle the press event
    const handlePress = (event: GestureResponderEvent) => {
        onPress(category.id);
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
            ]}
            onPress={handlePress}
            activeOpacity={0.7} // Optional: Adds feedback on press
        >
            <Ionicons name={category.icon} size={24} color={iconColor} />
            <ThemedText
                fontSize="mini"
                style={[
                    styles.text,
                ]}
            >
                {category.name}
            </ThemedText>
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
    },
    text: {
        marginTop: 5,
    },

});

export default CategoryItem;
