import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Ionicons} from "@expo/vector-icons";
import {responsiveSize} from "@/components/utils/resposive";
import React, {FC} from "react";

interface INotification {
    setShowBookingAlert: (b: boolean) => void
}

const Notification: FC<INotification> = ({setShowBookingAlert}) => {
    return (<View style={styles.bookingAlert}>
            <View style={styles.bookingAlertTextContainer}>
                <ThemedText fontSize={"tiny"}  style={styles.bookingAlertText}>
                    No Upcoming Bookings -
                </ThemedText>
                <TouchableOpacity onPress={() => {/* Navigate to booking screen */
                }}>
                    <ThemedText fontSize={"tiny"} style={[styles.bookingAlertText, styles.bookingAlertLink]}>
                        {' '}
                        Book Now
                    </ThemedText>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowBookingAlert(false)}>
                <Ionicons name="close" size={responsiveSize(20)} color="#fff"/>
            </TouchableOpacity>
        </View>
    )
}

export default Notification;

const styles = StyleSheet.create({
    bookingAlert: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ff385c', // Burgundy red
        padding: responsiveSize(8),
        borderRadius: 5,
        marginTop: responsiveSize(20),
        marginRight: responsiveSize(16),
        width: Dimensions.get("window").width - 38
    },
    bookingAlertTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookingAlertText: {
        color: '#fff',
    },
    bookingAlertLink: {
        textDecorationLine: 'underline',
    },
})
