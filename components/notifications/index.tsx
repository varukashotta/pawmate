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
                <ThemedText style={styles.bookingAlertText}>
                    0 upcoming bookings -
                </ThemedText>
                <TouchableOpacity onPress={() => {/* Navigate to booking screen */
                }}>
                    <ThemedText style={[styles.bookingAlertText, styles.bookingAlertLink]}>
                        {' '}
                        book now
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
        backgroundColor: '#800020', // Burgundy red
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
        fontSize: responsiveSize(14),
    },
    bookingAlertLink: {
        textDecorationLine: 'underline',
    },
})
