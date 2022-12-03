import React from 'react';
import { useParams } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import { Board, Button } from '~/components';
import { useStore } from '~/store';

function BoardDetail() {
    const [state, dispatch] = useStore();
    const { boards } = state;
    const { id } = useParams();
    const board = boards[id];

    return (
        <div className="w-full">
            <div className="px-4 mb-8 min-h-[5rem] flex items-center justify-between">
                <div>
                    <h1>{board.title}</h1>
                </div>
                <div className="flex items-center">
                    <Button
                        type="button"
                        className="hover:bg-slate-100 hover:text-slate-500 ease-in-out duration-200 p-2 rounded-full border border-slate-100 text-slate-400"
                    >
                        <BellIcon className="w-5 h-5" />
                    </Button>
                    <button type="button" className="flex items-center ml-6">
                        <figure className="w-10 h-10">
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
