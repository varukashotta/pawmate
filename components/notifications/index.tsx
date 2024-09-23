import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Ionicons} from "@expo/vector-icons";
import {responsiveSize} from "@/components/utils/resposive";
import React, {FC} from "react";
import {ThemedView} from "@/components/ThemedView";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

interface INotification {
    setShowBookingAlert: (b: boolean) => void
}

const Notification: FC<INotification> = ({setShowBookingAlert}) => {
    const colorSchem = useColorScheme();

    return (<ThemedView style={[styles.bookingAlert, {backgroundColor: Colors[colorSchem ?? "light"].buttonBg}]}>
            <View style={styles.bookingAlertTextContainer}>
                <ThemedText fontSize={"small"}  style={[styles.bookingAlertText, {color: Colors[colorSchem ?? "light"].buttonText}]}>
                    No Upcoming Bookings -
                </ThemedText>
                <TouchableOpacity onPress={() => {/* Navigate to booking screen */
                }}>
                    <ThemedText fontSize={"small"} style={[styles.bookingAlertText, styles.bookingAlertLink, {color: Colors[colorSchem ?? "light"].buttonText}]}>
                        {' '}
                        Book Now
                    </ThemedText>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowBookingAlert(false)}>
                <Ionicons name="close" size={responsiveSize(20)} color={Colors[colorSchem ?? "light"].buttonText}/>
            </TouchableOpacity>
        </ThemedView>
    )
}

export default Notification;

const styles = StyleSheet.create({
    bookingAlert: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
