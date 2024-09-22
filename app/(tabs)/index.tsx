import React from 'react';
import {FlatList, Modal, ScrollView, StatusBar, StyleSheet,} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ThemedView} from '@/components/ThemedView';
import {responsiveSize} from '@/components/utils/resposive';
import PetNewsCard from '@/components/home/news/news';
import FeaturedLocation from '@/components/home/location';
import EventCard from '@/components/home/event';
import CategoryButton from '@/components/home/category';
import Section from '@/components/home/section';
import VetSearchFilter from "@/components/search";
import Header from "@/components/home/header";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";


const categories = [
    {
        iconName: 'bed-outline',
        title: 'Find a Vet',
        subtitle: 'Veterinary',
        description: "Comprehensive healthcare for pets, including medical, preventive, and emergency care."
    },
    {
        iconName: 'cut-outline',
        title: 'Pet Care',
        subtitle: 'Wellness',
        description: "Services that contribute to your pet's overall well-being and daily care needs."
    },
    {
        iconName: 'people-outline',
        title: 'Community',
        subtitle: 'Resources',
        description: "Connect with other pet owners, access resources, and explore pet-friendly spaces."
    },
    {
        iconName: 'cart-outline',
        title: 'Pet Supplies',
        subtitle: 'Marketplace',
        description: "A marketplace for pet products and supplies, DIY resources, and trade opportunities."
    },
];

const events = [
    {id: '1', image: 'https://picsum.photos/200/300', title: 'Cat adoption event', time: 'Sun, 2pm'},
    {id: '2', image: 'https://picsum.photos/200/300', title: 'Dog walking group', time: 'Mon, 5pm'},
    {id: '3', image: 'https://picsum.photos/200/300', title: 'Kitty playtime', time: 'Tue, 3pm'},
];

const petNews = [
    {
        id: '1',
        image: 'https://picsum.photos/200/200',
        title: 'Top 10 Tips for New Dog Owners',
        author: 'Jane Doe',
        date: 'Sep 21, 2024',
        time: '10:00 AM',
    },
    {
        id: '2',
        image: 'https://picsum.photos/200/200',
        title: 'How to Care for Your Cat',
        author: 'John Smith',
        date: 'Sep 20, 2024',
        time: '9:00 AM',
    },
    // Add more news items as needed
];

const HomeScreen: React.FC = () => {
    const [showBookingAlert, setShowBookingAlert] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const categoryClicked = () => {
        setShowModal(true)
    }

    const colorScheme = useColorScheme();

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Header showBookingAlert={showBookingAlert} setShowBookingAlert={setShowBookingAlert}/>

                {/* Categories */}
                <ThemedView style={styles.categoriesContainer}>
                    {categories.map((category, index) => (
                        <CategoryButton
                            categoryClicked={categoryClicked}
                            key={index}
                            iconName={category.iconName as keyof typeof Ionicons.glyphMap}
                            title={category.title}
                            subtitle={category.subtitle}
                            description={category.description}
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
                        renderItem={({item}) => (
                            <EventCard image={item.image} title={item.title} time={item.time}/>
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
                        renderItem={({item}) => (
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
                    <FeaturedLocation/>
                </Section>
            </ScrollView>
            <Modal visible={showModal} animationType={"slide"}>
                <StatusBar hidden={true}/>
                <ScrollView style={{
                    flex: 1,
                    paddingTop: responsiveSize(50),
                    backgroundColor: Colors[colorScheme ?? 'light'].background
                }}>
                    <Ionicons style={{alignSelf: "flex-end", paddingRight: responsiveSize(10)}} name={"close"}
                              size={responsiveSize(35)} color={Colors[colorScheme ?? 'light'].tint}
                              onPress={() => setShowModal(false)}/>
                    <VetSearchFilter/>
                </ScrollView>
            </Modal>
        </ThemedView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: responsiveSize(55),
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
