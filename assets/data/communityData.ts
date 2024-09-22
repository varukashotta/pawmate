// data/communityData.js

export const categories = [
    {
        id: 'all',
        name: 'All',
        icon: 'grid-outline',
    },
    {
        id: '1',
        name: 'Groups',
        icon: 'people-outline',
    },
    {
        id: '2',
        name: 'Polls',
        icon: 'bar-chart-outline',
    },
    {
        id: '3',
        name: 'Pet-Friendly Places',
        icon: 'map-outline',
    },
    {
        id: '4',
        name: 'Events',
        icon: 'calendar-outline',
    },
    {
        id: '5',
        name: 'Adoptions',
        icon: 'paw-outline',
    },
    // Add more categories as needed
];

export const communityPosts = [
    {
        id: '1',
        category: 'Groups',
        title: 'Best Cat Breeds for Apartment Living',
        author: 'Alice',
        upvotes: 120,
        comments: 45,
        content:
            'Looking to adopt a cat that does well in small spaces. Any recommendations?',
        date: 'September 21, 2024',
    },
    {
        id: '2',
        category: 'Polls',
        title: 'Favorite Dog Breed for Families?',
        author: 'Bob',
        upvotes: 80,
        comments: 30,
        content:
            'Which dog breed do you think is the best for families with kids?',
        date: 'September 20, 2024',
    },
    {
        id: '3',
        category: 'Pet-Friendly Places',
        title: 'Top 10 Dog Parks in NYC',
        author: 'Charlie',
        upvotes: 200,
        comments: 60,
        content:
            'Here is a list of the best dog parks in New York City. Which one is your favorite?',
        date: 'September 19, 2024',
    },
    {
        id: '4',
        category: 'Events',
        title: 'Annual Pet Parade - Join Us!',
        author: 'Daisy',
        upvotes: 150,
        comments: 70,
        content:
            'Don\'t miss our Annual Pet Parade this Saturday at Central Park!',
        date: 'September 18, 2024',
    },
    {
        id: '5',
        category: 'Adoptions',
        title: 'Adopt a Senior Dog Today',
        author: 'Eve',
        upvotes: 90,
        comments: 25,
        content:
            'Senior dogs make wonderful companions. Check out the available pups for adoption.',
        date: 'September 17, 2024',
    },
    // Add more posts as needed
];
