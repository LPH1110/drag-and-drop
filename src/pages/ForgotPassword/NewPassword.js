import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { doc, updateDoc, query, onSnapshot, collection, where } from 'firebase/firestore';
import { db } from '~/firebase-config';
import bcrypt from 'bcryptjs';

import { Button, Spinner } from '~/components';
import { useStore } from '~/store';

function NewPassword({ typedEmail, setToast }) {
    const [state, dispatch] = useStore();
    const { OTPcode } = state;
    const navigate = useNavigate();

    const [showSpinner, setShowSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const newPasswordInputRef = useRef();
    const repeatNewPasswordRef = useRef();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
        newPasswordInputRef.current.focus();
    };

    const handleShowRepeatPassword = () => {
        setShowRepeatPassword(!showRepeatPassword);
        repeatNewPasswordRef.current.focus();
    };

    const formik = useFormik({
        initialValues: {
            otpCode: '',
            newPassword: '',
            repeatNewPassword: '',
        },

        validationSchema: Yup.object().shape({
            otpCode: Yup.string().oneOf([OTPcode], "OTP doesn't match").min(4, 'Too short!').required('Required field'),
            newPassword: Yup.string().min(8, 'At least 8 characters long').required('Required field'),
            repeatNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Password must match'),
        }),

        onSubmit(data) {
            const changePassword = async () => {
                try {
                    let accountId;
                    if (localStorage.getItem('account_id')) {
                        accountId = localStorage.getItem('account_id');
                    } else {
                        const q = query(collection(db, 'accounts'), where('email', '==', typedEmail));
                        onSnapshot(q, (snapshot) => {
                            snapshot.docs.forEach((doc) => {
                                accountId = doc.id;
                            });
                        });
                    }
                    const docRef = doc(db, 'accounts', accountId);
                    bcrypt.hash(data.newPassword, 10, async (err, hash) => {
                        const res = await updateDoc(docRef, { password: hash });
                    });
                    setToast({
                        onShow: true,
                        body: {
                            message: 'You have successfully changed password',
                            status: 'success',
                        },
                    });
                    setTimeout(() => {
                        navigate('/signin');
                    }, 2000);
                } catch (e) {
                    console.error('Failed to update document!');
                }
            };

            setShowSpinner(true);
            changePassword();
            setShowSpinner(false);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <section className="flex flex-col mb-2">
                <label className="text-slate-600 font-semibold" htmlFor="otpCode">
                    Verification code
                </label>
                <input
                    className={`my-2 border border-slate-200 p-2 ring ring-transparent ${
                        formik.errors.otpCode ? 'ring-red-400' : 'focus:ring-blue-500'
                    } outline-none rounded-md ease duration-200`}
                    name="otpCode"
                    id="otpCode"
                    type="text"
                    value={formik.values.otpCode}
                    onChange={formik.handleChange}
                />
                {formik.errors.otpCode ? <span className="text-red-400">{formik.errors.otpCode}</span> : null}
            </section>
            <section className="flex flex-col">
                <label className="text-slate-600 font-semibold" htmlFor="newPassword">
                    New Password
                </label>
                <div
                    ref={newPasswordInputRef}
                    className="flex items-center my-2 border border-slate-200 p-2 ring ring-transparent focus-within:ring-blue-500 rounded-md ease duration-200"
                >
                    <input
                        className="outline-none w-full"
                        name="newPassword"
                        id="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        type={showPassword ? 'text' : 'password'}
                    />
                    {formik.values.newPassword.length > 0 && (
                        <span
                            onClick={handleShowPassword}
                            className="p-1 text-slate-600 hover:text-slate-500 ease duration-200"
                        >
                            {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                        </span>
                    )}
                </div>
                {formik.errors.newPassword ? <span className="text-red-400">{formik.errors.newPassword}</span> : null}
            </section>
            <section className="flex flex-col">
                <label className="text-slate-600 font-semibold" htmlFor="repeatNewPassword">
                    Repeat Password
                </label>
                <div
                    ref={repeatNewPasswordRef}
                    className="flex items-center my-2 border border-slate-200 p-2 ring ring-transparent focus-within:ring-blue-500 rounded-md ease duration-200"
                >
                    <input
                        className="outline-none w-full"
                        name="repeatNewPassword"
                        id="repeatNewPassword"
                        value={formik.values.repeatNewPassword}
                        onChange={formik.handleChange}
                        type={showRepeatPassword ? 'text' : 'password'}
                    />
                    {formik.values.repeatNewPassword.length > 0 && (
                        <span
                            onClick={handleShowRepeatPassword}
                            className="p-1 text-slate-600 hover:text-slate-500 ease duration-200"
                        >
                            {showRepeatPassword ? (
                                <EyeSlashIcon className="w-4 h-4" />
                            ) : (
                                <EyeIcon className="w-4 h-4" />
                            )}
                        </span>
                    )}
                </div>
                {formik.errors.repeatNewPassword ? (
                    <span className="text-red-400">{formik.errors.repeatNewPassword}</span>
                ) : null}
            </section>
            <Button
                size="large"
                className="mt-4 w-full font-semibold bg-blue-500 text-white hover:bg-blue-400 ease-in-out duration-200"
                type="submit"
                leftIcon={showSpinner ? <Spinner className="w-5 h-5" /> : null}
            >
                Change password
            </Button>
        </form>
    );
}

export default NewPassword;
