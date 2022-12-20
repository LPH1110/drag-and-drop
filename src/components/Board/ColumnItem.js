import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import classNames from 'classnames/bind';
import styles from './Board.module.scss';
import { CalendarDaysIcon, ChatBubbleLeftEllipsisIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

import { Button, Tooltip, TaskDetail } from '~/components';

const cx = classNames.bind(styles);

function ColumnItem({ data, index }) {
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cx(
                            'column-item',
                            'bg-white hover:bg-slate-300/20 ease duration-200 flex-col outline-none rounded-md text-slate-800 select-none flex items-start p-2 min-h-[4rem]',
                        )}
                    >
                        {/* Title */}
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-lg font-semibold">{data.title}</h4>
                            <div className="flex flex-col justify-items-center">
                                <label
                                    htmlFor={`task_${data.id}`}
                                    className={cx(
                                        'column-item-modify',
                                        'text-slate-500/50 hover:text-slate-700 ease duration-200',
                                    )}
                                >
                                    <PencilSquareIcon className="w-5 h-5" />
                                </label>
                                <TaskDetail data={data} />
                            </div>
                        </div>
                        {/* Priority */}
                        <p className="flex items-center text-slate-500 my-2">
                            Priority:
                            <Button
                                type="button"
                                size="small"
                                className={cx(`prior-${data.priority}`, 'ml-2 text-slate-700 capitalize rounded-full')}
                            >
                                {data.priority}
                            </Button>
                        </p>
                        {/* Deadline */}
                        <div className="w-full">
                            <p className="text-slate-500">Deadline:</p>
                            <div className="grid grid-cols-2">
                                <div className="flex items-center">
                                    <span className="mr-2 text-slate-400">
                                        <CalendarDaysIcon className="w-5 h-5" />
                                    </span>
                                    <p>{data.deadline}</p>
                                </div>
                                <Button
                                    className="justify-end rounded-sm"
                                    leftIcon={<ChatBubbleLeftEllipsisIcon className="text-slate-400 w-5 h-5" />}
                                >
                                    <p>0 Comment</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default ColumnItem;
