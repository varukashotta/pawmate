// Tabs.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    Animated,
    PanResponder,
    StyleSheet,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Define the structure for each tab
interface Tab<T> {
    label: string;
    data: T[];
    renderItem: (data: T[]) => React.ReactNode;
}

// Define Props for Tabs component
interface TabsProps<T> {
    tabs: Tab<T>[];
}

const Tabs = <T,>({ tabs }: TabsProps<T>) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const translateX = new Animated.Value(0);
    const underlinePosition = new Animated.Value(0);
    const colorScheme = useColorScheme();
    const borderColor = Colors[colorScheme ?? 'light'].tabIconDefault;

    const tabWidth = SCREEN_WIDTH / tabs.length;

    useEffect(() => {
        // Animate the tab swipe
        Animated.spring(translateX, {
            toValue: -activeTab * SCREEN_WIDTH,
            useNativeDriver: true,
        }).start();

        // Animate the underline position based on the active tab
        Animated.timing(underlinePosition, {
            toValue: activeTab * tabWidth,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [activeTab, tabWidth]);

    // PanResponder to handle swipe gestures
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderMove: (_, gestureState) => {
            translateX.setValue(-activeTab * SCREEN_WIDTH + gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 50 && activeTab > 0) {
                setActiveTab((prevTab) => prevTab - 1);
            } else if (gestureState.dx < -50 && activeTab < tabs.length - 1) {
                setActiveTab((prevTab) => prevTab + 1);
            } else {
                Animated.spring(translateX, {
                    toValue: -activeTab * SCREEN_WIDTH,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    return (
        <ThemedView style={styles.container}>
            {/* Tab Titles */}
            <View style={styles.tabContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tab, { width: tabWidth }]}
                        onPress={() => setActiveTab(index)}
                    >
                        <ThemedText fontWeight={activeTab === index ? "semiBold" : "regular"}>
                            {tab.label}
                        </ThemedText>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Active Tab Underline */}
            <View style={styles.underlineContainer}>
                <Animated.View
                    style={[
                        styles.activeUnderline,
                        {
                            width: tabWidth,
                            transform: [{ translateX: underlinePosition }],
                            backgroundColor: Colors[colorScheme ?? "light"].buttonBg
                        }
                    ]}
                />
            </View>

            {/* Tab Content */}
            <Animated.View
                style={[
                    styles.contentContainer,
                    { width: SCREEN_WIDTH * tabs.length, transform: [{ translateX }] }
                ]}
                {...panResponder.panHandlers}
            >
                {tabs.map((tab, index) => (
                    <View key={index} style={[styles.screen, { width: SCREEN_WIDTH }]}>
                        {tab.renderItem(tab.data)}
                    </View>
                ))}
            </Animated.View>
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
        // Each tab will have dynamic width
    },
    tab: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: "center",
    },
    activeUnderline: {
        position: 'absolute',
        bottom: 0,
        height: 4,
    },
    underlineContainer: {
        flexDirection: 'row',
        position: 'relative',
        height: 4,
    },
    contentContainer: {
        flexDirection: 'row',
    },
    screen: {
        // Width is dynamically set in the component
    },
});

export default Tabs;
