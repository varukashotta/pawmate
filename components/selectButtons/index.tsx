import {StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import React, {FC} from "react";
import {responsiveSize} from "@/components/utils/resposive";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

interface ISelectedButtons {
    label: string, isSelected: boolean, onPress: () => void
}
const SelectButton:FC<ISelectedButtons> = ({label, isSelected, onPress}) => {
    const colorScheme = useColorScheme();
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    borderColor: Colors[colorScheme ?? 'light'].tabIconDefault,
                    backgroundColor: Colors[colorScheme ?? 'light'].background
                },
            ]}
            onPress={onPress}
        >
            <ThemedText style={[styles.buttonText]}>
                {label}
            </ThemedText>
        </TouchableOpacity>
    )
};

export default SelectButton;

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: responsiveSize(12),
        borderWidth: 1,
        borderRadius: responsiveSize(8),
        flexBasis: '32%',
        // marginHorizontal: responsiveSize(6),
        marginBottom: responsiveSize(12),
    },
    buttonText: {textAlign: 'center', marginTop: responsiveSize(4)},
})
