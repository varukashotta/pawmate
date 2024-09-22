// data/marketplaceData.js

export const productCategories = [
    {
        id: '1',
        name: 'Food',
        icon: 'fast-food-outline', // Ionicons name
    },
    {
        id: '2',
        name: 'Toys',
        icon: 'game-controller-outline',
    },
    {
        id: '3',
        name: 'Accessories',
        icon: 'shirt-outline',
    },
    {
        id: '4',
        name: 'Health',
        icon: 'medkit-outline',
    },
    {
        id: '5',
        name: 'Grooming',
        icon: 'cut-outline',
    },
    // Add more categories as needed
];

export const products = [
    {
        id: '101',
        category: 'Food',
        name: 'Organic Cat Food',
        price: '$19.99',
        rating: 4.5,
        image:
            'https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwZm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400',
        description:
            'Premium organic cat food made with real chicken and vegetables to keep your feline friend healthy and happy.',
    },
    {
        id: '102',
        category: 'Toys',
        name: 'Interactive Dog Toy',
        price: '$14.99',
        rating: 4.7,
        image:
            'https://images.unsplash.com/photo-1558788353-f76d92427f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwdG95fGVufDB8MHx8fA%3D%3D&ixlib=rb-1.2.1&q=80&w=400',
        description:
            'Keep your dog entertained for hours with this interactive squeaky toy that promotes active play.',
    },
    {
        id: '103',
        category: 'Accessories',
        name: 'Stylish Dog Collar',
        price: '$24.99',
        rating: 4.3,
        image:
            'https://images.unsplash.com/photo-1601758123927-7f3f6c8b3e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8MHx8fA%3D%3D&ixlib=rb-1.2.1&q=80&w=400',
        description:
            'Elegant and comfortable collar made from durable materials, available in multiple colors.',
    },
    {
        id: '104',
        category: 'Health',
        name: 'Pet Vitamin Supplements',
        price: '$29.99',
        rating: 4.8,
        image:
            'https://images.unsplash.com/photo-1558611848-73f7eb4001ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwaGVhbHRofGVufDB8MHx8fA%3D%3D&ixlib=rb-1.2.1&q=80&w=400',
        description:
            'Ensure your pet gets all the essential vitamins and minerals with our daily supplements.',
    },
    {
        id: '105',
        category: 'Grooming',
        name: 'Pet Grooming Kit',
        price: '$34.99',
        rating: 4.6,
        image:
            'https://images.unsplash.com/photo-1601758123927-7f3f6c8b3e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwZ3Jvb21pbmclMjBraXQlMjBlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400',
        description:
            'Complete grooming kit with brushes, clippers, and nail trimmers to keep your pet looking sharp.',
    },
    // Add more products as needed
];
