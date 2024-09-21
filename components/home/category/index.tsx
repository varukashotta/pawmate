import {Ionicons} from "@expo/vector-icons";
import {CategoryButtonProps} from "@/components/home/category/type";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {responsiveSize} from "@/components/utils/resposive";

const CategoryButton: React.FC<CategoryButtonProps> = ({ iconName, title, subtitle }) => (
    <TouchableOpacity style={styles.categoryButton}>
        <Ionicons name={iconName} size={responsiveSize(24)} color="#000" />
        <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>{title}</ThemedText>
        <ThemedText type="default" style={styles.categorySubtitle}>{subtitle}</ThemedText>
    </TouchableOpacity>
);

export default CategoryButton;

const styles = StyleSheet.create({
    categoryButton: {
        width: '48%',
        backgroundColor: '#fff',
        padding: responsiveSize(16),
        borderRadius: responsiveSize(8),
        marginTop: responsiveSize(16),
        borderWidth: 1,
        borderColor: "#e1e1e1",
        height: Dimensions.get("window").height / 8,
    },
    categoryTitle: {
        marginTop: responsiveSize(8),
    },
    categorySubtitle: {
        color: '#666',
    },
})
