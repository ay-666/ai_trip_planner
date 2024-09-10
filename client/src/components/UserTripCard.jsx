import useGetPhoto from '@/utils/hooks/useGetPhoto';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserTripCard = ({ trip }) => {
    const navigate = useNavigate();
    const [photoURL, setPhotoURL] = useState();
    const pURL = useGetPhoto(trip?.userSelection?.location?.label);
    useEffect(() => {
        if (trip && pURL) {
            setPhotoURL(pURL);
        }
    }, [trip, pURL])

    return (
        <div>
            {photoURL ? <div className='hover:scale-105 transition-all cursor-pointer rounded-lg' onClick={() => { navigate(`/view-trip/${trip?.id}`) }}>
                <img src={photoURL} className='rounded-xl object-cover h-48 w-56' alt="trip_img" />
                <div>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget} budget</h2>
                </div>
            </div>
                :
                <div className='h-[220px] w-[250px] bg-gray-300 animate-pulse rounded-lg'>

                </div>
            }



        </div>
    )
}

export default UserTripCard;