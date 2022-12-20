import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BoardPanel.module.scss';

import { Button } from '~/components';
import { useStore, actions } from '~/store';

const cx = classNames.bind(styles);

function BoardPanel({ data }) {
    const [forward, setForward] = useState(false);
    const [state, dispatch] = useStore();

    const handleCloseBoard = () => {
        dispatch(actions.changeBoardStatus({ boardId: data.id, closed: true }));
    };

    return (
        <section className="min-w-[16rem]">
            {!forward ? (
                <div>
                    <div className="pt-2 pb-3 border-b border-slate-300 mb-2 relative flex justify-items-center">
                        <h4 className={cx('title', 'w-full font-semibold')}>{data.title}</h4>
                        <Button type="button" className="text-slate-500 hover:text-slate-400 ease duration-200">
                            <XMarkIcon className="w-5 h-5" />
                        </Button>
                    </div>
                    <button
                        type="button"
                        size="large"
                        onClick={() => setForward(true)}
                        className="w-full text-left p-2 rounded-md flex justify-between items-center hover:bg-slate-100/50 ease-in-out duration-200"
                    >
                        Close board
                        <span className="text-slate-500/70">
                            <ChevronRightIcon className="w-5 h-5" />
                        </span>
                    </button>
                </div>
            ) : (
                <div>
                    <div className="pt-2 pb-3 border-b border-slate-300 mb-2 relative flex justify-items-center">
                        <Button
                            type="button"
                            onClick={() => setForward(false)}
                            className="text-slate-500 hover:text-slate-400 ease duration-200"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </Button>
                        <h4 className="w-full font-semibold">Close board ?</h4>
                        <Button type="button" className="text-slate-500 hover:text-slate-400 ease duration-200">
                            <XMarkIcon className="w-5 h-5" />
                        </Button>
                    </div>
                    <div>
                        <p className="text-left py-2 my-3 text-slate-500">
                            You can find and reopen closed boards at the bottom of
                            <Link
                                className="ml-1 text-sky-500 hover:text-sky-400 ease duration-200 underline"
                                to="/workspaces"
                            >
                                your boards page
                            </Link>
                        </p>
                        <Button
                            type="button"
                            size="medium"
                            onClick={handleCloseBoard}
                            className="my-2 w-full py-2 bg-red-400 text-slate-100 font-semibold rounded-md hover:bg-red-400/90 ease-in-out duration-200"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default BoardPanel;
