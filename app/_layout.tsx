import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="+not-found"/>
                <Stack.Screen name="notifications" options={{headerBackTitle: "Home", headerTitle: "Notifications"}}/>
            </Stack>
        </ThemeProvider>
    );
}
