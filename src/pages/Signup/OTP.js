import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Button, Toast, Spinner } from '~/components';
import CountDown from './CountDown';
import { useStore } from '~/store';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '~/firebase-config';

const initialOtp = {
    [uuidv4()]: {
        value: '',
    },
    [uuidv4()]: {
        value: '',
    },
    [uuidv4()]: {
        value: '',
    },
    [uuidv4()]: {
        value: '',
    },
};

function OTP({ signupData }) {
    const [state, dispatch] = useStore();
    const { OTPcode } = state;
    const [otp, setOtp] = useState(initialOtp);
    const [error, setError] = useState('');
    const [showTimer, setShowTimer] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState({
        message: '',
        status: '',
    });
    const [showLoading, setShowLoading] = useState(false);
    const navigate = useNavigate();
    const [timeoutNavigate, setTimeoutNavigate] = useState('');
    const [timeoutToast, setTimeoutToast] = useState('');

    useEffect(() => {
        return () => {
            clearTimeout(timeoutToast);
            clearTimeout(timeoutNavigate);
        };
    }, []);

    const validateOTP = () => {
        let result = '';
        let errorMessage = '';
        let index = 0;

        Object.entries(otp).forEach(([id, data]) => {
            if (data.value === '' || parseInt(data.value) != parseInt(OTPcode[index++])) {
                errorMessage = 'OTP miss match';
                return setError(errorMessage);
            } else {
                result += data.value;
            }
        });

        if (!errorMessage) {
            bcrypt.hash(signupData.password, 10, (err, hash) => {
                const storeData = async () => {
                    try {
                        const res = await addDoc(collection(db, 'accounts'), {
                            email: signupData.email,
                            password: hash,
                        });
                        console.log('Saved data successfully!');
                    } catch (e) {
                        console.error("Can't store sign up data");
                    }
                };
                storeData();
            });
            setToastBody({
                message: 'Create your new account successfully',
                status: 'success',
            });
            setShowLoading(true);
            setShowToast(true);

            setTimeoutToast(
                setTimeout(() => {
                    setShowToast(false);
                    setShowLoading(false);
                }, 3000),
            );

            setTimeoutNavigate(
                setTimeout(() => {
                    navigate('/signin');
                }, 5000),
            );
        }
    };

    const handleTimer = () => {
        setShowTimer(true);
        setTimeout(() => {
            setShowTimer(false);
        }, 60000);
    };

    const handleChange = (element, dataId) => {
        if (isNaN(element.value)) return false;

        setError('');

        setOtp({
            ...otp,
            [dataId]: {
                value: element.value,
            },
        });

        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };
    return (
        <div className="">
            <div className="py-4 mb-4">
                <h1 className="mb-1 text-slate-700 font-semibold text-3xl">Account activation</h1>
                <p className="text-slate-500">We have sent an OTP code to verify your account</p>
            </div>
            <div className="grid grid-cols-4 gap-x-6">
                {Object.entries(otp).map(([id, data]) => (
                    <input
                        className="text-center text-2xl py-2 outline-none ring ring-transparent focus:ring-blue-500 focus:bg-slate-100 ease duration-200 bg-slate-200 rounded-xl"
                        key={id}
                        value={data.value}
                        maxLength={1}
                        onChange={(e) => handleChange(e.target, id)}
                    />
                ))}
            </div>
            <p className="my-4 text-slate-500">
                Didn't receive code?
                {showTimer ? (
                    <CountDown />
                ) : (
                    <button
                        onClick={handleTimer}
                        type="button"
                        className="hover:text-sky-400 ease duration-200 text-sky-500 ml-2"
                    >
                        Send again
                    </button>
                )}
            </p>
            <div className="flex items-center justify-end">
                {error && <span className="text-red-400 mr-2">{error}</span>}
                <Button
                    type="button"
                    size="medium"
                    leftIcon={showLoading ? <Spinner className="w-5 h-5" /> : null}
                    className="bg-blue-500 text-white hover:bg-blue-400 ease-in-out duration-200"
                    onClick={validateOTP}
                >
                    Activate account
                </Button>
            </div>

            {showToast && <Toast placement="bottom-end" message={toastBody.message} status={toastBody.status} />}
        </div>
    );
}

export default OTP;
