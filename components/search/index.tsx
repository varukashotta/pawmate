import React, {useMemo, useState} from 'react';
import {LayoutAnimation, Platform, StyleSheet, TextInput, TouchableOpacity, UIManager,} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useThemeColor} from '@/hooks/useThemeColor';
import {Colors} from '@/constants/Colors';
import {responsiveSize} from "@/components/utils/resposive";
import mainCategories from "@/assets/data/index.json";
import Tag from "@/components/tag";
import SelectButtons from "@/components/selectButtons";
import {useColorScheme} from "@/hooks/useColorScheme";
import Button from "@/components/button";

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
const VetSearchFilter: React.FC = () => {
    const colorScheme = useColorScheme();

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
        {label: 'Telehealth', icon: 'videocam-outline'},
        {label: 'Mobile', icon: 'car-outline'},
        {label: 'Clinic', icon: 'home-outline'},
    ], []);

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

    const handleDateChange = (event: any, date?: Date | undefined) => {
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


    return (
        <ThemedView style={styles.container}>
            {/* Location Input/Tag */}
            <ThemedText style={[styles.label]} fontSize={"large"} fontWeight={"bold"}>
                Enter Location
            </ThemedText>
            {editLocation || !location ? (
                <TextInput
                    style={[styles.input, {borderColor: Colors[colorScheme ?? 'light'].tabIconDefault}]}
                    placeholder="Search Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#888"
                    onBlur={() => location && setEditLocation(false)} // Switch to tag when input is blurred
                />
            ) : (
                <Tag label={location} onPress={handleLocationEdit}/>
            )}

            {/* Date Picker */}
            <ThemedText style={[styles.label]} fontSize={"large"} fontWeight={"bold"}>
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
            <ThemedText style={[styles.label]} fontSize={"large"} fontWeight={"bold"}>
                Type of Service
            </ThemedText>
            {!editServiceType && selectedServiceType ? (
                <Tag label={selectedServiceType} onPress={() => setEditServiceType(true)}/>
            ) : (
                <ThemedView style={styles.rowContainer}>
                    {serviceTypes.map((service, i) =>
                        <SelectButtons
                            key={i}
                            label={service.label}
                            isSelected={selectedServiceType === service.label}
                            onPress={() => handleServiceTypeSelect(service.label)}
                        />
                    )}
                </ThemedView>
            )}

            {/* Main Category Selection */}
            {selectedServiceType && (
                <>
                    <ThemedText style={[styles.label]}>
                        Select Main Category
                    </ThemedText>
                    {selectedMainCategory ? (
                        <Tag label={selectedMainCategory}
                             onPress={() => handleMainCategorySelect(selectedMainCategory)}/>
                    ) : (
                        <ThemedView style={styles.rowContainer}>
                            {mainCategories.map((mainCat) =>
                                <SelectButtons
                                    label={mainCat.mainCategory}
                                    isSelected={selectedMainCategory === mainCat.mainCategory}
                                    onPress={() => handleMainCategorySelect(mainCat.mainCategory)}
                                />
                            )}
                        </ThemedView>
                    )}
                </>
            )}

            {/* Category Selection */}
            {selectedMainCategory && (
                <>
                    <ThemedText style={[styles.label]}>
                        Select Category
                    </ThemedText>
                    {selectedCategory ? (
                        <Tag label={selectedCategory} onPress={() => handleCategorySelect(selectedCategory)}/>
                    ) : (
                        <ThemedView style={styles.rowContainer}>
                            {mainCategories
                                .find((cat) => cat.mainCategory === selectedMainCategory)
                                ?.categories.map((category) =>
                                    <SelectButtons
                                        label={category.category}
                                        isSelected={selectedCategory === category.category}
                                        onPress={() => handleCategorySelect(category.category)}
                                    />
                                )}
                        </ThemedView>
                    )}
                </>
            )}

            {/* Subcategory Selection */}
            {selectedCategory && (
                <>
                    <ThemedText style={[styles.label]}>
                        Select Subcategory
                    </ThemedText>
                    {selectedSubcategory ? (
                        <Tag label={selectedSubcategory} onPress={() => handleSubcategorySelect(selectedSubcategory)}/>
                    ) : (
                        <ThemedView style={styles.rowContainer}>
                            {mainCategories
                                .find((cat) => cat.mainCategory === selectedMainCategory)
                                ?.categories.find((cat) => cat.category === selectedCategory)
                                ?.subcategories.map((subcategory, i) =>
                                    <SelectButtons
                                        key={i}
                                        label={subcategory}
                                        isSelected={selectedSubcategory === subcategory}
                                        onPress={() => handleSubcategorySelect(subcategory)}
                                    />
                                )}
                        </ThemedView>
                    )}
                </>
            )}

            {/* Submit Button */}
            <Button title={"Search"} size={"large"} onPress={() => console.log("test")} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {paddingHorizontal: responsiveSize(16), flex: 1},
    label: {marginBottom: responsiveSize(8)},
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
        justifyContent: "space-between"
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
    selectedButton: {backgroundColor: '#007AFF'},
    buttonText: {textAlign: 'center', marginTop: responsiveSize(4)},
    submitButton: {
        paddingVertical: responsiveSize(12),
        borderRadius: responsiveSize(8),
        alignItems: 'center',
        marginTop: responsiveSize(16),
    },
    submitButtonText: {color: '#fff', fontWeight: '600', fontSize: responsiveSize(18)},
});

export default VetSearchFilter;
