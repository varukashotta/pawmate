import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {ThemedText} from "@/components/ThemedText";

// Responsive sizing function
const responsiveSize = (size: number) => {
    const { width, height } = Dimensions.get('window');
    const baseWidth = 375; // Base width for scaling
    const scale = Math.min(width, height) / baseWidth;
    return Math.round(size * scale);
};

interface CategoryButtonProps {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ iconName, title, subtitle }) => (
    <TouchableOpacity style={styles.categoryButton}>
        <Ionicons name={iconName} size={responsiveSize(24)} color="#000" />
        <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>{title}</ThemedText>
        <ThemedText type="default" style={styles.categorySubtitle}>{subtitle}</ThemedText>
    </TouchableOpacity>
);

interface EventCardProps {
    image: string;
    title: string;
    time: string;
}

const EventCard: React.FC<EventCardProps> = ({ image, title, time }) => (
    <View style={styles.eventCard}>
        <Image source={{ uri: image }} style={styles.eventImage} />
        <ThemedText type="defaultSemiBold" style={styles.eventTitle}>{title}</ThemedText>
        <ThemedText type="default" style={styles.eventTime}>{time}</ThemedText>
    </View>
);

const EmergencyScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <ThemedText type="title">Al, Welcome to PetSphere!</ThemedText>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="search" size={responsiveSize(24)} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.categoriesContainer}>
                    <CategoryButton iconName="bed-outline" title="Find a Vet" subtitle="Veterinary" />
                    <CategoryButton iconName="cut-outline" title="Pet Care" subtitle="Grooming" />
                    <CategoryButton iconName="people-outline" title="Emergency" subtitle="Resources" />
                    <CategoryButton iconName="cart-outline" title="Pet Supplies" subtitle="Marketplace" />
                </View>

                <ThemedText type="subtitle" style={styles.sectionTitle}>Emergency Events</ThemedText>
                <ScrollView horizontal style={styles.eventsContainer}>
                    <EventCard
                        image="https://picsum.photos/200/300"
                        title="Cat adoption event"
                        time="Sun, 2pm"
                    />
                    <EventCard
                        image="https://picsum.photos/200/300"
                        title="Dog walking group"
                        time="Mon, 5pm"
                    />
                    <EventCard
                        image="https://picsum.photos/200/300"
                        title="Kitty playtime"
                        time="Tue, 3pm"
                    />
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: responsiveSize(16),
    },
    title: {
        fontSize: responsiveSize(38),
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: responsiveSize(16),
    },
    categoryButton: {
        width: '48%',
        backgroundColor: '#fff',
        padding: responsiveSize(16),
        borderRadius: responsiveSize(8),
        marginBottom: responsiveSize(16),
        borderWidth: 1,
        borderColor: "#e1e1e1",
        height: Dimensions.get("window").height / 8
    },
    categoryTitle: {
        marginTop: responsiveSize(8),
    },
    categorySubtitle: {
        color: '#666',
    },
    sectionTitle: {
        padding: responsiveSize(16),
    },
    eventsContainer: {
        paddingLeft: responsiveSize(16),
    },
    eventCard: {
        marginRight: responsiveSize(16),
        width: responsiveSize(150),
    },
    eventImage: {
        width: responsiveSize(150),
        height: responsiveSize(150),
        borderRadius: responsiveSize(8),
    },
    eventTitle: {
        marginTop: responsiveSize(8),
    },
    eventTime: {
        color: '#666',
    },
});

export default EmergencyScreen;
