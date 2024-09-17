import useGetPhoto from '@/utils/hooks/useGetPhoto';
import React, { useEffect, useState } from 'react'

const PlaceCard = ({ place, location }) => {

    const [photoURL, setPhotoURL] = useState();
    const [loading, setLoading] = useState(false);

    const pURL = useGetPhoto(place?.place);

    useEffect(() => {
        setLoading(true);
        if (place && pURL) {


            setPhotoURL(pURL);
            setLoading(false);
        }
    }, [place, pURL])

    return (<div className='my-3'>
        {
            loading ?
                <div>
                    <h2 className='font-medium text-sm text-orange-400'>time loading...</h2>
                    <div
                        className='flex gap-5 mt-2 border rounded-lg p-3  transition-all '>
                        <div  className='rounded-xl w-32 h-32 animate-pulse bg-slate-200' />
                        <div className='flex flex-col justify-around'>
                            <h2 className='font-bold '>loading...</h2>
                            <h2 className='text-sm text-gray-400'>loading...</h2>
                            
                        </div>
                    </div>
                </div>

                :
                <div className=''>
                    <h2 className='font-medium text-sm text-orange-400'>{place?.time}</h2>
                    <div onClick={() => { window.open(window.open(`https://www.google.com/maps/search/?api=1&query=${place?.place},${location}`, '_blank')) }}
                        className='flex gap-5 mt-2 border rounded-lg p-3 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                        <img src={photoURL} alt="place_img" className='rounded-xl w-32 h-32 object-cover scale-90 sm:scale-100' />
                        <div className='flex flex-col justify-around scale-90 sm:scale-100 flex-wrap'>
                            <h2 className='font-bold '>{place?.place}</h2>
                            <h2 className='text-sm text-gray-400'>{place?.details}</h2>
                            <div className='flex items-baseline gap-2'><span className='text-sm'>Ticket Pricing:</span><span className='text-sm font-medium text-green-500'>{place?.ticket_pricing}</span></div>
                        </div>
                    </div>
                </div>

        }



    </div >);
}

export default PlaceCard;