import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {useColorScheme} from "@/hooks/useColorScheme";


interface IButton {
    title: string,   // Default button title
    onPress: () => void,           // Function to handle press
    size?: 'default' | 'large' | 'small',  // Default button size, can be 'default', 'large', 'small'
    customStyles?: {},
}

const Button: FC<IButton> = ({
                                 title = 'Button',   // Default button title
                                 onPress,           // Function to handle press
                                 size = 'default',  // Default button size, can be 'default', 'large', 'small'
                                 customStyles = {}, // Optional custom styles
                             }) => {
    const colorSchemes = useColorScheme();
    // Define the styles for different button sizes
    const buttonStyles = [
        styles.submitButton,
        size === 'large' ? styles.large : size === 'small' ? styles.small : styles.default,
        {backgroundColor: Colors[colorSchemes ?? 'light'].buttonBg},
        customStyles,
    ];

    return (
        <TouchableOpacity style={buttonStyles} onPress={onPress}>
            <ThemedText fontWeight={"semiBold"} style={{color:Colors[colorSchemes ?? 'light'].buttonText}}>{title}</ThemedText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    submitButton: {
        width: '100%',           // Always 100% width
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,     // Default padding
        borderRadius: 5,
    },
    default: {
        paddingVertical: 10,     // Default button padding
    },
    large: {
        paddingVertical: 16,     // Larger padding for large button
    },
    small: {
        paddingVertical: 5,      // Smaller padding for small button
    },
});

export default Button;
