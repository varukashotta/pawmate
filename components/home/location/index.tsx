import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { responsiveSize } from "@/components/utils/resposive";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../../button"; // Ensure you have this installed

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
                    <ThemedText  style={styles.locationTitle}>
                        Dog's Favorite Beach
                    </ThemedText>
                    <CustomStarRating rating={5} />
                    <ThemedText fontSize={"small"}  style={styles.locationDistance}>
                        5 min away
                    </ThemedText>
                </View>
                <View style={{flex: 1}}>
                    <Button title={"Direct Me"} onPress={() => console.log("here")} />
                </View>
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
        flex: 1.5,
    },
    locationTitle: {
        marginBottom: responsiveSize(4),
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
    starContainer: {
        flexDirection: "row",
        marginBottom: responsiveSize(4),
    },
    star: {
        marginRight: responsiveSize(4),
    },
});
