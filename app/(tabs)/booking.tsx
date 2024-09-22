// Booking.tsx
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ThemedView} from '@/components/ThemedView';

import {dummyData} from '@/assets/data/data'; // Your data source
import {ThemedText} from '@/components/ThemedText';
import GenericList from "@/components/genericList";
import Tabs from "@/components/tabNav";
import {responsiveSize} from "@/components/utils/resposive";

interface Appointment {
    id: number;
    title: string;
    date: string;
}

const Booking: React.FC = () => {
    const tabs = [
        {
            label: 'Upcoming',
            data: dummyData.upcoming as Appointment[],
            renderItem: (data: Appointment[]) => (
                <GenericList
                    data={data}
                    renderItem={(item: Appointment) => (
                        <>
                            <ThemedText fontWeight="semiBold">{item.title}</ThemedText>
                            <ThemedText fontWeight="light" fontSize="mini">{item.date}</ThemedText>
                        </>
                    )}
                />
            ),
        },
        {
            label: 'Past',
            data: dummyData.past as Appointment[],
            renderItem: (data: Appointment[]) => (
                <GenericList
                    data={data}
                    renderItem={(item: Appointment) => (
                        <>
                            <ThemedText fontWeight="semiBold">{item.title}</ThemedText>
                            <ThemedText fontWeight="light" fontSize="mini">{item.date}</ThemedText>
                        </>
                    )}
                />
            ),
        },
        {
            label: 'Active',
            data: dummyData.active as Appointment[],
            renderItem: (data: Appointment[]) => (
                <GenericList
                    data={data}
                    renderItem={(item: Appointment) => (
                        <>
                            <ThemedText fontWeight="semiBold">{item.title}</ThemedText>
                            <ThemedText fontWeight="light" fontSize="mini">{item.date}</ThemedText>
                        </>
                    )}
                />
            ),
        },
    ];

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ThemedText fontSize={"title"} fontWeight="bold" style={{
                    paddingHorizontal: responsiveSize(12), marginBottom: 16,
                }}>
                    Schedule
                </ThemedText>
                <Tabs
                    tabs={tabs}
                />
            </SafeAreaView>
        </ThemedView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Booking;
