import {StyleSheet, Text, type TextProps, View} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';
import {Figtree_400Regular, Figtree_600SemiBold, useFonts} from '@expo-google-fonts/figtree';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
                               style,
                               lightColor,
                               darkColor,
                               type = 'default',
                               ...rest
                           }: ThemedTextProps) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
    const [fontsLoaded] = useFonts({
        Figtree_400Regular,
        Figtree_600SemiBold,
    });

    if (!fontsLoaded) {
        return <View><Text>Loading</Text></View>;
    }

    return (
        <Text
            style={[
                {color},
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Figtree_400Regular',
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Figtree_600SemiBold',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
        fontFamily: 'Figtree_600SemiBold',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Figtree_600SemiBold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
        fontFamily: 'Figtree_400Regular',
    },
});
