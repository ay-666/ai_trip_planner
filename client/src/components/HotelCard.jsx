import { GetPlaceDetails } from '@/services/GlobalApi';
import { PHOTO_REF_URL } from '@/utils/constants';
import useGetPhoto from '@/utils/hooks/useGetPhoto';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const HotelCard = ({ hotel }) => {
    const [photoURL, setPhotoURL] = useState();
    const [loading, setLoading] = useState(false);

    const pURL = useGetPhoto(hotel?.name);

    useEffect(() => {
        //hotel &&GetPlacePhoto();
        setLoading(true);


        if (hotel && pURL) {
            setPhotoURL(pURL);
            setLoading(false);

        }


    },
        [hotel, pURL]);

    return (
        <div onClick={() => { window.open(`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`, '_blank') }} className='hover:scale-110 transition-all cursor-pointer' >
            {
                loading
                    ? <div>
                        <div className='rounded-xl h-48 animate-pulse bg-slate-200'   />
                        <div className='flex flex-col gap-2 my-2'>
                            <h2 className='font-medium'>LOADING...</h2>
                            <h2 className='font-medium text-gray-500 text-xs'>📍LOADING... </h2>
                            
                        </div>
                    </div>

                    : <div>
                        <img className='rounded-xl h-48 object-cover' src={photoURL} alt="hotel_img" />
                        <div className='flex flex-col gap-2 my-2'>
                            <h2 className='font-medium'>{hotel?.name}</h2>
                            <h2 className='font-medium text-gray-500 text-xs'>📍{hotel?.address} </h2>
                            <h2 className='text-sm font-semibold'>{hotel.price && '💰' + hotel?.price}</h2>
                            <h2 className='text-sm font-semibold'>{hotel.ratings && '⭐ ' + hotel?.ratings}</h2>
                        </div>
                    </div>
            }

        </div>
    )
}

export default HotelCard;