// CategoryButton component
import {Ionicons} from "@expo/vector-icons";

export interface CategoryButtonProps {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    description: string;
    categoryClicked: (t: string) => void;
}




