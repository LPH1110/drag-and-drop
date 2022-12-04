import React from 'react';
import { useParams } from 'react-router-dom';
import {
    QuestionMarkCircleIcon,
    StarIcon as StarIconOutline,
    BellIcon,
    ChevronDownIcon,
    ShareIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

import { Board, Button, Tooltip } from '~/components';
import { useStore, actions } from '~/store';
import { useState } from 'react';
import { useRef } from 'react';

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
        dispatch(actions.changeBoardFavor({ boardId: id, favor: !board.favor }));
    };

    return (
        <div className="w-full">
            <div className="p-4 mb-8 min-h-[5rem] flex items-center justify-between">
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
                                {!board.favor ? (
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
            </div>
            <Board />
        </div>
    );
}

export default BoardDetail;
