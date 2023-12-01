import React from 'react'
import { IoSearch } from "react-icons/io5";

import { images } from '../../../constants/index.js'

const Hero = () => {
  return (
    <section className='container flex mx-auto flex-col px-20 py-0 my-0 lg:flex-row bg-white'>
        <div className='mt-5 lg:w-1/2 py-40 px-20 pr-0 md:px-10'>
            <p className='text-5xl font-bold pb-4'>
                Welcome to <br /><span className='text-yellow-500'>Ode to the Oven</span>
            </p>
            <p>
                Where food lovers unite to discover mouthwatering recipes, delightful restaurants, and engaging food discussions. Explore, share, and connect over the joy of cooking and dining.
            </p>
            <div className='py-10'>
                <div className='relative'>
                    <IoSearch className='absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]' />
                    <input className='placeholder:font-semibold font-semibold rounded-t-lg pl-10 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]' type='text' placeholder='Search Recipe..'/>
                </div>
                <button className='w-full bg-yellow-500 rounded-b-lg p-1 text-xl text-white font-semi-bold'>Search</button>
            </div>
            <div className='flex flex-col lg:flex-row gap-x-4 mt-7'>
                <span className='my-1'>Popular tags:</span>
                <ul className='flex flex-wrap gap-2.5'>
                    <li className='rounded-lg bg-yellow-200 bg-opacity-40 px-3 py-1.5 text-yellow-600 font-semibold'>Indian</li>
                    <li className='rounded-lg bg-yellow-200 bg-opacity-40 px-3 py-1.5 text-yellow-600 font-semibold'>Italian</li>
                    <li className='rounded-lg bg-yellow-200 bg-opacity-40 px-3 py-1.5 text-yellow-600 font-semibold'>Japanese</li>
                </ul>
            </div>
        </div>
        <div className="basis-1/2 bg-no-repeat bg-cover bg-center rounded-xl m-20" style={{backgroundImage: `url(${images.HeroPhoto})`}} ></div>
    </section>
  )
}

export default Hero;