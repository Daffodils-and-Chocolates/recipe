import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";

import { images } from '../../constants/index'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ email, password }) => {
            return login({ email, password });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange"
    });

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password });
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };


    return (
        <section className="flex w-full h-screen">
            <div className="basis-1/4 m-auto flex flex-col">
                <Link className="max-w-max mx-auto md:mx-0" to="/">
                    <div className="flex gap-1.5 items-center">
                        <img src={images.Logo} alt='logo' />
                    </div>
                </Link>
                <div className="mt-12 mb-6 flex flex-col gap-3">
                    <h2 className="text-center md:text-left font-bold text-3xl">Welcome Back</h2>
                    <p className="text-center md:text-left text-sm gap-1">Don't have an account?
                        <Link to="/register" className="text-yellow-500 font-semibold px-1">Sign up</Link>
                    </p>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
                    <div className="flex flex-col relative">
                        <label htmlFor="email" className="text-sm font-semibold mb-3">Email</label>
                        <span className="absolute top-[39px] left-3 bg-light p-1 rounded text-yellow-500">
                            <img src={images.emailIcon} alt="emailIcon" />
                        </span>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                pattern: {
                                    value:
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Enter a valid email",
                                },
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                            })}
                            required=""
                            placeholder="example@abc.com"
                            className={`py-1.5 px-11 border bg-gray-100 rounded-lg focus:outline outline-yellow-500 ${errors.email ? "border-red-500" : "border-[#c3cad9]"
                                }`}
                        />
                        {errors.email?.message && (
                            <span id="email-error" className="text-red-500 pl-2 text-sm mt-1" >
                                {errors.email?.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col relative">
                        <label htmlFor="password" className="text-sm font-semibold mb-3">Password</label>
                        <span className="absolute top-[39px] left-3 bg-light p-1 rounded text-yellow-500">
                            <img src={images.lockIcon} alt="lockicon" />
                        </span>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Password length must be at least 6 characters",
                                },
                            })}
                            placeholder="At least 6 characters long"
                            className={`py-1.5 px-11 border bg-gray-100 rounded-lg focus:outline outline-yellow-500 ${errors.password ? "border-red-500" : "border-[#c3cad9]"
                                }`}
                        />
                        {passwordVisible ? (
                            <FaRegEyeSlash
                                onClick={togglePasswordVisibility}
                                className="absolute top-[42px] right-3 cursor-pointer text-gray-700 text-lg"
                                height="1em"
                                width="1em"
                            />
                        ) : (
                            <IoEyeOutline
                                onClick={togglePasswordVisibility}
                                className="absolute top-[42px] right-3 cursor-pointer text-gray-700 text-lg"
                                height="1em"
                                width="1em"
                            />
                        )}
                        {errors.password?.message && (
                            <span id="password-error" className="text-red-500 pl-2 text-sm mt-1">
                                {errors.password?.message}
                            </span>
                        )}
                    </div>
                    <button
                        disabled={!isValid || isLoading}
                        type="submit"
                        className="bg-yellow-500 cursor-pointer hover:bg-yellow-500 text-[#fff] py-2 px-5 shadow-lg font-semibold flex items-center justify-center gap-2 max-h-max text-center mt-5 rounded-lg" tabIndex="0" style={{ transform: 'none' }}
                    >
                        Sign in
                    </button>
                </form>
                <Link to="/forget-password" className="text-yellow-500 font-semibold px-1">Forgot Password?</Link>
            </div>
            <div className={`hidden md:block basis-1/2 bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(${images.registerImage})` }} />
        </section>
    )
}

export default LoginPage;