import {Ionicons} from "@expo/vector-icons";
import {CategoryButtonProps} from "@/components/home/category/type";
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {responsiveSize} from "@/components/utils/resposive";
import truncateText from "@/components/utils/truncate";
import {ThemedView} from "@/components/ThemedView";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {FC} from "react";

const CategoryButton: FC<CategoryButtonProps> = ({ iconName, title, subtitle, description, categoryClicked }) => {
    const colorScheme = useColorScheme();
    //

    return(
        <TouchableOpacity onPress={() => categoryClicked(title)} style={[styles.categoryButton, {borderColor: Colors[colorScheme ?? "light"].tabIconDefault}]}>
            <ThemedView style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View>
                    <ThemedText fontWeight={"semiBold"}   style={styles.categoryTitle}>{title}</ThemedText>
                    <ThemedText fontSize={"small"} style={styles.categorySubtitle}>{subtitle}</ThemedText>
                </View>
                <Ionicons name={iconName} size={responsiveSize(24)} color={Colors[colorScheme ?? 'light'].icon} />
            </ThemedView>
            <ThemedText fontSize={"small"} style={styles.categorySubtitle}>{truncateText(description, 30)}</ThemedText>
        </TouchableOpacity>
    );
}

export default CategoryButton;

const styles = StyleSheet.create({
    categoryButton: {
        width: '48%',
        padding: responsiveSize(16),
        borderRadius: responsiveSize(8),
        marginTop: responsiveSize(16),
        borderWidth: 1,
        height: Dimensions.get("window").height / 7,
    },
    categoryTitle: {
        marginTop: responsiveSize(8),
    },
    categorySubtitle: {
        marginBottom: responsiveSize(4)
    },
})
