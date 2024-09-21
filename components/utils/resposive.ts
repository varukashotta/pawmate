import {Dimensions} from "react-native";

export const responsiveSize = (size: number) => {
    const { width, height } = Dimensions.get('window');
    const baseWidth = 375; // Base width for scaling
    const scale = Math.min(width, height) / baseWidth;
    return Math.round(size * scale);
};
