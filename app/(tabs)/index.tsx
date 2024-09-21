import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from '@/components/ThemedView';
import { responsiveSize } from "@/components/utils/resposive";
import PetNewsCard from "@/components/home/news/news";
import FeaturedLocation from "@/components/home/location";
import EventCard from "@/components/home/event";
import CategoryButton from "@/components/home/category";
import Section from "@/components/home/section";

const categories = [
    { iconName: "bed-outline", title: "Find a Vet", subtitle: "Veterinary" },
    { iconName: "cut-outline", title: "Pet Care", subtitle: "Grooming" },
    { iconName: "people-outline", title: "Community", subtitle: "Resources" },
    { iconName: "cart-outline", title: "Pet Supplies", subtitle: "Marketplace" },
];

const events = [
    { id: '1', image: "https://picsum.photos/200/300", title: "Cat adoption event", time: "Sun, 2pm" },
    { id: '2', image: "https://picsum.photos/200/300", title: "Dog walking group", time: "Mon, 5pm" },
    { id: '3', image: "https://picsum.photos/200/300", title: "Kitty playtime", time: "Tue, 3pm" },
];

const petNews = [
    { id: '1', image: "https://picsum.photos/200/200", title: "Top 10 Tips for New Dog Owners", author: "Jane Doe", date: "Sep 21, 2024", time: "10:00 AM" },
    { id: '2', image: "https://picsum.photos/200/200", title: "How to Care for Your Cat", author: "John Smith", date: "Sep 20, 2024", time: "9:00 AM" },
    // Add more news items as needed
];

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <ThemedView style={styles.header}>
                    <ThemedView style={styles.headerTitleContainer}>
                        <ThemedText type="title">Al, Welcome to PetSphere!</ThemedText>
                    </ThemedView>
                    <TouchableOpacity>
                        <Ionicons name="search" size={responsiveSize(24)} color="#000" />
                    </TouchableOpacity>
                </ThemedView>

                {/* Categories */}
                <ThemedView style={styles.categoriesContainer}>
                    {categories.map((category, index) => (
                        <CategoryButton
                            key={index}
                            iconName={category.iconName as keyof typeof Ionicons.glyphMap}
                            title={category.title}
                            subtitle={category.subtitle}
                        />
                    ))}
                </ThemedView>

                {/* Community Events Section */}
                <Section title="Community Events">
                    <FlatList
                        data={events}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScroll}
                        renderItem={({ item }) => (
                            <EventCard
                                image={item.image}
                                title={item.title}
                                time={item.time}
                            />
                        )}
                    />
                </Section>

                {/* Pet News Section */}
                <Section title="Pet News">
                    <FlatList
                        data={petNews}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[styles.horizontalScroll]}
                        renderItem={({ item }) => (
                            <PetNewsCard
                                image={item.image}
                                title={item.title}
                                author={item.author}
                                date={item.date}
                                time={item.time}
                            />
                        )}
                    />
                </Section>

                {/* Featured Friendly Location Section */}
                <Section title="Featured Location">
                    <FeaturedLocation />
                </Section>
            </ScrollView>
        </View>
    );
};



// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: responsiveSize(45)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: responsiveSize(16),
    },
    headerTitleContainer: {
        width: "80%",
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveSize(16),
        paddingBottom: responsiveSize(16),
    },
    horizontalScroll: {
        paddingLeft: responsiveSize(16),
        paddingBottom: responsiveSize(16),
    },
});

export default HomeScreen;
