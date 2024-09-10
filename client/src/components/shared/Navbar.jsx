import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import google_logo from '../../assets/google.svg'
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constants';


const Navbar = () => {
  const [profilePic,setProfilePic] = useState();
  const user = JSON.parse(localStorage.getItem('user'));
  const [localUser, setLocalUser] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if(user){
      setProfilePic(user?.picture);
    }
  }, [user,localUser])


  const logoutHandler = async () => {
    try {
      await googleLogout();
      localStorage.clear();
      navigate('/');


    } catch (e) {
      console.log(e);
      toast.error(e?.respone?.data?.message || 'error while logging out')

    }
  }

  const loginHandler = useGoogleLogin({
    onSuccess: (codeResponse) => {
      //console.log(codeResponse);
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
        navigate('/create-trip');

      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response || "error fetching user");

    }
  }

  return (
    <div className='p-4 shadow-sm flex justify-between items-center px-5'>
      <img src={logo} alt="logo" />
      {user ? <div className='flex items-center gap-3'>
        <Button onClick= {()=>{navigate('/create-trip')}} variant="outline" className="rounded-full">+ Create trip</Button>
        <Button onClick= {()=>{navigate('/my-trips')}} variant="outline" className="rounded-full">My trip</Button>

        <Popover>
          <PopoverTrigger><img src={profilePic} alt="profile_pic" className='w-8 rounded-full' /></PopoverTrigger>
          <PopoverContent className=" mx-4 my-2">
            <Button onClick={logoutHandler} variant="link" className='text-md'><LogOut className='w-5 text-center mr-1' /> Logout</Button>
          </PopoverContent>
        </Popover>
      </div>
        : <div>
          <Button onClick={()=>{
            setOpenDialog(true);
          }}>Sign In</Button>

        </div>}
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

          <Button onClick={loginHandler} className="w-full flex items-center gap-2"><img className='w-6' src={google_logo} />Sign In with Google</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Navbar;