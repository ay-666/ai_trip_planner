import { SEARCH_URL } from "@/utils/constants";
import axios from "axios";


const config = {
    headers: {
        'Content-Type':'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos','places.displayName','places.id'
        ]
    }
} 

export const GetPlaceDetails = (data) =>axios.post(SEARCH_URL,data,config);