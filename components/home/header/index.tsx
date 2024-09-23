import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import Notification from "@/components/notifications";
import {Ionicons} from "@expo/vector-icons";
import {responsiveSize} from "@/components/utils/resposive";
import React, {Dispatch, FC, SetStateAction} from "react";
import {Link} from "expo-router";



interface IHeader {
    showBookingAlert: boolean;
    setShowBookingAlert: Dispatch<SetStateAction<boolean>>;
}
const Header:FC<IHeader> = ({showBookingAlert, setShowBookingAlert}) => {

    const colorScheme = useColorScheme();
    // Colors[colorScheme ?? 'light'].tint
    return (

        <ThemedView style={styles.header}>
            <View style={styles.headerTitleContainer}>
                <ThemedText fontSize={"title"} fontWeight={"bold"}>Al, Welcome to PetSphere!</ThemedText>

                {/* Schedule Alert */}
                {showBookingAlert && (
                    <Notification setShowBookingAlert={setShowBookingAlert}/>
                )}
            </View>

            {/* Icons */}
            <View style={styles.headerIconsContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="search" size={responsiveSize(24)} color={Colors[colorScheme ?? 'light'].icon}/>
                </TouchableOpacity>
                <Link href="/notifications" asChild>
                <TouchableOpacity style={[styles.iconButton]}>
                    <View>
                        <Ionicons name="notifications-outline" size={responsiveSize(24)} color={Colors[colorScheme ?? 'light'].icon}/>
                        {/* Notification Badge */}
                        <View style={[styles.badge,  {backgroundColor: Colors[colorScheme ?? 'light'].buttonBg }]}>
                            <Text style={[styles.badgeText, {color: Colors[colorScheme ?? "light"].buttonText}]}>5</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                </Link>
            </View>
        </ThemedView>
    )
}

export default Header


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: responsiveSize(16),
        // paddingBottom: responsiveSize(16),
    },
    headerTitleContainer: {
        flex: 1,
    },
    headerIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: responsiveSize(16),
        paddingHorizontal: responsiveSize(10)
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: 1,
        borderRadius: 10,
        width: responsiveSize(18),
        height: responsiveSize(18),
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: responsiveSize(12),
        fontWeight: 'bold',
    },
})
