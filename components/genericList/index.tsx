// GenericList.tsx
import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ListProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
}

const GenericList = <T,>({ data, renderItem }: ListProps<T>) => {
    const colorScheme = useColorScheme();
    const borderColor = Colors[colorScheme ?? 'light'].tabIconDefault;

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View style={[styles.itemContainer, { borderColor }]}>
                    {renderItem(item)}
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text>No Items</Text>}
            contentContainerStyle={styles.scrollContainer}
        />
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 10,
    },
    itemContainer: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderBottomWidth: 1,
    },
});

export default GenericList;
