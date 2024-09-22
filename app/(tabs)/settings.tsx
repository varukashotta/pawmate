// src/screens/SettingsScreen.tsx

import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Switch, SafeAreaView, SectionListData } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {responsiveSize} from "@/components/utils/resposive";

// Define the type for each item in the sections
interface SettingsItem {
    key: string;
    onPress?: () => void;
    type?: 'switch';
    value?: boolean | string;
    onToggle?: () => void;
}

// Define the type for each section
interface SettingsSection {
    title: string;
    data: SettingsItem[];
}

const SettingsScreen: React.FC = () => {
    const [isPushEnabled, setIsPushEnabled] = React.useState<boolean>(false);
    const [isEmailEnabled, setIsEmailEnabled] = React.useState<boolean>(false);

    const togglePushSwitch = () => setIsPushEnabled(previousState => !previousState);
    const toggleEmailSwitch = () => setIsEmailEnabled(previousState => !previousState);

    const colorSchemes = useColorScheme();

    const sections: SettingsSection[] = [
        {
            title: 'Account Settings',
            data: [
                { key: 'Profile', onPress: () => console.log('Profile Pressed') },
                { key: 'Change Password', onPress: () => console.log('Change Password Pressed') },
                { key: 'Privacy', onPress: () => console.log('Privacy Pressed') },
            ],
        },
        {
            title: 'Notifications',
            data: [
                { key: 'Push Notifications', type: 'switch', value: isPushEnabled, onToggle: togglePushSwitch },
                { key: 'Email Notifications', type: 'switch', value: isEmailEnabled, onToggle: toggleEmailSwitch },
            ],
        },
        {
            title: 'Pet Management',
            data: [
                { key: 'Add Pet', onPress: () => console.log('Add Pet Pressed') },
                { key: 'Edit Pets', onPress: () => console.log('Edit Pets Pressed') },
            ],
        },
        {
            title: 'Preferences',
            data: [
                { key: 'Theme', onPress: () => console.log('Theme Pressed') },
                { key: 'Language', onPress: () => console.log('Language Pressed') },
            ],
        },
        {
            title: 'About',
            data: [
                { key: 'Terms of Service', onPress: () => console.log('Terms Pressed') },
                { key: 'Privacy Policy', onPress: () => console.log('Privacy Policy Pressed') },
                { key: 'App Version', value: '1.0.0' },
            ],
        },
    ];

    const renderItem = ({ item }: { item: SettingsItem }) => {
        if (item.type === 'switch') {
            return (
                <View style={[styles.itemContainer]}>
                    <ThemedText style={styles.itemText}>{item.key}</ThemedText>
                    <Switch
                        onValueChange={item.onToggle}
                        value={item.value as boolean}
                    />
                </View>
            );
        } else if (item.value) {
            return (
                <View style={[styles.itemContainer, ]}>
                    <ThemedText style={styles.itemText}>{item.key}</ThemedText>
                    <ThemedText style={styles.itemValue}>{item.value}</ThemedText>
                </View>
            );
        } else if (item.onPress) {
            return (
                <TouchableOpacity style={[styles.itemContainer]} onPress={item.onPress}>
                    <ThemedText style={styles.itemText}>{item.key}</ThemedText>
                </TouchableOpacity>
            );
        } else {
            return null; // Handle cases where neither onPress nor value is provided
        }
    };

    const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
        <ThemedText fontWeight={"bold"} style={styles.sectionHeader}>{title}</ThemedText>
    );

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <ThemedText fontSize={"title"} fontWeight="bold" style={styles.header}>
                    Settings
                </ThemedText>
                <SectionList
                    showsVerticalScrollIndicator={false}
                    sections={sections}
                    keyExtractor={(item, index) => `${item.key}-${index}`}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    ItemSeparatorComponent={() => <View style={[styles.separator, {backgroundColor: Colors[colorSchemes ?? "light"].tabIconDefault}]} />}
                    stickySectionHeadersEnabled={false}
                />
            </SafeAreaView>
        </ThemedView>
    );
};

export default SettingsScreen;

// Styles can remain in the same file or be moved to a separate styles.ts file

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        marginBottom: 16,
    },
    sectionHeader: {
        paddingVertical: 8,
        marginTop: 16,
        borderRadius: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: responsiveSize(16),
        paddingHorizontal: 16,
    },
    itemText: {
    },
    itemValue: {
    },
    separator: {
        height: 1,
        marginLeft: 16,
    },
});
