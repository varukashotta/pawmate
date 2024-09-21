// Reusable Section Component
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet} from "react-native";
import {responsiveSize} from "@/components/utils/resposive";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <>
        <ThemedText type="subtitle" style={styles.sectionTitle}>{title}</ThemedText>
        {children}
    </>
);

export default Section


const styles = StyleSheet.create({
    sectionTitle: {
        paddingHorizontal: responsiveSize(16),
        paddingVertical: responsiveSize(8),
        fontWeight: 'bold',
    },
})
