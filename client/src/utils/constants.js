export const SelectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveller exploration',
        icon: '✈️',
        people:'1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'A romantic getaway for two',
        icon: '🥂',
        people:'2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Fun-filled family adventures',
        icon: '👨‍👩‍👧‍👦',
        people:'3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Unforgettable memories with your crew',
        icon: '🚌',
        people:'3 to 8 People'
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'A balanced budget-friendly option',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Experience the best, no expense spared',
        icon: '💎',
    },
];


export const AI_PROMPT = 'Generate Travel Plan For Location : {location} , for {noOfDays} Days for {people} with a {budget} Budget, Give me Hotels options list with Hotel Name, Hotel Address , Price ,Hotel Image URL , Hotel geo coordinates , Ratings ,Descriptions in JSON format and  also, Create an Itinerary with time (morning - evening) , place name, place details (in one sentence) , place image URL , geo coordinates, ticket pricing , ratings ,timings ,time to explore each of the place, for {noOfDays} with each day plan in JSON format.'




export const USER_API_ENDPOINT = 'https://www.googleapis.com/oauth2/v1/userinfo?acess_token='

export const SEARCH_URL = `https://places.googleapis.com/v1/places:searchText`
export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key={API_KEY}'