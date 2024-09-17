import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Navbar from './shared/Navbar';
import { Input } from './ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList, USER_API_ENDPOINT } from '@/utils/constants';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/services/AIModal';
import logo from '../assets/logo.svg'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import google from '../assets/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { Loader2 } from 'lucide-react';
import { db } from '@/services/FirebaseConfig';
import { useNavigate } from 'react-router-dom';



const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [localUser , setLocalUser] = useState();
    const [formData, setFormData] = useState({
        location: "",
        noOfDays: undefined,
        budget: "",
        people: ""
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData, [name]: value
        });
    }

    useEffect(() => {
        

    }, [formData,localUser]);


    const saveTripInfo = async (tripData) => {


        const docId = Date.now().toString();


        const user = JSON.parse(localStorage.getItem('user'));

        try {
            await setDoc(doc(db, "tripDetails", docId), {
                userSelection: formData,
                tripData: JSON.parse(tripData),
                userEmail: user?.email,
                id: docId
            });

            return docId;

        } catch (e) {
            console.log(e);
            toast.error(e?.response || 'Some error occured while saving data');

        }
    }


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            
            getUserProfile(codeResponse);
            setOpenDialog(false);
            

        },
        onError: (error) => {
            console.log(error);
            setOpenDialog(false);
            
        }
    });

    const getUserProfile = async (tokenInfo) => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}${tokenInfo?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'application/json'
                }
            });

            if (res) {
                console.log(res);
                localStorage.setItem('user', JSON.stringify(res?.data));
                setLocalUser(JSON.stringify(res?.data));

            }
        } catch (e) {
            console.log(e);
            toast.error(e?.response || "error fetching user");

        }
    }

    const generateTrip = async () => {
        const user = localStorage.getItem('user');


        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData.location === "" || formData.noOfDays===undefined || formData?.noOfDays > 7 || formData?.noOfDays < 1 || formData.budget === "" || formData.people === "") {

            toast.error('Some inputs are missing');
            return;
        }

        const FINAL_PROMPT = AI_PROMPT.replaceAll('{location}', formData?.location?.label).replaceAll('{noOfDays}', formData?.noOfDays)
            .replaceAll('{people}', formData?.people).replaceAll('{budget}', formData?.budget);


        //console.log(FINAL_PROMPT);

        try {
            setLoading(true);
            const result = await chatSession.sendMessage(FINAL_PROMPT);
           console.log(result?.response?.text());
            //console.log(JSON.parse(result?.response?.text()));

            const docId = await saveTripInfo(result?.response?.text());

            if(docId){
                navigate(`/view-trip/${docId}`);
            }

            
            
            
        } catch (e) {
            console.log(e);

        }finally{
            setLoading(false);
        }








    }

    return (
        <div>
            <Navbar />

            <div className=' sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mx-auto '>
                <h2 className='font-bold text-2xl sm:text-3xl'>Tell us your travel preference 🏕️</h2>
                <p className='mt-3 text-gray-500 sm:text-lg'>Just provide some basic information, and our trip will generate customized itinerary based on your preferences.</p>

                <div className='mt-20 flex flex-col gap-10'>
                    <div>
                        <h2 className='text-xl font-bold my-4 '>Choose a Destinaton</h2>
                        <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place, onChange: (value) => {
                                    setPlace(value);
                                    handleInputChange('location', value)
                                }
                            }}
                        />

                    </div>

                    <div>
                        <h2 className='text-xl font-bold my-4 '>How many days are you planning for?</h2>
                        <Input name="noOfDays" onChange={(e) => { handleInputChange('noOfDays', e.target.value) }} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type='number' placeholder="Ex.3" />
                        {formData?.noOfDays > 7 && <p className='text-sm text-red-500 mt-1'>Maximum limit 7 days</p>}
                        {formData?.noOfDays < 1 && <p className='text-sm text-red-500 mt-1'>Select 1 or more days  </p>}


                    </div>

                    <div>
                        <h2 className='text-xl font-bold my-4 '>What's your Budget?</h2>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5'>
                            {SelectBudgetOptions.map((item, index) => {
                                return (<div onClick={() => { handleInputChange('budget', item.title) }} className={`p-4 border hover:shadow-lg rounded-lg flex flex-col gap-2 cursor-pointer ${formData?.budget === item.title && 'shadow-lg border-black'}`} key={index}>
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-gray-500 text-sm'>{item.desc}</h2>

                                </div>
                                );
                            })
                            }
                        </div>

                    </div>
                    <div>
                        <h2 className='text-xl font-bold my-4 '>Who do you plan to travel with?</h2>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5'>
                            {SelectTravelList.map((item, index) => {
                                return (<div onClick={() => { handleInputChange('people', `${item.title} with group size ${item.people}`) }} className={`p-4 border hover:shadow-lg rounded-lg flex flex-col gap-2 cursor-pointer ${formData?.people?.includes(item.title) && 'shadow-lg border-black'}`} key={index}>
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-gray-500 text-sm'>{item.desc}</h2>

                                </div>
                                );
                            })
                            }
                        </div>

                    </div>


                </div>


                <div className='my-10 flex justify-end'>
                    {
                        loading ?<Button className=""><Loader2 className='mr-2 w-5 animate-spin' />Please wait</Button>  : <Button onClick={generateTrip}>Generate Trip</Button>
                    }
                </div>

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                <img src={logo} alt='logo' />
                                <p className='font-bold text-lg mt-5'>Sign In with Google</p>
                            </DialogTitle>
                            <DialogDescription>Sign In to the app with google authentication
                            </DialogDescription>
                        </DialogHeader>

                        <Button onClick={login} className="w-full flex items-center gap-2"><img className='w-6' src={google} />Sign In with Google</Button>
                    </DialogContent>
                </Dialog>


            </div>

        </div>

    );
}

export default CreateTrip;