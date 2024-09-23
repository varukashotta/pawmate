// App.tsx

import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageErrorEventData,
    NativeSyntheticEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import {returnStatement} from "@babel/types";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

const { width } = Dimensions.get('window');

// Types for User, Pet, and Post
interface Pet {
    id: string;
    name: string;
    type: string;
    age: string;
    photo: string;
    isFollowing: boolean;
}

interface Post {
    id: string;
    content: string;
    image: string | null;
    date: string;
}

interface User {
    name: string;
    bio: string;
    profilePicture: string;
    coverPhoto: string;
    pets: Pet[];
    posts: Post[];
}

// Dummy Data
const initialUser: User = {
    name: 'Jane Doe',
    bio: 'Passionate pet lover and proud owner of two adorable cats.',
    profilePicture:
        'https://images.unsplash.com/photo-1508672019048-805c876b67e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cGxheSUyMGNvZmZlZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=1080',
    coverPhoto:
        'https://images.unsplash.com/photo-1508672019048-805c876b67e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cGxheSUyMGNvZmZlZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=1080',
    pets: [
        {
            id: '1',
            name: 'Whiskers',
            type: 'Cat',
            age: '2 years',
            photo:
                'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8Y2F0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400',
            isFollowing: false,
        },
        {
            id: '2',
            name: 'Buddy',
            type: 'Dog',
            age: '3 years',
            photo:
                'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8MHx8fA%3D%3D&ixlib=rb-1.2.1&q=80&w=400',
            isFollowing: false,
        },
    ],
    posts: [
        {
            id: '1',
            content: 'Enjoying a sunny day at the park with Buddy!',
            image:
                'https://images.unsplash.com/photo-1507146426996-ef05306b995a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cGFyayUyMGRvZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=800',
            date: 'September 20, 2024',
        },
        {
            id: '2',
            content: 'Whiskers just learned a new trick! 🐱✨',
            image: null,
            date: 'September 18, 2024',
        },
    ],
};

// Placeholder Image in case of error
const placeholderImage =
    'https://via.placeholder.com/150';

interface HeaderProps {
    profilePicture: string;
}

const Header: React.FC<HeaderProps> = ({ profilePicture }) => (
    <View style={styles.headerContainer}>
        <Image source={{ uri: initialUser.coverPhoto }} style={styles.coverPhoto} />
        <View style={styles.profilePictureContainer}>
            <Image
                source={{ uri: profilePicture }}
                style={styles.profilePicture}
                onError={(e: NativeSyntheticEvent<ImageErrorEventData>) => {
                    console.log('Profile picture failed to load:', e.nativeEvent.error);
                }}
                defaultSource={{ uri: placeholderImage }}
            />
        </View>
        <ThemedText fontSize={"header"} fontWeight={"bold"} style={styles.userName}>{initialUser.name}</ThemedText>
        <ThemedText style={styles.userBio}>{initialUser.bio}</ThemedText>
        <View style={styles.statsContainer}>
            <View style={styles.stat}>
                <ThemedText style={styles.statNumber}>{initialUser.pets.length}</ThemedText>
                <ThemedText style={styles.statLabel}>Pets</ThemedText>
            </View>
            <View style={styles.stat}>
                <ThemedText style={styles.statNumber}>{initialUser.posts.length}</ThemedText>
                <ThemedText style={styles.statLabel}>Posts</ThemedText>
            </View>
        </View>
    </View>
);

const AboutSection: React.FC = () => {
    const colorScheme = useColorScheme();

    return(
    <ThemedView style={[styles.sectionContainer, {backgroundColor: Colors[colorScheme ?? "light"].cardBg}]}>
        <ThemedText fontSize={"header"} style={styles.sectionTitle}>About</ThemedText>
        <ThemedText style={styles.sectionContent}>{initialUser.bio}</ThemedText>
    </ThemedView>
)};

interface PetsSectionProps {
    pets: Pet[];
    toggleFollow: (petId: string) => void;
}

const PetsSection: React.FC<PetsSectionProps> = ({ pets, toggleFollow }) => (
    <ThemedView style={[styles.sectionContainer]}>
        <ThemedText fontSize={"header"} style={styles.sectionTitle}>My Pets</ThemedText>
        <FlatList
            data={pets}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.petCard}>
                    <Image
                        source={{ uri: item.photo }}
                        style={styles.petPhoto}
                        onError={(e: NativeSyntheticEvent<ImageErrorEventData>) => {
                            console.log(`Pet photo for ${item.name} failed to load:`, e.nativeEvent.error);
                        }}
                        defaultSource={{ uri: placeholderImage }}
                    />
                    <ThemedText style={styles.petName}>{item.name}</ThemedText>
                    <ThemedText style={styles.petDetails}>
                        {item.type}, {item.age}
                    </ThemedText>
                    <TouchableOpacity
                        style={[
                            styles.followButton,
                            item.isFollowing ? styles.following : styles.follow,
                        ]}
                        onPress={() => toggleFollow(item.id)}
                    >
                        <ThemedText
                            style={[
                                styles.followButtonText,
                                item.isFollowing ? styles.followingText : styles.followText,
                            ]}
                        >
                            {item.isFollowing ? 'Following' : 'Follow'}
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            )}
        />
    </ThemedView>
);

interface PostCardProps {
    item: Post;
}

const PostCard: React.FC<PostCardProps> = ({ item }) => (
    <View style={styles.postCard}>
        <View style={styles.postHeader}>
            <Image
                source={{ uri: initialUser.profilePicture }}
                style={styles.postProfilePic}
                onError={(e: NativeSyntheticEvent<ImageErrorEventData>) => {
                    console.log('Post profile picture failed to load:', e.nativeEvent.error);
                }}
                defaultSource={{ uri: placeholderImage }}
            />
            <View>
                <ThemedText style={styles.postUserName}>{initialUser.name}</ThemedText>
                <ThemedText style={styles.postDate}>{item.date}</ThemedText>
            </View>
        </View>
        <ThemedText style={styles.postContent}>{item.content}</ThemedText>
        {item.image && (
            <Image source={{ uri: item.image }} style={styles.postImage} />
        )}
        <View style={styles.postFooter}>
            <Ionicons name="heart-outline" size={24} color="gray" />
            <Ionicons
                name="chatbubble-outline"
                size={24}
                color="gray"
                style={{ marginLeft: 15 }}
            />
            <Ionicons
                name="share-social-outline"
                size={24}
                color="gray"
                style={{ marginLeft: 15 }}
            />
        </View>
    </View>
);

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User>(initialUser);

    // Function to toggle follow status for a pet
    const toggleFollow = (petId: string) => {
        const updatedPets = user.pets.map((pet) =>
            pet.id === petId ? { ...pet, isFollowing: !pet.isFollowing } : pet
        );
        setUser({ ...user, pets: updatedPets });
    };

    const ListHeader: React.FC = () => (
        <>
            <Header profilePicture={user.profilePicture} />
            <AboutSection />
            <PetsSection pets={user.pets} toggleFollow={toggleFollow} />
        </>
    );

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={user.posts}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item }) => <PostCard item={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </ThemedView>
    );
};

// Main App
export default ProfilePage;
// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
    },
    coverPhoto: {
        width: width,
        height: 200,
    },
    profilePictureContainer: {
        position: 'absolute',
        top: 110,
        borderWidth: 4,
        borderColor: '#fff',
        borderRadius: 80,
        overflow: 'hidden',
        zIndex: 9
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    userName: {
        marginTop: 80,
    },
    userBio: {
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    stat: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    statNumber: {
    },
    statLabel: {
    },
    sectionContainer: {
        padding: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: 'gray',
    },
    petCard: {
        marginRight: 15,
        alignItems: 'center',
        width: 120,
    },
    petPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
    },
    petName: {
        marginTop: 5,
    },
    petDetails: {
        textAlign: 'center',
    },
    followButton: {
        marginTop: 8,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
    follow: {
        backgroundColor: '#fff',
        borderColor: '#1da1f2',
    },
    following: {
        backgroundColor: '#1da1f2',
        borderColor: '#1da1f2',
    },
    followButtonText: {
    },
    followText: {
        color: '#1da1f2',
    },
    followingText: {
        color: '#fff',
    },
    postCard: {
        padding: 15,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 10,
        // iOS shadow

        // Android shadow
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    postProfilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    postUserName: {
        fontWeight: 'bold',
    },
    postDate: {
    },
    postContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#e0e0e0',
    },
    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
