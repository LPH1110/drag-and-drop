import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Board.module.scss';
import Column from './Column';

const cx = classNames.bind(styles);

const tasks = [
    {
        id: uuidv4(),
        title: 'Competitor & Research',
        priority: 'low',
        deadline: '8-11 Jun',
    },
    {
        id: uuidv4(),
        title: 'Run Ads and Campaign',
        priority: 'normal',
        deadline: '9-2 July',
    },
    {
        id: uuidv4(),
        title: 'Project Management',
        priority: 'high',
        deadline: '11-10 Mar',
    },
];

const columns = {
    [uuidv4()]: {
        id: uuidv4(),
        name: 'Todo',
        items: tasks,
    },
    [uuidv4()]: {
        id: uuidv4(),
        name: 'Doing',
        items: [],
    },
    [uuidv4()]: {
        id: uuidv4(),
        name: 'Done',
        items: [],
    },
    [uuidv4()]: {
        id: uuidv4(),
        name: 'Requesting',
        items: [],
    },
};

function Board() {
    const [cols, setCols] = useState(columns);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            const col = cols[source.droppableId];
            const colItems = [...col.items];
            const [removed] = colItems.splice(source.index, 1);
            colItems.splice(destination.index, 0, removed);
            setCols({
                ...cols,
                [source.droppableId]: {
                    ...col,
                    items: [...colItems],
                },
            });
        } else {
            const sourceCol = cols[source.droppableId];
            const sourceItems = sourceCol.items;
            const desCol = cols[destination.droppableId];
            const desItems = desCol.items;

            const [removed] = sourceItems.splice(source.index, 1);
            desItems.splice(destination.index, 0, removed);
            setCols({
                ...cols,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...desCol,
                    items: desItems,
                },
            });
        }
    };

    const handleAddTask = (columnId) => {
        const col = cols[columnId];
        const colItems = col.items;
        colItems.push({
            id: uuidv4(),
            title: 'Task title',
            priority: '',
            deadline: '8-11 Jun',
        });
        setCols({
            ...cols,
            [columnId]: {
                ...col,
                items: colItems,
            },
        });
    };

    const handleAddColumn = (columnId) => {};
    return (
        <section className={cx('board-container', 'p-6 w-full flex bg-slate-100/40')}>
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.entries(cols).map(([id, col]) => {
                    return (
                        <Column
                            key={id}
                            handleAddColumn={handleAddColumn}
                            handleAddTask={handleAddTask}
                            id={id}
                            data={col}
                        />
                    );
                })}
            </DragDropContext>
        </section>
    );
}

export default Board;
