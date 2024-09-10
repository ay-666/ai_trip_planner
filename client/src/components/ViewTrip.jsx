import { db } from '@/services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import TripInfoSection from './TripInfoSection';
import Hotels from './Hotels';
import PlacesToVisit from './PlacesToVisit';
import ViewTripFooter from './ViewTripFooter';
import Navbar from './shared/Navbar';

const ViewTrip = () => {

  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    tripId && getTripInfo();
  }, [tripId]);

  const getTripInfo = async () => {
    try {
      setLoading(true);

      const docRef = doc(db, 'tripDetails', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log(docSnap.data());
        setTrip(docSnap.data());
      } else {
        toast.error("No such doc found!")
      }


    } catch (e) {
      console.log(e);
      toast.error(e?.response?.message || 'something went wrong while fetching info from db');

    }finally{
      setLoading(false);
    }

  }
  return (
    <div>
      <Navbar />

      <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <TripInfoSection  trip={trip} />
        <Hotels loading={loading} trip={trip} />
        <PlacesToVisit loading={loading} trip={trip} />
        <ViewTripFooter />
      </div>

    </div>

  )
}

export default ViewTrip;