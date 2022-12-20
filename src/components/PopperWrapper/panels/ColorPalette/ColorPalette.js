import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ColorPalette.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '~/components';

const cx = classNames.bind(styles);

const palette = [
    {
        id: uuidv4(),
        name: 'red',
    },
    {
        id: uuidv4(),
        name: 'emerald',
    },
    {
        id: uuidv4(),
        name: 'cyan',
    },
    {
        id: uuidv4(),
        name: 'orange',
    },
];

function ColorPalette({ setCurrentColor }) {
    const [colors, setColors] = useState(palette);
    return (
        <div className="flex">
            <Button
                onClick={() =>
                    setCurrentColor((prev) => ({
                        ...prev,
                        backgroundColor: 'bg-red-300',
                        textColor: 'text-slate-700',
                    }))
                }
                className={cx(
                    'color',
                    'cursor-pointer bg-red-300 w-6 h-6 rounded-full hover:bg-red-300/50  ease duration-200',
                )}
                type="button"
            ></Button>
            <Button
                onClick={() =>
                    setCurrentColor((prev) => ({
                        ...prev,
                        backgroundColor: 'bg-cyan-300',
                        textColor: 'text-slate-700',
                    }))
                }
                className={cx(
                    'color',
                    'cursor-pointer bg-cyan-300 w-6 h-6 rounded-full hover:bg-cyan-300/50 ease duration-200',
                )}
                type="button"
            ></Button>
            <Button
                onClick={() =>
                    setCurrentColor((prev) => ({
                        ...prev,
                        backgroundColor: 'bg-amber-200',
                        textColor: 'text-slate-700',
                    }))
                }
                className={cx(
                    'color',
                    'cursor-pointer bg-amber-200 w-6 h-6 rounded-full hover:bg-amber-200/50 ease duration-200',
                )}
                type="button"
            ></Button>
            <Button
                onClick={() =>
                    setCurrentColor((prev) => ({
                        ...prev,
                        backgroundColor: 'bg-orange-300',
                        textColor: 'text-slate-700',
                    }))
                }
                className={cx(
                    'color',
                    'cursor-pointer bg-orange-300 w-6 h-6 rounded-full hover:bg-orange-300/50 ease duration-200',
                )}
                type="button"
            ></Button>
            <Button
                onClick={() =>
                    setCurrentColor((prev) => ({
                        ...prev,
                        backgroundColor: 'bg-green-300',
                        textColor: 'text-slate-700',
                    }))
                }
                className={cx(
                    'color',
                    'cursor-pointer bg-green-300 w-6 h-6 rounded-full hover:bg-green-300/50 ease duration-200',
                )}
                type="button"
            ></Button>
        </div>
    );
}

export default ColorPalette;
