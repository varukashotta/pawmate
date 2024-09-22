import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Animated,
    PanResponder,
    FlatList
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { dummyData } from '@/assets/data/data';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

// Define types for Appointments
interface Appointment {
    id: number;
    title: string;
    date: string;
}

// Define Props for AppointmentsList component
interface AppointmentsListProps {
    data: Appointment[];
}

// Component to display the appointments list for a tab using FlatList
const AppointmentsList: React.FC<AppointmentsListProps> = ({ data }) => {
    const colorScheme = useColorScheme();
    const borderColor = Colors[colorScheme ?? 'light'].tabIconDefault;

    const renderItem = ({ item }: { item: Appointment }) => (
        <View key={item.id} style={[styles.appointmentCard, { borderColor }]}>
            <ThemedText fontWeight={"semiBold"}>{item.title}</ThemedText>
            <ThemedText fontWeight={"light"} fontSize={"mini"}>{item.date}</ThemedText>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>No Appointments</Text>}
            contentContainerStyle={styles.scrollContainer}
        />
    );
};

// Main Booking Component
const Booking: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0); // 0 for Upcoming, 1 for Past, 2 for Active
    const translateX = new Animated.Value(0); // Animation for swipe
    const underlinePosition = new Animated.Value(0); // Animation for underline position

    const tabData = [dummyData.upcoming, dummyData.past, dummyData.active]; // Array of tab data

    useEffect(() => {
        // Animate the tab swipe
        Animated.spring(translateX, {
            toValue: -activeTab * width,
            useNativeDriver: true,
        }).start();

        // Animate the underline position based on the active tab
        Animated.timing(underlinePosition, {
            toValue: activeTab * (width / 3), // Each tab takes up 1/3 of the width
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [activeTab]);

    // PanResponder to handle swipe gestures
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderMove: (_, gestureState) => {
            translateX.setValue(-activeTab * width + gestureState.dx); // Move the content while swiping
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 50 && activeTab > 0) {
                setActiveTab((prevTab) => prevTab - 1); // Swiping right
            } else if (gestureState.dx < -50 && activeTab < 2) {
                setActiveTab((prevTab) => prevTab + 1); // Swiping left
            } else {
                Animated.spring(translateX, {
                    toValue: -activeTab * width,
                    useNativeDriver: true,
                }).start(); // Return to current tab
            }
        },
    });

    // Handle tab title clicks
    const handleTabPress = (index: number) => setActiveTab(index);

    const colorScheme = useColorScheme();

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.container}>
                {/* Tab Titles */}
                <View style={styles.tabContainer}>
                    {['Upcoming', 'Past', 'Active'].map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.tab,
                            ]}
                            onPress={() => handleTabPress(index)}
                        >
                            <ThemedText fontWeight={activeTab === index ? "semiBold" : "regular"}>
                                {tab}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Active Tab Underline */}
                <View style={styles.underlineContainer}>
                    <Animated.View
                        style={[
                            styles.activeUnderline,
                            { transform: [{ translateX: underlinePosition }], backgroundColor: Colors[colorScheme ?? "light"].tint } // Updated underline animation
                        ]}
                    />
                </View>

                {/* Tab Content */}
                <Animated.View
                    style={[styles.contentContainer, { transform: [{ translateX }] }]}
                    {...panResponder.panHandlers}
                >
                    {tabData.map((data, index) => (
                        <View key={index} style={styles.screen}>
                            <AppointmentsList data={data} />
                        </View>
                    ))}
                </Animated.View>
            </SafeAreaView>
        </ThemedView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    tab: {
        padding: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    activeUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 4,
        width: width / 3,
    },
    underlineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
    },
    contentContainer: {
        flexDirection: 'row',
        width: width * 3, // 3 screens, one for each tab
    },
    screen: {
        width: width, // Full width of each screen
    },
    scrollContainer: {
        padding: 10,
    },
    appointmentCard: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderBottomWidth: 1,
    },
});

export default Booking;
