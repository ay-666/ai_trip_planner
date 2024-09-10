import React from 'react'
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import website_pic from '../assets/website_lappy.png';

const HeroSection = () => {
    const navigate = useNavigate();

  return (
    <div className='mt-8 flex flex-col items-center mx-auto gap-10 p-4'>
        <h1 className='font-bold text-[50px] mt-8'>
            <span className='text-[#f56551] text-center'>Discover Your Next Adventure with AI:</span>
            <p className=' text-center'>Personalize Itineraries at Your Fingertips.</p>
        </h1>
        <p className='text-lg text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interest and budget.</p>
        <Button onClick={()=>{navigate('/create-trip')}}>Get started. It's Free.</Button>
        <img src={website_pic} alt="web_img" />
    </div>
  )
}

export default HeroSection;