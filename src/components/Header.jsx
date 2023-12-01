import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/user";

import { images } from '../constants/index.js';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const navItemsInfo = [
    { name: "Recipies", type: "link", href: "/recipes" },
    { name: "Contact Us", type: "link", href: "/" },
];

const NavItem = ({ name, href }) => {
    return (
        <li className='relative group'>
            <Link to={href}>
                {name}
                <span>
                    <hr className='mr-50 w-0 h-1 bg-yellow-500 transition-all duration-450 group-hover:w-full' />
                </span>
            </Link>
        </li>
    )
}

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [navIsVisible, setNavIsVisible] = useState(false);
    const userState = useSelector((state) => state.user);
    const [profileDrowpdown, setProfileDrowpdown] = useState(false);

    const navVisibilityHandler = () => {
        setNavIsVisible((curState) => {
            return !curState;
        });
    };

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <section className='border-b-2 border-black-300 border-solid top-0 sticky z-10'>
            <header className='container mx-0 my-0 px-10 flex justify-between py-4 items-center bg-white'>
                <div>
                    <Link to="/">
                        <img src={images.Logo} alt='logo' className='w-50 h-10' />
                    </Link>
                </div>

                <div className="lg:hidden z-50">
                    {navIsVisible ? (
                        <AiOutlineClose
                            className="w-6 h-6"
                            onClick={navVisibilityHandler}
                        />
                    ) : (
                        <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
                    )}
                </div>

                <div className={`${navIsVisible ? "right-0" : "-right-full gap-[40px]"} bg-white transition-all duration-300 mt-[56px] lg:mt-0 z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}>
                    <ul className="items-center gap-y-2 lg:text-dark-soft flex flex-col lg:flex-row lg:gap-x-10 gap-x-2 font-semibold">
                        {navItemsInfo.map((item) =>
                            <NavItem key={item.name} name={item.name} href={item.href} />
                        )}
                    </ul>
                    {userState.userInfo ? (
                        <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                            <div className="relative group">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="flex border-2 border-yellow-500 px-6 py-2 rounded-full text-yellow-500 font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-300"
                                        onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                                    >
                                        <span>Account</span>
                                        <MdKeyboardArrowDown className='ml-3 mt-1' />
                                    </button>
                                    <div
                                        className={`${profileDrowpdown ? "block" : "hidden"
                                            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                                    >
                                        <ul className="bg-yellow-500 lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                                            {userState?.userInfo?.admin && (
                                                <button
                                                    onClick={() => navigate("/admin")}
                                                    type="button"
                                                    className="hover:bg-yellow-500 hover:text-white px-4 py-2 text-yellow-500 lg:text-dark-soft"
                                                >
                                                    Admin Dashboard
                                                </button>
                                            )}

                                            <button
                                                onClick={() => navigate("/profile")}
                                                type="button"
                                                className="hover:bg-yellow-500 hover:text-white px-4 py-2 text-yellow-500 lg:text-dark-soft"
                                            >
                                                Profile Page
                                            </button>
                                            <button
                                                onClick={logoutHandler}
                                                type="button"
                                                className="hover:bg-yellow-500 hover:text-white px-4 py-2 text-yellow-500 lg:text-dark-soft"
                                            >
                                                Logout
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className='border-2 border-yellow-500 px-6 py-2 rounded-full text-yellow-500 font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-300'
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </header>
        </section>
    )
}

export default Header;