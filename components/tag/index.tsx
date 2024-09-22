import {StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Ionicons} from "@expo/vector-icons";
import {responsiveSize} from "@/components/utils/resposive";
import {FC} from "react";

// Reusable Tag Component
const Tag: FC<{ label: string; onPress: () => void }> = ({ label, onPress }) => (
    <TouchableOpacity style={styles.tag} onPress={onPress}>
        <ThemedText style={styles.tagText}>{label}</ThemedText>
        <Ionicons name="create-outline" size={responsiveSize(18)} color="#888" />
    </TouchableOpacity>
);

export default Tag

const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: responsiveSize(6), // Reduced padding for smaller tags
        paddingHorizontal: responsiveSize(10),
        borderRadius: responsiveSize(6), // Reduced radius
        marginBottom: responsiveSize(16),
    },
    tagText: {
        marginRight: responsiveSize(8),
        fontSize: responsiveSize(14),
    },
})
