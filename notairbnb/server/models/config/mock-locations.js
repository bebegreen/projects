const locations = [{

    userID: 3,

    id: "1111",

    title: "A beautiful villa in North Iceland",

    imageUrl: 'https://a0.muscache.com/im/pictures/6061582/a643208f_original.jpg?aki_policy=xx_large',

    address: {

        country: '',

        city: "Akureyri",

        street: '',

        number: '',

        lat: 65.6885,

        lng: 18.1262
        // 65.6885° N, 18.1262° W

    },

    rating: 4,

    reviews: [
        {
            "id": 1,
            "title": "Nice clean room",
            // "name": "Ross",
            content: `My second time staying at Gunnar's place and I cannot imagine a better place to stay in Akuyeri. This morning I got to watch a cruise ship dock across the fjord from the porch of the house. Great fun and out of this world views.`,
            // "userImageUrl": "https://robohash.org/doloremseddicta.png?size=100x100&set=set1",
            "rating": 5,
            "date": "11/08/16",
            userID: 1
        },
        {
            "id": 2,
            "title": "Decent place to sleep",
            // "name": "Megan",
            content: `The good: Beautiful home in a beautiful location. Quiet and good to relax Improvement areas: - Directions: if driving, the street sign from the highway is hard to see, it's blocked by a tree. The entry road is directly across the from rest stop area on the left hand side of the road - Amenity: washer is provided `,
            // "userImageUrl": "https://robohash.org/utvitaemaxime.png?size=100x100&set=set1",
            "rating": 4,
            "date": "01/01/17",
            userID: 2

        }
    ],

    type: "Entire house",

    generalDesc: '',

    theSpace: {

        description: `A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends. The villa is located in the exclusive residence area of Akureyri, the Northern capital of Iceland, offers easy access not only to the center of Akureyri but also all the interesting sites surrounding this Northern capital. Just to give an example of the numerous opportunities for excursions; the most popular being - the road skirting the beautiful western shore of the Eyjafjordur Fjord, the magnificent waterfalls, Goðafoss and Dettifoss, Dimmuborgir, Mývatn and the Grand Canyon of Jökulsárgljúfur. It is also possible to take an organized day trip from Akureyri to the island of Grimsey, which straddles the Arctic Circle.`,

        guests: 1,

        beds: 3,

        bedrooms: 3,

        baths: 1.5,


    },

    guestAccess: '',

    others: '',

    amenities: ["television", "laptop", "shower", "wifi"],

    price: 230,

    occupancy: [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]

},

{
    userID: 3,
    "id": 1,
    "title": "Comfy Artist's Home",
    "type": "Private room in apartment",
    "generalDesc": "I live in the heart of Camden Town, in a late Georgian terrace of houses within a Conservation area, right in the centre of London. My flat is richly decorated which reflects the work that I do as a Textile Artist. My walls are covered with my choice of vintage finds, antiques and art. My Flat on 1st and 2nd Floor 16 sq mtrs: SITTING ROOM/BEDROOM: You will be staying (with me) in my sitting room on a comfy sofa bed. You will get complete privacy during your stay in my sitting room. This large sunny room has two big windows with wooden shutters and a big fire place. There will be fresh linen, a choice of pillows, towels, big duvets and hot water bottles. There is a hanger rail for your clothes.",
    "guestAccess": "You have free Wi Fi, TV, DVD and information about what is going on in London, with maps and guidebooks. KITCHEN: You can use my kitchen whilst staying with me. There is unlimited tea and coffee, a washing machine, dishwasher, microwave, a fridge, iron and ironing board. I do not have an electric dryer - I hang clothes on a dryer in the hallway. **I don't supply breakfast but McDonald's (1 minute walk) has great food and Mario's is around the corner (with his own mini Art gallery).",
    "others": "",
    "price": 150,
    "currency": "USD",
    "amenities": ["television", "laptop", "shower", "wifi"],
    "imageUrl": "https://a0.muscache.com/im/pictures/19327619/cbb26fd1_original.jpg?aki_policy=xx_large",
    "owner": {
        "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
        "name": "Lola"
    },
    rating: 4,
    "address": {
        "country": "United Kingdom",
        "city": "London",
        "street": "Camden",
        "number": "12",
        "lat": "51.5000",
        "lng": "-0.1200"
    },
    "theSpace": {
        "description": "In a late Georgian terrace of houses within a Conservation area, right in the centre of London",
        "guests": 2,
        "beds": 1,
        "bedrooms": 1
    },
    "reviews": [
        {
            "id": 1,
            "title": "Nice clean room",
            "name": "Lea",
            "content": "consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
            "rating": 3,
            "date": "DECEMBER 4 2017",
            userID: 1

        },
        {
            "id": 2,
            "title": "Decent place to sleep",
            "name": "David",
            "content": "justo in hac habitasse platea dictumst etiam cursus urna ut tellus ut erat id vulputate",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
            "rating": 4,
            "date": "May 19 2017",
            userID: 1

        }
    ],
    "occupancy": [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]
},
{
    userID: 3,
    "id": 2,
    "title": "Nice students apartment",
    "type": "Private room in apartment",
    "generalDesc": "The complex used to be the old bakery of Oia and it was recently restored with respect to the unique local architecture creating a remarkable ekistic complex of a unique sculptural quality. The plasticity of the forms,the use of local techniques, the built in beds and the antique furniture together with modern amenities strike the right balance between sophistication and coziness.",
    "guestAccess": "Me or my husband John we will usually welcome you to the house. I am always available to answer all of your questions via messages or emails and at the house you will find a local mobile that you can use it to call us.",
    "others": "",
    "price": 250,
    "currency": "USD",
    "amenities": ["television", "laptop", "shower", "wifi"],
    "imageUrl": "https://a0.muscache.com/im/pictures/f5bd3f39-8162-46d1-a670-a39a832072e9.jpg?aki_policy=xx_large",
    "owner": {
        "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
        "name": "Mona"
    },
    "address": {
        "country": "United Kingdom",
        "city": "London",
        "street": "Abby Road",
        "number": "23",
        "lat": "51.6000",
        "lng": "-0.1900"
    },
    "theSpace": {
        "description": "This cave house, hanging on the cliffs of the caldera, is part of a traditional synthesis of houses owned by a family of architects",
        "guests": 2,
        "beds": 2,
        "bedrooms": 1
    },
    rating: 4,
    "reviews": [
        {
            "id": 1,
            "title": "Very small but clean room",
            "name": "Lea",
            "content": "Consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
            "rating": 3,
            "date": "DECEMBER 19 2017",
            userID: 1

        },
        {
            "id": 2,
            "title": "Nice couple, good vibes",
            "name": "David",
            "content": "Justo in hac habitasse platea dictumst etiam cursus urna ut tellus ut erat id vulputate",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
            "rating": 4,
            "date": "May 25 2017",
            userID: 2

        }
    ],
    "occupancy": [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]
},
{
    userID: 3,
    "id": 3,
    "title": "Dreamy Tropical Tree House",
    "type": "Private room in apartment",
    "generalDesc": "The complex used to be the old bakery of Oia and it was recently restored with respect to the unique local architecture creating a remarkable ekistic complex of a unique sculptural quality. The plasticity of the forms,the use of local techniques, the built in beds and the antique furniture together with modern amenities strike the right balance between sophistication and coziness.",
    "guestAccess": "Me or my husband John we will usually welcome you to the house. I am always available to answer all of your questions via messages or emails and at the house you will find a local mobile that you can use it to call us.",
    "others": "",
    "price": 210,
    "currency": "USD",
    "amenities": ["television", "laptop", "shower", "wifi"],
    "imageUrl": "https://a0.muscache.com/im/pictures/45655208/1ae646f5_original.jpg?aki_policy=xx_large",
    "owner": {
        "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
        "name": "Mona"
    },
    "address": {
        "country": "United Kingdom",
        "city": "London",
        "street": "Abby Road",
        "number": "23",
        "lat": "51.6000",
        "lng": "-0.1900"
    },
    "theSpace": {
        "description": "This cave house, hanging on the cliffs of the caldera, is part of a traditional synthesis of houses owned by a family of architects",
        "guests": 2,
        "beds": 2,
        "bedrooms": 1
    },
    "reviews": [
        {
            "id": 1,
            "title": "Very small but clean room",
            "name": "Lea",
            "content": "Consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
            "rating": 3,
            "date": "DECEMBER 19 2017",
            userID: 2

        },
        {
            "id": 2,
            "title": "Nice couple, good vibes",
            "name": "David",
            "content": "Justo in hac habitasse platea dictumst etiam cursus urna ut tellus ut erat id vulputate",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
            "rating": 4,
            "date": "May 25 2017",
            userID: 3

        }
    ],
    "occupancy": [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]
},
{
    userID: 3,
    "id": 4,
    "title": "Amazing view in the city",
    "type": "Private room in apartment",
    "generalDesc": "The complex used to be the old bakery of Oia and it was recently restored with respect to the unique local architecture creating a remarkable ekistic complex of a unique sculptural quality. The plasticity of the forms,the use of local techniques, the built in beds and the antique furniture together with modern amenities strike the right balance between sophistication and coziness.",
    "guestAccess": "Me or my husband John we will usually welcome you to the house. I am always available to answer all of your questions via messages or emails and at the house you will find a local mobile that you can use it to call us.",
    "others": "",
    "price": 180,
    "currency": "USD",
    "amenities": ["television", "laptop", "shower", "wifi"],
    "imageUrl": "https://a0.muscache.com/im/pictures/25735497/948807b4_original.jpg?aki_policy=xx_large",
    "owner": {
        "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
        "name": "Mona"
    },
    "address": {
        "country": "United Kingdom",
        "city": "London",
        "street": "Abby Road",
        "number": "23",
        "lat": "51.6000",
        "lng": "-0.1900"
    },
    "theSpace": {
        "description": "This cave house, hanging on the cliffs of the caldera, is part of a traditional synthesis of houses owned by a family of architects",
        "guests": 2,
        "beds": 2,
        "bedrooms": 1
    },
    rating: 4,
    "reviews": [
        {
            "id": 1,
            "title": "Very small but clean room",
            "name": "Lea",
            "content": "Consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
            "rating": 3,
            "date": "DECEMBER 19 2017",
            userID: 1

        },
        {
            "id": 2,
            "title": "Nice couple, good vibes",
            "name": "David",
            "content": "Justo in hac habitasse platea dictumst etiam cursus urna ut tellus ut erat id vulputate",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
            "rating": 4,
            "date": "May 25 2017",
            userID: 2

        }
    ],
    "occupancy": [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]
},
{
    userID: 3,
    "id": 5,
    "title": "West side in the center",
    "type": "Private room in apartment",
    "generalDesc": "The complex used to be the old bakery of Oia and it was recently restored with respect to the unique local architecture creating a remarkable ekistic complex of a unique sculptural quality. The plasticity of the forms,the use of local techniques, the built in beds and the antique furniture together with modern amenities strike the right balance between sophistication and coziness.",
    "guestAccess": "Me or my husband John we will usually welcome you to the house. I am always available to answer all of your questions via messages or emails and at the house you will find a local mobile that you can use it to call us.",
    "others": "",
    "price": 129,
    "currency": "USD",
    "amenities": ["television", "laptop", "shower", "wifi"],
    "imageUrl": "https://a0.muscache.com/im/pictures/35836380/a9a49e5f_original.jpg?aki_policy=xx_large",
    "owner": {
        "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
        "name": "Mona"
    },
    "address": {
        "country": "United Kingdom",
        "city": "London",
        "street": "Abby Road",
        "number": "23",
        "lat": "51.6000",
        "lng": "-0.1900"
    },
    "theSpace": {
        "description": "This cave house, hanging on the cliffs of the caldera, is part of a traditional synthesis of houses owned by a family of architects",
        "guests": 2,
        "beds": 2,
        "bedrooms": 1
    },
    rating: 4,
    "reviews": [
        {
            "id": 1,
            "title": "Very small but clean room",
            "name": "Lea",
            "content": "Consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
            "rating": 3,
            "date": "DECEMBER 19 2017",
            userID: 3

        },
        {
            "id": 2,
            "title": "Nice couple, good vibes",
            "name": "David",
            "content": "Justo in hac habitasse platea dictumst etiam cursus urna ut tellus ut erat id vulputate",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
            "rating": 4,
            "date": "May 25 2017",
            userID: 1

        }
    ],
    "occupancy": [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]
},
{
    userID: 3,
    "id": 6,
    "title": "Studio in historical center",
    "type": "Private room in apartment",
    "generalDesc": "The complex used to be the old bakery of Oia and it was recently restored with respect to the unique local architecture creating a remarkable ekistic complex of a unique sculptural quality. The plasticity of the forms,the use of local techniques, the built in beds and the antique furniture together with modern amenities strike the right balance between sophistication and coziness.",
    "guestAccess": "Me or my husband John we will usually welcome you to the house. I am always available to answer all of your questions via messages or emails and at the house you will find a local mobile that you can use it to call us.",
    "others": "",
    "price": 289,
    "currency": "USD",
    "amenities": ["television", "laptop", "shower", "wifi"],
    "imageUrl": "https://a0.muscache.com/im/pictures/4913407/6ceaefb6_original.jpg?aki_policy=xx_large",
    "owner": {
        "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
        "name": "Mona"
    },
    "address": {
        "country": "United Kingdom",
        "city": "London",
        "street": "Abby Road",
        "number": "23",
        "lat": "51.6000",
        "lng": "-0.1900"
    },
    "theSpace": {
        "description": "This cave house, hanging on the cliffs of the caldera, is part of a traditional synthesis of houses owned by a family of architects",
        "guests": 2,
        "beds": 2,
        "bedrooms": 1
    },
    rating: 4,
    "reviews": [
        {
            "id": 1,
            "title": "Very small but clean room",
            "name": "Lea",
            "content": "Consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
            "rating": 3,
            "date": "DECEMBER 19 2017",
            userID: 2

        },
        {
            "id": 2,
            "title": "Nice couple, good vibes",
            "name": "David",
            "content": "Justo in hac habitasse platea dictumst etiam cursus urna ut tellus ut erat id vulputate",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
            "rating": 4,
            "date": "May 25 2017",
            userID: 3

        }
    ],
    "occupancy": [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]
},
{
    userID: 3,
    "id": 7,
    "title": "BEST LOCATION Luxury Loft",
    "type": "Private room in apartment",
    "generalDesc": "The complex used to be the old bakery of Oia and it was recently restored with respect to the unique local architecture creating a remarkable ekistic complex of a unique sculptural quality. The plasticity of the forms,the use of local techniques, the built in beds and the antique furniture together with modern amenities strike the right balance between sophistication and coziness.",
    "guestAccess": "Me or my husband John we will usually welcome you to the house. I am always available to answer all of your questions via messages or emails and at the house you will find a local mobile that you can use it to call us.",
    "others": "",
    "price": 310,
    "currency": "USD",
    "amenities": ["television", "laptop", "shower", "wifi"],
    "imageUrl": "https://a0.muscache.com/im/pictures/15719274/9cfc4ba1_original.jpg?aki_policy=xx_large",
    "owner": {
        "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
        "name": "Mona"
    },
    "address": {
        "country": "United Kingdom",
        "city": "London",
        "street": "Abby Road",
        "number": "23",
        "lat": "51.6000",
        "lng": "-0.1900"
    },
    "theSpace": {
        "description": "This cave house, hanging on the cliffs of the caldera, is part of a traditional synthesis of houses owned by a family of architects",
        "guests": 2,
        "beds": 2,
        "bedrooms": 1
    },
    rating: 4,
    "reviews": [
        {
            "id": 1,
            "title": "Very small but clean room",
            "name": "Lea",
            "content": "Consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
            "rating": 3,
            "date": "DECEMBER 19 2017",
            userID: 3

        },
        {
            "id": 2,
            "title": "Nice couple, good vibes",
            "name": "David",
            "content": "Justo in hac habitasse platea dictumst etiam cursus urna ut tellus ut erat id vulputate",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
            "rating": 4,
            "date": "May 25 2017",
            userID: 1

        }
    ],
    "occupancy": [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]
},
{
    userID: 3,
    "id": 8,
    "title": "Prime 3 Storey Cape Town Penthouse",
    "type": "Private room in apartment",
    "generalDesc": "The complex used to be the old bakery of Oia and it was recently restored with respect to the unique local architecture creating a remarkable ekistic complex of a unique sculptural quality. The plasticity of the forms,the use of local techniques, the built in beds and the antique furniture together with modern amenities strike the right balance between sophistication and coziness.",
    "guestAccess": "Me or my husband John we will usually welcome you to the house. I am always available to answer all of your questions via messages or emails and at the house you will find a local mobile that you can use it to call us.",
    "others": "",
    "price": 189,
    "currency": "USD",
    "amenities": ["television", "laptop", "shower", "wifi"],
    "imageUrl": "https://a0.muscache.com/im/pictures/3898743/a70e3172_original.jpg?aki_policy=xx_large",
    "owner": {
        "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg",
        "name": "Mona"
    },
    "address": {
        "country": "United Kingdom",
        "city": "London",
        "street": "Abby Road",
        "number": "23",
        "lat": "51.6000",
        "lng": "-0.1900"
    },
    "theSpace": {
        "description": "This cave house, hanging on the cliffs of the caldera, is part of a traditional synthesis of houses owned by a family of architects",
        "guests": 2,
        "beds": 2,
        "bedrooms": 1
    },
    rating: 4,
    "reviews": [
        {
            "id": 1,
            "title": "Very small but clean room",
            "name": "Lea",
            "content": "Consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg",
            "rating": 3,
            "date": "DECEMBER 19 2017",
            userID: 2

        },
        {
            "id": 2,
            "title": "Nice couple, good vibes",
            "name": "David",
            "content": "Justo in hac habitasse platea dictumst etiam cursus urna ut tellus ut erat id vulputate",
            "userImageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
            "rating": 4,
            "date": "May 25 2017",
            userID: 1

        }
    ],
    "occupancy": [{
        startDate: new Date('2017-10-20'),
        endDate: new Date('2017-10-25'),

    },
    {
        startDate: new Date('2017-11-5'),
        endDate: new Date('2017-11-7'),
    },
    {
        startDate: new Date('2017-11-21'),
        endDate: new Date('2017-11-24'),
    }]
}]

const users = [
    {
        id: 1,
        firstname: 'david',
        lastname: 'green',
        password: '1234',
        email: 'd@d.com',
        imageUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg'
    },
    {
        id: 2,
        firstname: 'mona',
        lastname: 'Green',
        password: '1234',
        email: 'm@m.com',
        imageUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg'
    },
    {
        id: 3,
        firstname: 'lola',
        lastname: 'green',
        password: '1234',
        email: 'l@l.com',
        imageUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg'
    }
]

module.exports = {
    locations,
    users
}