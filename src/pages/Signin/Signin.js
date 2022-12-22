import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

function Signin() {
    const [rememberChecked, setRememberChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const handleRememberChecked = () => {
        setRememberChecked(!rememberChecked);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
        passwordInputRef.current.focus();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email address').required('Required field'),
            password: Yup.string().min(8).required('Required field'),
        }),

        onSubmit: (data) => {
            console.log(data);
        },
    });

    return (
        <section className="h-screen grid grid-cols-2">
            <section className="flex items-center justify-center">
                <section className="w-[60%] flex flex-col items-start justify-between">
                    <div className="w-full mt-8">
                        <div className="py-4 mb-4">
                            <h1 className="mb-1 text-slate-700 font-semibold text-3xl">Sign in</h1>
                            <p className="text-slate-500">Welcome back! Please enter your details</p>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <section className="flex flex-col mb-2">
                                <label className="text-slate-600 font-semibold" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className={`my-2 border border-slate-200 p-2 ring ring-transparent ${
                                        formik.errors.email ? 'ring-red-400' : 'focus:ring-blue-500'
                                    } outline-none rounded-md ease duration-200`}
                                    name="email"
                                    id="email"
                                    type="text"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your email"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <span className="text-red-400">{formik.errors.email}</span>
                                ) : null}
                            </section>
                            <section className="flex flex-col">
                                <label className="text-slate-600 font-semibold" htmlFor="email">
                                    Password
                                </label>
                                <div
                                    ref={passwordInputRef}
                                    className="flex items-center my-2 border border-slate-200 p-2 ring ring-transparent focus-within:ring-blue-500 rounded-md ease duration-200"
                                >
                                    <input
                                        className="outline-none w-full"
                                        name="password"
                                        id="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                    {formik.values.password.length > 0 && (
                                        <span
                                            onClick={handleShowPassword}
                                            className="p-1 text-slate-600 hover:text-slate-500 ease duration-200"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="w-4 h-4" />
                                            ) : (
                                                <EyeIcon className="w-4 h-4" />
                                            )}
                                        </span>
                                    )}
                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <span className="text-red-400">{formik.errors.password}</span>
                                ) : null}
                            </section>
                            <div className="flex justify-between items-center my-4">
                                <div>
                                    <label className="flex items-center relative">
                                        <input
                                            className="absolute inset-0 cursor-pointer opacity-0"
                                            type="checkbox"
                                            onChange={handleRememberChecked}
                                        />
                                        {rememberChecked ? (
                                            <Button
                                                type="button"
                                                className="p-1 mr-2 border border-slate-200 rounded-md bg-blue-500 hover:bg-blue-400 ease-in-out duration-200 text-white font-bold"
                                            >
                                                <CheckIcon className="w-3 h-3" />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                className="p-1 mr-2 border border-slate-200 rounded-md bg-white hover:bg-slate-100 ease-in-out duration-200"
                                            >
                                                <span className="w-3 h-3"></span>
                                            </Button>
                                        )}
                                        <span className="text-slate-500">Remember for 30 days</span>
                                    </label>
                                </div>
                                <div>
                                    <Button className="text-blue-500 hover:text-blue-400 ease duration-200">
                                        Forgot password
                                    </Button>
                                </div>
                            </div>
                            <Button
                                size="large"
                                className="mt-4 w-full font-semibold bg-blue-500 text-white hover:bg-blue-400 ease-in-out duration-200"
                                type="submit"
                            >
                                Sign in
                            </Button>
                            <div>
                                <Button
                                    size="large"
                                    leftIcon={
                                        <img
                                            className="w-5 h-5"
                                            src="https://res.cloudinary.com/dzzv49yec/image/upload/v1671615696/taskbox-assets/google_f8flbm.png"
                                            alt="Google"
                                        />
                                    }
                                    className="mx-0 mt-4 w-full text-slate-600 hover:bg-slate-100 border boder-slate-200 ease-in-out duration-200"
                                    type="button"
                                >
                                    Sign in with Google
                                </Button>
                            </div>
                            <p className="text-center py-4">
                                Don't have an account?
                                <button
                                    type="button"
                                    onClick={() => navigate('/signup')}
                                    className="hover:underline ml-2 text-blue-500 hover:text-blue-400 ease duration-200"
                                >
                                    Sign up
                                </button>
                            </p>
                        </form>
                    </div>
                </section>
            </section>
            <section className="bg-blue-500"></section>
        </section>
    );
}

export default Signin;
