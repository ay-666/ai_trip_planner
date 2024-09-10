import { Map } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HotelCard from './HotelCard';

const Hotels = ({ trip , loading}) => {
    const navigate = useNavigate();
    
   
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3  justify-between gap-4 mt-4'>
                {!loading ?
                    trip?.tripData?.hotels?.map((hotel, index) => {
                        return (<HotelCard hotel={hotel} key={index} />);
                    })

                    :
                    Array(6).fill(1).map((item, index) => <div key={index}>
                        <div className='rounded-xl h-48 bg-slate-200 animate-pulse' />
                        <div className='flex flex-col gap-2 my-2'>
                            <h2 className='font-medium w-15 bg-slate-200 animate-pulse'></h2>
                            <h2 className='font-medium text-gray-500 text-xs'>📍LOADING... </h2>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Hotels;