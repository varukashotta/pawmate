import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import notifications from "@/assets/data/notifications.json";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {responsiveSize} from "@/components/utils/resposive";
interface Notification {
    id: string;
    image: string;
    text: string;
    time: string;
}

export default function NotificationsScreen() {

    const colorScheme = useColorScheme();
    const renderItem = ({ item }: { item: Notification }) => (
        <TouchableOpacity style={[styles.notificationRow, {borderColor: Colors[colorScheme ?? 'light'].tabIconDefault}]} onPress={() => alert(`Clicked on: ${item.text}`)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <ThemedText fontSize={"small"}>{item.text}</ThemedText>
                <ThemedText fontSize={"tiny"} fontWeight={"light"}>{item.time}</ThemedText>
            </View>
        </TouchableOpacity>
    );

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 15,
    },
    notificationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 1
    },
    image: {
        width: responsiveSize(50),
        height: responsiveSize(50),
        borderRadius: responsiveSize(10),
        marginRight: responsiveSize(10),
    },
    textContainer: {
        flex: 1,
    },
});
