import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {StatusBar} from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (<ThemedView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <StatusBar hidden={true}/>
            <ThemedText>Al.</ThemedText>
        </ThemedView>
    );
}
