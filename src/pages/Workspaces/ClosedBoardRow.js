import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames/bind';
import styles from './ClosedBoardRow.module.scss';

import { Button, PopperWrapper } from '~/components';
import { useStore, actions } from '~/store';

const cx = classNames.bind(styles);

function ClosedBoardRow({ data, setToast }) {
    const [state, dispatch] = useStore();

    const handleReOpenBoard = (e) => {
        e.preventDefault();
        dispatch(actions.changeBoardStatus({ boardId: data.id, closed: false }));
    };

    return (
        <div className="py-4">
            <div className="flex items-center justify-between">
                <h4 className={cx('title', 'text-lg')}>{data.title}</h4>
                <div className="flex items-center">
                    <PopperWrapper right placement="bottom-end" removalConfirmPanel={data} setToast={setToast}>
                        <Button
                            type="button"
                            size="small"
                            leftIcon={<XMarkIcon className="w-5 h-5" />}
                            className="rounded-sm bg-slate-200 text-slate-700 hover:bg-slate-200/80 ease-in-out duration-200"
                        >
                            Delete
                        </Button>
                    </PopperWrapper>
                    <Button
                        type="button"
                        size="small"
                        onClick={(e) => handleReOpenBoard(e)}
                        className="ml-2 rounded-sm font-semibold bg-blue-200 text-blue-600 hover:bg-blue-200/80 ease-in-out duration-200"
                    >
                        Reopen
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ClosedBoardRow;
