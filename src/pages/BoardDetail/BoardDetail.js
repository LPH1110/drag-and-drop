import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
    QuestionMarkCircleIcon,
    StarIcon as StarIconOutline,
    BellIcon,
    ChevronDownIcon,
    ShareIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Tab } from '@headlessui/react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './BoardDetail.module.scss';

import { Board, Button, Tooltip } from '~/components';
import { useStore, actions } from '~/store';
import { useState } from 'react';
import { useRef } from 'react';

const cx = classNames.bind(styles);

const tabs = [
    {
        id: uuidv4(),
        title: 'Canban',
    },
    {
        id: uuidv4(),
        title: 'Timeline',
    },
    {
        id: uuidv4(),
        title: 'Calendar',
    },
];

function BoardDetail() {
    const [state, dispatch] = useStore();
    const { boards } = state;
    const { id } = useParams();
    const board = boards[id];
    const [boardTitle, setBoardTitle] = useState(board ? board.title : '');
    const handleOnChangeTitle = () => {
        dispatch(actions.onChangeBoardTitle({ boardId: id, value: boardTitle }));
    };

    const handleChangeFavor = () => {
        dispatch(actions.changeBoardFavor({ boardId: id, favor: !board.favor || false }));
    };

    return (
        <section className="w-full h-screen overflow-y-auto">
            {/* Header */}
            <section className="p-6 min-h-[5rem] flex items-center justify-between">
                {/* Left heading */}
                <div>
                    <div className="mb-2">
                        <input
                            onBlur={handleOnChangeTitle}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            className="caret-blue-500 ease duration-200 outline-none ring ring-transparent rounded-md p-1 -m-1 hover:ring-blue-400 focus:ring-blue-400 text-2xl font-semibold"
                            value={boardTitle}
                        />
                    </div>
                    <div className="flex items-center text-slate-500">
                        <p>Description of your project what do want to do</p>
                        <Tooltip message="You could modify the description later">
                            <span className="mx-2">
                                <QuestionMarkCircleIcon className="w-5 h-5" />
                            </span>
                        </Tooltip>
                        <Button type="button" onClick={handleChangeFavor}>
                            <span>
                                {board && !board.favor ? (
                                    <StarIconOutline className="w-5 h-5" />
                                ) : (
                                    <StarIconSolid className="w-5 h-5 text-yellow-400" />
                                )}
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Right heading */}
                <div className="flex items-center">
                    {/* Avatar Group */}
                    <Button type="button" className="mr-3">
                        <div className="avatar-group -space-x-4">
                            <div className="avatar">
                                <div className="w-9">
                                    <img src="https://res.cloudinary.com/dzzv49yec/image/upload/v1670092118/taskbox-assets/avatar4_n1nbbs.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-9">
                                    <img src="https://res.cloudinary.com/dzzv49yec/image/upload/v1670092118/taskbox-assets/avatar2_fssdbw.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-9">
                                    <img src="https://res.cloudinary.com/dzzv49yec/image/upload/v1670092118/taskbox-assets/avatar3_clufwp.jpg" />
                                </div>
                            </div>
                            <div className="avatar placeholder">
                                <div className="w-9 bg-blue-100 text-blue-600 font-semibold">
                                    <span>+99</span>
                                </div>
                            </div>
                        </div>
                    </Button>
                    {/* Sharing */}
                    <div>
                        <Button
                            className="hover:bg-blue-100/30 py-2 hover:text-blue-500  ease-in-out duration-200 bg-blue-100/50 text-blue-600 font-semibold rounded-md"
                            type="button"
                            size="small"
                            leftIcon={<ShareIcon className="w-4 h-4" />}
                        >
                            Share
                        </Button>
                    </div>
                    {/* Notify */}
                    <Button
                        type="button"
                        className="mx-5 relative hover:bg-slate-100 hover:text-slate-500 ease-in-out duration-200 p-2 rounded-full border border-slate-100 text-slate-400"
                    >
                        <BellIcon className="w-5 h-5" />
                        <span className="px-2 rounded-full bg-red-400 font-semibold text-slate-100 absolute -top-[30%] -right-[30%]">
                            3
                        </span>
                    </Button>
                    {/* Avatar menu */}
                    <button
                        type="button"
                        className="hover:bg-slate-100 p-1 ease-in-out duration-200 rounded-full flex items-center"
                    >
                        <figure className="w-9 h-9">
                            <img
                                className="rounded-full"
                                src="https://res.cloudinary.com/dzzv49yec/image/upload/v1670050964/taskbox-assets/avatar1_ilyzbz.jpg"
                                alt="avatar"
                            />
                        </figure>
                        <span className="ml-2">
                            <ChevronDownIcon className="w-5 h-5 text-slate-400" />
                        </span>
                    </button>
                </div>
            </section>
            {/* Navigations */}
            <section className="p-6 mb-6 relative">
                <Tab.Group>
                    <Tab.List className="mb-3 py-2 border-t border-slate-100">
                        <div className="inline-block relative">
                            {tabs.map((tab) => (
                                <Tab
                                    className={cx(
                                        'tab',
                                        'ui-selected:text-slate-700 relative text-slate-300 py-2 px-3 outline-none font-semibold ease duration-200',
                                    )}
                                    key={tab.id}
                                >
                                    {({ selected }) =>
                                        selected ? (
                                            <>
                                                <h4>{tab.title}</h4>
                                                <div className="animate-span-from-left h-1 left-0 -bottom-[5%] right-0 absolute bg-blue-500 rounded-xl"></div>
                                            </>
                                        ) : (
                                            <h4>{tab.title}</h4>
                                        )
                                    }
                                </Tab>
                            ))}
                        </div>
                        <div className="py-4 flex items-center justify-between">
                            <div>Filters</div>
                            <div className="flex items-center">
                                <div className="flex items-center p-2.5 bg-slate-100 rounded-md text-slate-600">
                                    <span className="mr-2">
                                        <MagnifyingGlassIcon className="w-5 h-5" />
                                    </span>
                                    <input placeholder="Search something..." className="bg-transparent outline-none" />
                                </div>
                                <Button
                                    className="h-full ml-4 rounded-md bg-blue-100 text-blue-500 font-semibold hover:bg-blue-100/70 hover:text-blue-500/70 ease-in-out duration-200"
                                    size="medium"
                                    leftIcon={<PlusIcon className="w-5 h-5" />}
                                >
                                    Add task
                                </Button>
                            </div>
                        </div>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel className="absolute left-0 right-0">
                            <Board />
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>Timeline panel</div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>Calendar panel</div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </section>
        </section>
    );
}

export default BoardDetail;
