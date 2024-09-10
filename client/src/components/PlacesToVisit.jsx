import React from 'react'
import PlaceCard from './PlaceCard';

const PlacesToVisit = ({ trip, loading }) => {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Places to Visit</h2>
            <div className='p-2 flex flex-col gap-5 '>
                {
                    loading ? Array(4).fill(1).map((_,index) =>
                        <div key={index}>
                            <h2 className='font-medium text-lg'>day</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {Array(6).fill(1).map((place, ind) => {
                                    return <div key={100+ind}>
                                        <h2 className='font-medium text-sm text-orange-400'>time loading...</h2>
                                        <div
                                            className='flex gap-5 mt-2 border rounded-lg p-3  transition-all '>
                                            <div className='rounded-xl w-32 h-32 animate-pulse bg-slate-200' />
                                            <div className='flex flex-col justify-around'>
                                                <h2 className='font-bold '>loading...</h2>
                                                <h2 className='text-sm text-gray-400'>loading...</h2>

                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>)
                        : trip?.tripData?.itinerary?.map((item, index) => {
                            return (<div className='mt-2' key={index}>
                                <h2 className='font-medium text-lg'>{item?.day}</h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {item?.plan?.map((place, ind) => {
                                        return <PlaceCard place={place} location={trip?.userSelection?.location?.label} key={ind} />
                                    })}
                                </div>

                            </div>);
                        })
                }
            </div>
        </div>
    )
}

export default PlacesToVisit;