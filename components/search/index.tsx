import React, { useState, useMemo } from 'react';
import {
    TextInput,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';
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

type RootStackParamList = {
    VetSearchResults: {
        location: string;
        selectedDate: Date;
        selectedServiceType: string;
        selectedVetSubcategory: string;
    };
};

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

// Reusable Tag Component
const Tag: React.FC<{ label: string; onPress: () => void }> = ({ label, onPress }) => (
    <TouchableOpacity style={styles.tag} onPress={onPress}>
        <ThemedText style={styles.tagText}>{label}</ThemedText>
        <Ionicons name="create-outline" size={responsiveSize(18)} color="#888" />
    </TouchableOpacity>
);

const VetSearchFilter: React.FC = () => {
    const [location, setLocation] = useState<string>('18 Moule Street, Brighton, Victoria, 3183');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedServiceType, setSelectedServiceType] = useState<string>('');
    const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [editServiceType, setEditServiceType] = useState<boolean>(false);
    const [editLocation, setEditLocation] = useState<boolean>(false); // New state for editing location

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const serviceTypes = useMemo(() => [
        { label: 'Telehealth', icon: 'videocam-outline' },
        { label: 'Mobile', icon: 'car-outline' },
        { label: 'Clinic', icon: 'home-outline' },
    ], []);

    const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
    const borderColor = useThemeColor({ light: Colors.light.tabIconDefault, dark: Colors.dark.tabIconDefault }, 'tabIconDefault');
    const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
    const iconColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');
    const tintColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');

    // Function to handle service type selection and reset dependent categories
    const handleServiceTypeSelect = (type: string) => {
        setSelectedServiceType(type);
        setSelectedMainCategory(null); // Reset main category
        setSelectedCategory(null); // Reset category
        setSelectedSubcategory(null); // Reset subcategory
        setEditServiceType(false);
    };

    // Function to handle main category selection and reset dependent categories
    const handleMainCategorySelect = (mainCategory: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedMainCategory(mainCategory === selectedMainCategory ? null : mainCategory);
        setSelectedCategory(null); // Reset category
        setSelectedSubcategory(null); // Reset subcategory
    };

    // Function to handle category selection and reset dependent subcategories
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        setSelectedSubcategory(null); // Reset subcategory
    };

    // Function to handle subcategory selection
    const handleSubcategorySelect = (subcategory: string) => {
        setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
    };

    // Function to handle location editing
    const handleLocationEdit = () => setEditLocation(true);

    const handleDateChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
        if (date) setSelectedDate(date);
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

    const renderButton = (label: string, isSelected: boolean, onPress: () => void) => (
        <TouchableOpacity
            style={[
                styles.button,
                isSelected && styles.selectedButton,
                { borderColor, backgroundColor: isSelected ? tintColor : '#fff' },
            ]}
            onPress={onPress}
        >
            <ThemedText style={[styles.buttonText, isSelected && { color: '#fff' }]}>
                {label}
            </ThemedText>
        </TouchableOpacity>
    );

    return (
        <ThemedView style={styles.container}>
            {/* Location Input/Tag */}
            <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                Enter Location
            </ThemedText>
            {editLocation || !location ? (
                <TextInput
                    style={[styles.input, { borderColor, color: textColor }]}
                    placeholder="Search Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#888"
                    onBlur={() => location && setEditLocation(false)} // Switch to tag when input is blurred
                />
            ) : (
                <Tag label={location} onPress={handleLocationEdit} />
            )}

            {/* Date Picker */}
            <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                Select Date
            </ThemedText>
            <DateTimePicker
                style={styles.datePicker}
                value={selectedDate}
                mode="datetime"
                onChange={handleDateChange}
                minimumDate={new Date()}
            />

            {/* Service Type Selection */}
            <ThemedText style={[styles.label, { color: textColor }]} type="subtitle">
                Type of Service
            </ThemedText>
            {!editServiceType && selectedServiceType ? (
                <Tag label={selectedServiceType} onPress={() => setEditServiceType(true)} />
            ) : (
                <ThemedView style={styles.rowContainer}>
                    {serviceTypes.map((service) =>
                        renderButton(
                            service.label,
                            selectedServiceType === service.label,
                            () => handleServiceTypeSelect(service.label)
                        )
                    )}
                </ThemedView>
            )}

            {/* Main Category Selection */}
            {selectedServiceType && (
                <>
                    <ThemedText style={[styles.label, { color: textColor }]}>
                        Select Main Category
                    </ThemedText>
                    {selectedMainCategory ? (
                        <Tag label={selectedMainCategory} onPress={() => handleMainCategorySelect(selectedMainCategory)} />
                    ) : (
                        <ThemedView style={styles.rowContainer}>
                            {mainCategories.map((mainCat) =>
                                renderButton(
                                    mainCat.mainCategory,
                                    selectedMainCategory === mainCat.mainCategory,
                                    () => handleMainCategorySelect(mainCat.mainCategory)
                                )
                            )}
                        </ThemedView>
                    )}
                </>
            )}

            {/* Category Selection */}
            {selectedMainCategory && (
                <>
                    <ThemedText style={[styles.label, { color: textColor }]}>
                        Select Category
                    </ThemedText>
                    {selectedCategory ? (
                        <Tag label={selectedCategory} onPress={() => handleCategorySelect(selectedCategory)} />
                    ) : (
                        <ThemedView style={styles.rowContainer}>
                            {mainCategories
                                .find((cat) => cat.mainCategory === selectedMainCategory)
                                ?.categories.map((category) =>
                                    renderButton(
                                        category.category,
                                        selectedCategory === category.category,
                                        () => handleCategorySelect(category.category)
                                    )
                                )}
                        </ThemedView>
                    )}
                </>
            )}

            {/* Subcategory Selection */}
            {selectedCategory && (
                <>
                    <ThemedText style={[styles.label, { color: textColor }]}>
                        Select Subcategory
                    </ThemedText>
                    {selectedSubcategory ? (
                        <Tag label={selectedSubcategory} onPress={() => handleSubcategorySelect(selectedSubcategory)} />
                    ) : (
                        <ThemedView style={styles.rowContainer}>
                            {mainCategories
                                .find((cat) => cat.mainCategory === selectedMainCategory)
                                ?.categories.find((cat) => cat.category === selectedCategory)
                                ?.subcategories.map((subcategory) =>
                                    renderButton(
                                        subcategory,
                                        selectedSubcategory === subcategory,
                                        () => handleSubcategorySelect(subcategory)
                                    )
                                )}
                        </ThemedView>
                    )}
                </>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={[styles.submitButton, { backgroundColor: tintColor }]} onPress={handleSubmit}>
                <ThemedText style={styles.submitButtonText}>
                    Search
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: responsiveSize(16), flex: 1 },
    label: { marginBottom: responsiveSize(8) },
    input: {
        borderWidth: 1,
        borderRadius: responsiveSize(8),
        padding: responsiveSize(12),
        marginBottom: responsiveSize(16),
        fontSize: responsiveSize(16),
        backgroundColor: '#fff',
    },
    datePicker: {
        alignSelf: "flex-start",
        marginLeft: responsiveSize(-10),
        marginBottom: responsiveSize(20),
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: responsiveSize(16),
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: responsiveSize(12),
        borderWidth: 1,
        borderRadius: responsiveSize(8),
        flexBasis: '30%',
        marginHorizontal: responsiveSize(6),
        marginBottom: responsiveSize(12),
    },
    selectedButton: { backgroundColor: '#007AFF' },
    buttonText: { textAlign: 'center', marginTop: responsiveSize(4) },
    submitButton: {
        paddingVertical: responsiveSize(12),
        borderRadius: responsiveSize(8),
        alignItems: 'center',
        marginTop: responsiveSize(16),
    },
    submitButtonText: { color: '#fff', fontWeight: '600', fontSize: responsiveSize(18) },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        paddingVertical: responsiveSize(6), // Reduced padding for smaller tags
        paddingHorizontal: responsiveSize(10),
        borderRadius: responsiveSize(6), // Reduced radius
        marginBottom: responsiveSize(16),
    },
    tagText: {
        marginRight: responsiveSize(8),
        fontSize: responsiveSize(14),
        color: '#333',
    },
});

export default VetSearchFilter;
