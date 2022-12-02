import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import {
    ArrowPathRoundedSquareIcon,
    CalendarDaysIcon,
    ChatBubbleOvalLeftIcon,
    Squares2X2Icon,
    DocumentTextIcon,
    ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { Button } from '~/components';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const menuItems = [
    {
        id: uuidv4(),
        title: 'Overview',
        icon: <Squares2X2Icon className="w-5 h-5" />,
        path: '/overview',
    },
    {
        id: uuidv4(),
        title: 'Workspaces',
        icon: <ClipboardDocumentIcon className="w-5 h-5" />,
        path: '/workspaces',
    },
    {
        id: uuidv4(),
        title: 'Inbox',
        icon: <ChatBubbleOvalLeftIcon className="w-5 h-5" />,
        path: '/inbox',
    },
    {
        id: uuidv4(),
        title: 'Meeting',
        icon: <CalendarDaysIcon className="w-5 h-5" />,
        path: '/meeting',
    },
    {
        id: uuidv4(),
        title: 'Issues',
        icon: <ArrowPathRoundedSquareIcon className="w-5 h-5" />,
        path: '/issues',
    },
];

function Sidebar() {
    const [menu, setMenu] = useState(menuItems);

    return (
        <div className="h-full flex flex-col justify-between">
            {/* Heading */}
            <section className="flex items-center justify-between">
                <a href="/" className="flex items-end">
                    <span className="font-semibold text-4xl text-blue-600">T</span>
                    <p className="text-2xl">askbox</p>
                </a>
                <Button
                    className="p-1 rounded-full border border-slate-300 text-slate-700 hover:border-slate-300/70 hover:text-slate-600 ease duration-200"
                    type="button"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </Button>
            </section>
            {/* Menu */}
            <section>
                <div>
                    {menu.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) => {
                                let classes = '';
                                if (isActive) {
                                    classes =
                                        'text-slate-900 border-t border-transparent py-3 flex items-center font-semibold ease duration-200';
                                } else {
                                    classes =
                                        'text-slate-300 border-t border-transparent py-3 flex items-center font-semibold ease duration-200';
                                }
                                return cx('menuItem', classes);
                            }}
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.title}
                        </NavLink>
                    ))}
                </div>
            </section>
            {/* Support */}
            <section className="flex flex-col items-center">
                <div>
                    <QuestionMarkCircleIcon className="w-10 h-10 text-emerald-500" />
                </div>
                <div className="text-center mb-4 py-4">
                    <h4 className="font-semibold text-md">Help & Support</h4>
                    <p className="text-slate-500 text-sm">Get started with taskbox if you're having trouble</p>
                </div>
                <Button
                    size="medium"
                    className="text-blue-600 bg-blue-200 font-semibold rounded-sm hover:bg-blue-200/70 ease-in-out duration-200"
                >
                    Get Started
                </Button>
            </section>
        </div>
    );
}

export default Sidebar;
