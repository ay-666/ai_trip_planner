import { GetPlaceDetails } from '@/services/GlobalApi';
import React, { useState, useEffect } from 'react'
import { PHOTO_REF_URL } from '../constants';
import { toast } from 'sonner';

const useGetPhoto = (query) => {
    const [photoURL, setPhotoURL] = useState();

    useEffect(() => {



        const GetPlacePhoto = async () => {



            const data = {
                textQuery: query
            }

            if (!data.textQuery) return;

            try {
                const res = await GetPlaceDetails(data);


                const FINAL_URL = PHOTO_REF_URL.replace('{NAME}', res?.data?.places[0]?.photos[3]?.name).replace('{API_KEY}', import.meta.env.VITE_GOOGLE_PLACE_API_KEY);


                setPhotoURL(FINAL_URL);

            } catch (e) {
                console.log(e);

                //toast.error(e?.response?.message || 'some error occured while loading image');
            }
        }

        GetPlacePhoto();


    }, [query])


    return photoURL;
}

export default useGetPhoto;