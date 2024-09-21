import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Platform,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { responsiveSize } from "@/components/utils/resposive";
import mainCategories from "@/assets/data/index.json";

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define the type for navigation (adjust according to your navigation setup)
type RootStackParamList = {
    VetSearchResults: {
        location: string;
        selectedDate: Date;
        selectedServiceType: string;
        selectedVetSubcategory: string;
    };
};

// Define interfaces for Vet Services
interface VetServiceCategory {
    category: string;
    description: string;
    subcategories: string[];
}

interface MainCategory {
    mainCategory: string;
    description: string;
    categories: VetServiceCategory[];
}


const VetSearchFilter: React.FC = () => {
    const [location, setLocation] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedServiceType, setSelectedServiceType] = useState<string>('');
    const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [editServiceType, setEditServiceType] = useState<boolean>(false); // New state for editing service type

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // Service types (Telehealth, Mobile, Clinic)
    const serviceTypes = [
        { label: 'Telehealth', icon: 'videocam-outline' },
        { label: 'Mobile', icon: 'car-outline' },
        { label: 'Clinic', icon: 'home-outline' },
    ];

    // Theme colors
    const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
    const borderColor = useThemeColor({ light: Colors.light.tabIconDefault, dark: Colors.dark.tabIconDefault }, 'tabIconDefault');
    const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
    const iconColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');
    const tintColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');

    const handleServiceTypeSelect = (type: string) => {
        setSelectedServiceType(type);
        setEditServiceType(false); // Disable editing mode once a service type is selected
    };

    const handleEditServiceType = () => {
        setEditServiceType(true); // Enable editing mode to reselect service type
    };

    const handleMainCategorySelect = (mainCategory: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedMainCategory(mainCategory === selectedMainCategory ? null : mainCategory);
        setSelectedCategory(null); // Reset subcategory when main category changes
        setSelectedSubcategory(null); // Reset final selection
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        setSelectedSubcategory(null); // Reset final selection
    };

    const handleSubcategorySelect = (subcategory: string) => {
        setSelectedSubcategory(subcategory);
    };

    const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleSubmit = () => {
        if (!location.trim()) {
            alert('Please enter a location.');
            return;
        }

        if (!selectedServiceType || !selectedSubcategory) {
            alert('Please select a service and subcategory.');
            return;
        }

        navigation.navigate('VetSearchResults', {
            location,
            selectedDate,
            selectedServiceType,
            selectedVetSubcategory: selectedSubcategory,
        });
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Location Input */}
                <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                    Enter Location
                </ThemedText>
                <TextInput
                    style={[styles.input, { borderColor, color: textColor }]}
                    placeholder="Search Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#888"
                />

                {/* Date Selection */}
                <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                    Select Date
                </ThemedText>
                <DateTimePicker style={{alignSelf: "flex-start", marginLeft: responsiveSize(-10), marginBottom: responsiveSize(20)}} value={selectedDate} mode="datetime" onChange={handleDateChange} minimumDate={new Date()} />

                {/* Service Type Selection */}
                <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                    Type of Service
                </ThemedText>

                {!editServiceType && selectedServiceType ? (
                    <ThemedView style={styles.selectedServiceTypeContainer}>
                        <ThemedText style={[styles.selectedServiceTypeText, { color: textColor }]} type="default">
                            {selectedServiceType}
                        </ThemedText>
                        <TouchableOpacity onPress={handleEditServiceType}>
                            <Ionicons name="create-outline" size={responsiveSize(24)} color={iconColor} />
                        </TouchableOpacity>
                    </ThemedView>
                ) : (
                    <ThemedView style={styles.rowContainer}>
                        {serviceTypes.map((service) => (
                            <TouchableOpacity
                                key={service.label}
                                style={[
                                    styles.button,
                                    selectedServiceType === service.label && styles.selectedButton,
                                    { borderColor, backgroundColor: selectedServiceType === service.label ? tintColor : '#fff' },
                                ]}
                                onPress={() => handleServiceTypeSelect(service.label)}
                            >
                                <Ionicons name={service.icon as any} size={responsiveSize(24)} color={selectedServiceType === service.label ? '#fff' : iconColor} />
                                <ThemedText style={[styles.buttonText, selectedServiceType === service.label && { color: '#fff' }]} type="default">
                                    {service.label}
                                </ThemedText>
                            </TouchableOpacity>
                        ))}
                    </ThemedView>
                )}

                {/* Main Category Selection */}
                {selectedServiceType && (
                    <>
                        <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                            Select Main Category
                        </ThemedText>
                        <ThemedView style={styles.rowContainer}>
                            {mainCategories.map((mainCat) => (
                                <TouchableOpacity
                                    key={mainCat.mainCategory}
                                    style={[
                                        styles.button,
                                        selectedMainCategory === mainCat.mainCategory && styles.selectedButton,
                                        { borderColor, backgroundColor: selectedMainCategory === mainCat.mainCategory ? tintColor : '#fff' },
                                    ]}
                                    onPress={() => handleMainCategorySelect(mainCat.mainCategory)}
                                >
                                    <ThemedText style={[styles.buttonText, selectedMainCategory === mainCat.mainCategory && { color: '#fff' }]}>
                                        {mainCat.mainCategory}
                                    </ThemedText>
                                </TouchableOpacity>
                            ))}
                        </ThemedView>

                        {/* Category Selection */}
                        {selectedMainCategory && (
                            <>
                                <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                                    Select Category
                                </ThemedText>
                                <ThemedView style={styles.rowContainer}>
                                    {mainCategories
                                        .find((cat) => cat.mainCategory === selectedMainCategory)
                                        ?.categories.map((category) => (
                                            <TouchableOpacity
                                                key={category.category}
                                                style={[
                                                    styles.button,
                                                    selectedCategory === category.category && styles.selectedButton,
                                                    { borderColor, backgroundColor: selectedCategory === category.category ? tintColor : '#fff' },
                                                ]}
                                                onPress={() => handleCategorySelect(category.category)}
                                            >
                                                <ThemedText style={[styles.buttonText, selectedCategory === category.category && { color: '#fff' }]}>
                                                    {category.category}
                                                </ThemedText>
                                            </TouchableOpacity>
                                        ))}
                                </ThemedView>

                                {/* Subcategory Selection */}
                                {selectedCategory && (
                                    <>
                                        <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                                            Select Subcategory
                                        </ThemedText>
                                        <ThemedView style={styles.rowContainer}>
                                            {mainCategories
                                                .find((cat) => cat.mainCategory === selectedMainCategory)
                                                ?.categories.find((cat) => cat.category === selectedCategory)
                                                ?.subcategories.map((subcategory) => (
                                                    <TouchableOpacity
                                                        key={subcategory}
                                                        style={[
                                                            styles.smallButton, // Smaller buttons for subcategories
                                                            selectedSubcategory === subcategory && styles.selectedButton,
                                                            { borderColor, backgroundColor: selectedSubcategory === subcategory ? tintColor : '#fff' },
                                                        ]}
                                                        onPress={() => handleSubcategorySelect(subcategory)}
                                                    >
                                                        <ThemedText
                                                            style={[styles.smallButtonText, selectedSubcategory === subcategory && { color: '#fff' }]}
                                                            type="default" // Use tiny type for subcategory text
                                                        >
                                                            {subcategory}
                                                        </ThemedText>
                                                    </TouchableOpacity>
                                                ))}
                                        </ThemedView>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

                {/* Submit Button */}
                <TouchableOpacity style={[styles.submitButton, { backgroundColor: tintColor }]} onPress={handleSubmit}>
                    <ThemedText style={styles.submitButtonText} type="defaultSemiBold">
                        Search
                    </ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // Add the remaining styles

    // New styles for the selected service type
    selectedServiceTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: responsiveSize(16),
        padding: responsiveSize(12),
        borderWidth: 1,
        borderRadius: responsiveSize(8),
        borderColor: '#ccc', // Placeholder for borderColor
    },
    selectedServiceTypeText: {
        fontSize: responsiveSize(16),
    },
    safeArea: { flex: 1 },
    container: { paddingHorizontal: responsiveSize(16) },
    label: { marginBottom: responsiveSize(8) },
    input: {
        borderWidth: 1,
        borderRadius: responsiveSize(8),
        padding: responsiveSize(12),
        marginBottom: responsiveSize(16),
        fontSize: responsiveSize(16),
        backgroundColor: '#fff',
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: responsiveSize(16),
        justifyContent: "space-between"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: responsiveSize(16),
        borderWidth: 1,
        borderRadius: responsiveSize(8),
        flexBasis: '32%', // Each button takes up 30% of the row
        marginBottom: responsiveSize(12),
        marginRight: responsiveSize(4), // Add margin to the right for spacing
    },
    smallButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: responsiveSize(8), // Smaller padding for subcategory buttons
        borderWidth: 1,
        borderRadius: responsiveSize(6), // Smaller border radius for subcategory buttons
        flexBasis: '30%', // Each button takes up 30% of the row
        marginBottom: responsiveSize(8),
        marginRight: responsiveSize(8), // Add margin to the right for spacing
    },
    selectedButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        textAlign: 'center',
        marginTop: responsiveSize(4),
    },
    smallButtonText: {
        textAlign: 'center',
    },
    submitButton: {
        paddingVertical: responsiveSize(12),
        borderRadius: responsiveSize(8),
        alignItems: 'center',
        marginTop: responsiveSize(16),
    },
    submitButtonText: { color: '#fff', fontWeight: '600', fontSize: responsiveSize(18) },
    // Rest of your styles
});

export default VetSearchFilter;
