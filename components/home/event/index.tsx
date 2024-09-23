import React from "react";
import {ThemedView} from "@/components/ThemedView";
import {Image, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {EventCardProps} from "@/components/home/event/type";
import {responsiveSize} from "@/components/utils/resposive";


const EventCard: React.FC<EventCardProps> = ({image, title, time}) => (
    <ThemedView style={styles.eventCard}>
        <Image source={{uri: image}} style={styles.eventImage}/>
        <ThemedText fontWeight={"medium"}   style={styles.eventTitle}>{title}</ThemedText>
        <ThemedText fontSize={"tiny"}  style={styles.eventTime}>{time}</ThemedText>
    </ThemedView>
);

export default EventCard

const styles = StyleSheet.create({

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
    },
})
