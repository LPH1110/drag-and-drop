import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { collection, where, onSnapshot, query } from 'firebase/firestore';
import { db } from '~/firebase-config';

import { Button, Spinner, Tooltip, Toast } from '~/components';
import OTP from './OTP';
import { useStore, actions } from '~/store';

const emailjs_service_id = 'service_7h1hbr1';
const emailjs_template_id = 'template_3fq68xe';
const emailjs_public_key = 'A3Uj8TuJqV8IVObAM';

function Signup() {
    const [state, dispatch] = useStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [forward, setForward] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState({
        message: '',
        status: '',
    });
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
    });
    const passwordInputRef = useRef();
    const passwordConfirmationRef = useRef();
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
        passwordInputRef.current.focus();
    };

    const handleShowPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
        passwordInputRef.current.focus();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },

        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email address').required('Required field'),
            password: Yup.string().min(8).required('Required field'),
            passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match'),
        }),

        onSubmit: (data) => {
            setShowLoading(true);
            setSignupData({ email: data.email, password: data.password });

            // Check if account existed
            const q = query(collection(db, 'accounts'), where('email', '==', data.email));
            onSnapshot(q, async (snapshot) => {
                if (snapshot.docs.length > 0) {
                    setToastBody({ message: 'This email already existed', status: 'error' });

                    setTimeout(() => {
                        setShowToast(true);
                        setShowLoading(false);
                    }, 1000);
                    setTimeout(() => setShowToast(false), 3000);
                } else {
                    // Create account
                    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
                    dispatch(actions.setOTPcode(otpCode));

                    try {
                        const res = await emailjs.send(
                            emailjs_service_id,
                            emailjs_template_id,
                            {
                                from_name: 'Taskbox Founder',
                                to_email: data.email,
                                to_name: 'taskboxer',
                                message: otpCode,
                            },
                            emailjs_public_key,
                        );
                        console.log('SENT SUCCESS!', res.status, res.text);
                    } catch (e) {
                        console.log('SENT FAILED...', e);
                    }

                    setShowLoading(false);

                    setForward(true);
                }
            });
        },
    });

    return (
        <section className="h-screen grid grid-cols-2 relative">
            <section className="flex items-center justify-center">
                <section className="w-[60%] flex flex-col items-start justify-between">
                    {forward ? (
                        <div className="w-full mt-8">
                            <OTP signupData={signupData} />
                        </div>
                    ) : (
                        <div className="w-full mt-8">
                            <div className="py-4 mb-4">
                                <h1 className="mb-1 text-slate-700 font-semibold text-3xl">Create a new account</h1>
                                <p className="text-slate-500">Just a few steps to become a taskboxer</p>
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
                                    <label className="text-slate-600 font-semibold" htmlFor="password">
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
                                <section className="flex flex-col">
                                    <label className="text-slate-600 font-semibold" htmlFor="passwordConfirmation">
                                        Repeat Password
                                    </label>
                                    <div
                                        ref={passwordConfirmationRef}
                                        className="flex items-center my-2 border border-slate-200 p-2 ring ring-transparent focus-within:ring-blue-500 rounded-md ease duration-200"
                                    >
                                        <input
                                            className="outline-none w-full"
                                            name="passwordConfirmation"
                                            id="passwordConfirmation"
                                            value={formik.values.passwordConfirmation}
                                            onChange={formik.handleChange}
                                            type={showPasswordConfirmation ? 'text' : 'password'}
                                        />
                                        {formik.values.passwordConfirmation.length > 0 && (
                                            <span
                                                onClick={handleShowPasswordConfirmation}
                                                className="p-1 text-slate-600 hover:text-slate-500 ease duration-200"
                                            >
                                                {showPasswordConfirmation ? (
                                                    <EyeSlashIcon className="w-4 h-4" />
                                                ) : (
                                                    <EyeIcon className="w-4 h-4" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                                        <span className="text-red-400">{formik.errors.passwordConfirmation}</span>
                                    ) : null}
                                </section>

                                <Button
                                    size="large"
                                    leftIcon={showLoading ? <Spinner className="w-5 h-5" /> : null}
                                    className="mt-4 w-full font-semibold bg-blue-500 text-white hover:bg-blue-400 ease-in-out duration-200"
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                                <div className="divider">OR</div>
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
                                    Already have an account?
                                    <button
                                        type="button"
                                        onClick={() => navigate('/signin')}
                                        className="hover:underline ml-2 text-blue-500 hover:text-blue-400 ease duration-200"
                                    >
                                        Sign in here
                                    </button>
                                </p>
                            </form>
                        </div>
                    )}
                </section>
            </section>
            <section className="bg-blue-500"></section>
            <Tooltip placement="right-start" message="Go back to home">
                <Button
                    className="my-4 ease duration-200 text-slate-400 hover:text-slate-700 absolute top-0 left-0"
                    size="small"
                    type="button"
                    to="/"
                >
                    <ArrowLeftOnRectangleIcon className="w-7 h-7" />
                </Button>
            </Tooltip>
            {showToast && <Toast placement="bottom-end" message={toastBody.message} status={toastBody.status} />}
        </section>
    );
}

export default Signup;
