import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { responsiveSize } from "@/components/utils/resposive";
import { FontAwesome } from "@expo/vector-icons"; // Ensure you have this installed

// @ts-ignore
const CustomStarRating = ({ rating, maxRating = 5, size = 20, color = "#FFD700" }) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        stars.push(
            <FontAwesome
                key={i}
                name={i <= rating ? "star" : "star-o"}
                size={size}
                color={color}
                style={styles.star}
            />
        );
    }

    return <View style={styles.starContainer}>{stars}</View>;
};

const FeaturedLocation = () => (
    <ThemedView style={styles.outerContainer}>
        {/* Main Container with Border Radius and Light Grey Background */}
        <View style={styles.featuredLocationContainer}>
            {/* Map */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825, // Example coordinates (can be dynamic)
                    longitude: -122.4324,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                    title="Dog's Favorite Beach"
                />
            </MapView>

            {/* Info Overlay */}
            <View style={styles.infoContainer}>
                <View style={styles.infoTextContainer}>
                    <ThemedText type="defaultSemiBold" style={styles.locationTitle}>
                        Dog's Favorite Beach
                    </ThemedText>
                    <CustomStarRating rating={5} />
                    <ThemedText type="default" style={styles.locationDistance}>
                        5 min away
                    </ThemedText>
                </View>
                <TouchableOpacity style={styles.directionsButton} onPress={() => { /* Handle press */ }}>
                    <Text style={styles.buttonText}>Get Directions</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ThemedView>
);

export default FeaturedLocation;

const styles = StyleSheet.create({
    outerContainer: {
        marginHorizontal: responsiveSize(16),
        borderColor: "#f0f0f0", // Light grey background for outer container
        flex: 1, // Ensures the container takes available space
        borderWidth: 1,
        borderRadius: responsiveSize(12),
    },
    featuredLocationContainer: {
        borderRadius: responsiveSize(12),
        overflow: "hidden",
        backgroundColor: "#fff", // White background for the card
        elevation: 3, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 4, // Shadow radius for iOS
    },
    map: {
        width: "100%",
        height: responsiveSize(200),
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: responsiveSize(12),
        // backgroundColor: "#f8f8f8", // Slightly lighter grey for info section
    },
    infoTextContainer: {
        flex: 1,
        marginRight: responsiveSize(8), // Space between text and button
    },
    locationTitle: {
        fontSize: responsiveSize(16),
        marginBottom: responsiveSize(4),
        color: "#333",
    },
    locationDistance: {
        color: "#666",
        marginTop: responsiveSize(4),
    },
    directionsButton: {
        backgroundColor: "#007bff",
        borderRadius: responsiveSize(8),
        paddingVertical: responsiveSize(10),
        paddingHorizontal: responsiveSize(16),
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: responsiveSize(14),
    },
    starContainer: {
        flexDirection: "row",
        marginBottom: responsiveSize(4),
    },
    star: {
        marginRight: responsiveSize(4),
    },
});
