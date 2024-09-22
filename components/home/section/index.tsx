// Reusable Section Component
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet} from "react-native";
import {responsiveSize} from "@/components/utils/resposive";
import {FC, ReactNode} from "react";

const Section: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
    <>
        <ThemedText fontWeight={"bold"} fontSize="default" style={styles.sectionTitle}>{title}</ThemedText>
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
