import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const headerRef = useRef();

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
                <Button
                    to="/login"
                    className="text-slate-700 hover:text-blue-500 font-semibold ease-in-out duration-200"
                    size="small"
                >
                    Login
                </Button>
                <Button
                    size="medium"
                    type="button"
                    onClick={() => navigate('/workspaces')}
                    className="bg-blue-500 font-semibold text-white hover:bg-blue-400 ease-in-out duration-200"
                >
                    Get Started
                </Button>
            </div>
        </header>
    );
}

export default Header;
