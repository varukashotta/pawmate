import {StyleSheet, Text, type TextProps, View} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';
import {
    Figtree_300Light,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
    useFonts
} from '@expo-google-fonts/figtree';
import {responsiveSize} from "@/components/utils/resposive";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    fontSize?: 'mini' | 'tiny' | 'small' | 'default' | 'large' | 'title';
    fontWeight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold';
};

export function ThemedText({
                               style,
                               lightColor,
                               darkColor,
                               fontSize = 'default',  // Default font size
                               fontWeight = 'regular',  // Default font weight
                               ...rest
                           }: ThemedTextProps) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
    const [fontsLoaded] = useFonts({
        Figtree_400Regular,
        Figtree_600SemiBold,
        Figtree_300Light, Figtree_500Medium, Figtree_700Bold, Figtree_800ExtraBold,
    });

    if (!fontsLoaded) {
        return <View><Text>Loading</Text></View>;
    }

    // Map the fontSize prop to responsive sizes
    const getFontSize = () => {
        switch (fontSize) {
            case 'mini': return responsiveSize(12);
            case 'tiny': return responsiveSize(14);
            case 'small': return responsiveSize(16);
            case 'default': return responsiveSize(18);
            case 'large': return responsiveSize(24);
            case 'title': return responsiveSize(32);
            default: return responsiveSize(18);
        }
    };

    // Map the fontWeight prop to the appropriate font family
    const getFontFamily = () => {
        switch (fontWeight) {
            case 'light': return 'Figtree_300Light';
            case 'regular': return 'Figtree_400Regular';
            case 'medium': return 'Figtree_500Medium';
            case 'semiBold': return 'Figtree_600SemiBold';
            case 'bold': return 'Figtree_700Bold';
            case 'extraBold': return 'Figtree_800ExtraBold';
            default: return 'Figtree_500Medium';  // Default to medium weight
        }
    };

    return (
        <Text
            style={[
                {color, fontSize: getFontSize(), fontFamily: getFontFamily()},
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: responsiveSize(18),
        fontFamily: 'Figtree_400Regular',
    }
});
