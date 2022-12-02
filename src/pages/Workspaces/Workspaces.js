import { PlusIcon } from '@heroicons/react/24/outline';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button, PopperWrapper } from '~/components';
import FavorBtn from './FavorBtn';
import styles from './Workspaces.module.scss';
import { dataStore } from '~/store';
import ClosedBoards from './ClosedBoards';

const cx = classNames.bind(styles);

function Workspaces() {
    const [boards, setBoards] = useState(dataStore.boardsData);

    const handleAddNewBoard = () => {
        setBoards((prev) => ({
            ...prev,
            [uuidv4()]: {
                title: 'Board title',
                favor: false,
            },
        }));
    };

    return (
        <section>
            <section className="py-4 grid grid-cols-5 gap-x-4 gap-y-6">
                {Object.entries(boards).map(([id, board]) => (
                    <Link
                        key={id}
                        to={`/board/${id}`}
                        className={cx(
                            'board',
                            'hover:bg-slate-100/50 ease duration-200 flex flex-col justify-between relative py-2 pl-2 pr-1 rounded-lg w-48 min-h-[6rem] shadow-xl image-full',
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="">{board.title}</h4>
                            <Button
                                onClick={(e) => e.preventDefault()}
                                className="z-2 p-1 hover:bg-slate-200 rounded-md ease duration-200"
                            >
                                <PopperWrapper boardPanel={{ ...board, id }}>
                                    <EllipsisHorizontalIcon className="w-5 h-5" />
                                </PopperWrapper>
                            </Button>
                        </div>
                        <div className="flex justify-end items-center">
                            <FavorBtn data={{ ...board, id }} boards={boards} setBoards={setBoards} />
                        </div>
                    </Link>
                ))}
                <Button
                    leftIcon={<PlusIcon className="w-5 h-5" />}
                    className={cx(
                        'card',
                        'border border-sky-400 bg-sky-400/20 text-sky-400 font-semibold hover:text-sky-300 hover:border-sky-300 hover:bg-sky-400/10 ease-in-out duration-200 border-dashed cursor-pointer p-2 rounded-lg w-48 h-24 shadow-xl image-full',
                    )}
                    type="button"
                    onClick={handleAddNewBoard}
                >
                    Create new board
                </Button>
            </section>
            <section className="mt-6">
                <ClosedBoards />
            </section>
        </section>
    );
}

export default Workspaces;
