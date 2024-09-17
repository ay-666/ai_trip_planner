import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/services/FirebaseConfig';
import UserTripCard from './UserTripCard';

const MyTrip = () => {

    const [trips,setTrips] = useState();


    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();



    const getUserTrip = async () =>{
        if(!user){
            navigate('/');
            return;
        }

        const q = query(collection(db,'tripDetails'),where("userEmail",'==',user?.email));

        const querySnapshot = await getDocs(q);

        let allTrips = [];

        querySnapshot.forEach((doc)=>{
            //console.log(doc.data());
            allTrips.push(doc.data());
        });

        setTrips(allTrips);


    }

    useEffect(()=>{
        getUserTrip();
    },[]);

    return (
        <div>
            <Navbar />
            <div className='p-10 sm:px-32 lg:px-44 xl:px-56'>
                <h2 className='text-2xl font-bold'>My Trips</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
                    { trips ? (trips.length >0 ?
                    (trips.map((trip,index)=>{
                       return <UserTripCard trip={trip} key={index} />
                    }) ) : (<h2 className='font-bold text-teal-600 text-2xl'> No Recent Trip Found...😵 </h2>)
                    
                    )
                    :
                     (Array(6).fill(1).map((item,index)=>
                        <div className='h-[200px] w-[220px] bg-gray-300 animate-pulse rounded-lg' key={index}>

                        </div>
                    ))
                    }
                </div>

            </div>
        </div>
    )
}

export default MyTrip;