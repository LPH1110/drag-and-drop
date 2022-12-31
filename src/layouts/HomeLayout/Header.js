import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button, PopperWrapper } from '~/components';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useStore, actions } from '~/store';
import { UserAuth } from '~/contexts/AuthContext';

function Header() {
    const { user, logOut } = UserAuth();
    const [userMenuActions, setUserMenuActions] = useState([
        {
            id: uuidv4(),
            title: 'Profile',
            icon: <UserCircleIcon />,
            to: '/Profile',
        },
        {
            id: uuidv4(),
            title: 'Settings',
            icon: <Cog6ToothIcon />,
            to: '/settings',
        },
        {
            id: uuidv4(),
            title: 'Get help',
            icon: <QuestionMarkCircleIcon />,
            to: '/helps',
        },
        {
            id: uuidv4(),
            title: 'Sign out',
            topDivider: true,
            icon: <ArrowRightOnRectangleIcon />,
            onClick() {
                logOut();
                dispatch(actions.setUserSession({ loggedIn: false, info: {} }));
                localStorage.removeItem('account_id');
            },
        },
    ]);
    const [state, dispatch] = useStore();
    const navigate = useNavigate();
    const headerRef = useRef();

    const getStarted = () => {
        if (user) {
            navigate('/workspaces');
        } else {
            navigate('/signin');
        }
    };

    useEffect(() => {
        const handleWindowScroll = (e) => {
            if (window.scrollY > 20) {
                headerRef.current.classList.add('shadow-lg');
            } else {
                headerRef.current.classList.remove('shadow-lg');
            }
        };
        window.addEventListener('scroll', handleWindowScroll);
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className="ease-in-out duration-300 bg-white z-[10000] fixed top-0 inset-x-0 border-b border-slate-200 h-20 col-span-12 px-12 flex items-center justify-between"
        >
            <div className="flex items-center">
                <Button size="small" href="/" className="flex mr-2">
                    <span className="font-semibold text-4xl text-blue-600">T</span>
                    <p className="text-xl">askbox</p>
                </Button>
                <div className="flex items-center">
                    <Button
                        size="small"
                        className="text-slate-500 hover:text-blue-500 ease duration-200"
                        rightIcon={<ChevronDownIcon className="w-4 h-4" />}
                    >
                        Product
                    </Button>
                    <Button
                        size="small"
                        className="text-slate-500 hover:text-blue-500 ease duration-200"
                        rightIcon={<ChevronDownIcon className="w-4 h-4" />}
                    >
                        Solutions
                    </Button>
                    <Button
                        size="small"
                        className="text-slate-500 hover:text-blue-500 ease duration-200"
                        rightIcon={<ChevronDownIcon className="w-4 h-4" />}
                    >
                        Resources
                    </Button>
                    <Button size="small">
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'text-blue-500' : 'text-slate-500 hover:text-blue-500 ease duration-200'
                            }
                            end
                            to="/enterprise"
                        >
                            Enterprise
                        </NavLink>
                    </Button>
                    <Button size="small">
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'text-blue-500' : 'text-slate-500 hover:text-blue-500 ease duration-200'
                            }
                            to="/pricing"
                        >
                            Pricing
                        </NavLink>
                    </Button>
                </div>
            </div>
            <div className="flex items-center">
                {user ? (
                    <PopperWrapper placement="bottom-end" right userMenuActions={userMenuActions}>
                        <div className="avatar p-1 rounded-full hover:bg-blue-100 ease-in-out duration-200 cursor-pointer">
                            <div className="w-10 rounded-full">
                                <img src="https://res.cloudinary.com/dzzv49yec/image/upload/v1670050964/taskbox-assets/avatar1_ilyzbz.jpg" />
                            </div>
                        </div>
                    </PopperWrapper>
                ) : (
                    <>
                        <Button
                            to="/signin"
                            className="text-slate-700 hover:text-blue-500 font-semibold ease-in-out duration-200"
                            size="small"
                        >
                            Login
                        </Button>
                        <Button
                            size="medium"
                            type="button"
                            onClick={getStarted}
                            className="bg-blue-500 font-semibold text-white hover:bg-blue-400 ease-in-out duration-200"
                        >
                            Get Started
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
