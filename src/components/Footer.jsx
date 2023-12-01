import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { images } from '../constants/index.js';
// import {  } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-20 absolute border-b-4 border-yellow-500 bg-yellow-50 pt-12 mt-10">
      {/* Footer top */}
      <div className="box flex flex-col md:flex-row  justify-between border-b-2 border-yellow-100 pb-10 gap-8">
        {/* Footer top left */}
        <div className="basis-1/2 flex flex-col gap-6 items-center md:items-start text-center md:text-start">
          <img src={images.Logo} alt='logo' className='w-50 h-10' />
          <p>
            Your culinary haven for sharing and savoring. Explore recipes,
            restaurants, and engaging discussions. Join us now and indulge in
            flavor-filled experiences!"
          </p>
        </div>
        {/* Footer top right */}
        <div className="flex gap-10 basis-1/2 justify-center md:justify-end flex-wrap md:flex-nowrap">
          {/* Footer s */}
          <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
            <li className="text-gray-700 text-sm text-bold mb-2">Product</li>
              <a href='/'>Home</a>
              <a href='/'>Recipes</a>
              <a href='/'>Contact</a>
          </ul>
          <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
            <li className="text-gray-700 text-sm text-bold mb-2">Company</li>
              <a href='/'>About</a>
              <a href='/'>Careers</a>
              <a href='/'>News</a>
              <a href='/'>Newsletter</a>
          </ul>
          <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
            <li className="text-gray-700 text-sm text-bold mb-2">Legal</li>
              <a href='/'>Terms</a>
              <a href='/'>Privacy</a>
              <a href='/'>Licenses</a>
              <a href='/'>Cookies</a>
          </ul>
        </div>
      </div>
      {/* Footer bottom */}
      <div className="box flex justify-center sm:justify-between flex-col sm:flex-row w-full gap-4 mt-4">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Ode to the Oven. All rights reserved
        </p>
        {/* Footer social links */}
        <ul className="flex justify-center gap-6 text-xl">
            <a
              href="https://github.com/Avinash905"
              aria-label="Follow me on github"
            >
              <AiFillGithub />
            </a>
            <a
              href="https://twitter.com/avinashdunna"
              aria-label="Follow me on twitter"
            >
              <AiFillTwitterCircle />
            </a>
            <a
              href="https://www.linkedin.com/in/dunna-avinash"
              aria-label="Follow me on linkedin"
            >
              <AiFillLinkedin />
            </a>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;