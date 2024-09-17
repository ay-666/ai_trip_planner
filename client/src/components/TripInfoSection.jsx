import { Send } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { toast } from 'sonner';
import { GetPlaceDetails } from '@/services/GlobalApi';
import { PHOTO_REF_URL } from '@/utils/constants';
import useGetPhoto from '@/utils/hooks/useGetPhoto';


const TripInfoSection = ({ trip }) => {


    const [photoURL, setPhotoURL] = useState();
    const [loading,setLoading] = useState(false);

    const pURL = useGetPhoto(trip?.userSelection?.location?.label)






    useEffect(() => {
        // trip && GetPlacePhoto();
        setLoading(true);
        if (trip && pURL) {
            setPhotoURL(pURL);
            setLoading(false);
        }

    },
        [trip, pURL]);


    return (
        <div>
            {
                loading
                    ? <div>
                        <div  className='h-80 w-full bg-slate-300 animate-pulse transition-all  ' />
                        <div className='flex justify-between items-center'>
                            <div className='p-5 flex flex-col gap-2'>
                                <h2 className='text-xl font-bold'>{trip?.userSelection?.location?.label || 'Location loading...'}</h2>
                                <div className='flex gap-3 '>
                                    <h2 className='text-sm md:text-md rounded-2xl py-1 px-3 animate-pulse w-20  text-gray-500 bg-gray-200'>📆</h2>
                                    <h2 className='text-sm md:text-md rounded-2xl py-1 px-3 animate-pulse w-20 text-gray-500 bg-gray-200'>💰</h2>
                                    <h2 className='text-sm md:text-md rounded-2xl py-1 px-3 animate-pulse w-20 text-gray-500 bg-gray-200'>🧳</h2>
                                </div>

                            </div>

                            {/* <Button className='bg-slate-700 '><Send className='w-5'></Send></Button> */}

                        </div>
                    </div>

                    : <div>
                        <img src={photoURL} className='h-80 w-full  object-cover  rounded-lg' alt="place_img" />
                        <div className='flex justify-between items-center'>
                            <div className='p-5 flex flex-col gap-2'>
                                <h2 className='text-xl font-bold'>{trip?.userSelection?.location?.label || 'Location'}</h2>
                                <div className='flex gap-3 items-start flex-col sm:flex-row'>
                                    <h2 className='text-sm md:text-md rounded-2xl py-1 px-3  text-gray-500 bg-gray-200'>📆 {trip?.userSelection?.noOfDays + ' Days' || 'Days'}</h2>
                                    <h2 className='text-sm md:text-md rounded-2xl py-1 px-3  text-gray-500 bg-gray-200'>💰{trip?.userSelection?.budget + ' Budget' || 'Budget'}</h2>
                                    <h2 className='text-sm md:text-md rounded-2xl py-1 px-3  text-gray-500 bg-gray-200'>🧳{'Travellers: ' +  trip?.userSelection?.people || 'Traveller'}</h2>
                                </div>

                            </div>

                            {/* <Button className='bg-slate-700 '><Send className='w-5'></Send></Button> */}

                        </div></div>
            }



        </div>
    )
}

export default TripInfoSection;