import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './PopperWrapper.module.scss';
import { UpdateComment, BoardPanel, ColorPalette, RemovalConfirmPanel, ReportFlag } from './panels';

const cx = classNames.bind(styles);

function PopperWrapper({
    removalConfirmPanel,
    reportFlag,
    boardPanel,
    colorPalette,
    setCurrentColor,
    updateComment,
    placement = 'bottom-start',
    children,
    setToast,
    left,
    right,
    trigger = 'click',
}) {
    const classes = cx(
        'z-[1000] absolute cursor-auto overflow-y-auto max-h-[min((100vh-96px)-60px,734px)] rounded-lg shadow-[0_0_20px_0_rgba(44,104,144,0.5)] py-2 px-3 bg-white',
        {
            left,
            right,
        },
    );
    return (
        <div onClick={(e) => e.preventDefault()}>
            <Tippy
                interactive
                trigger={trigger}
                placement={placement}
                render={(attrs) => (
                    <div className={classes} tabIndex="-1" {...attrs}>
                        {colorPalette && <ColorPalette setCurrentColor={setCurrentColor} />}
                        {boardPanel && <BoardPanel data={boardPanel} />}
                        {removalConfirmPanel && <RemovalConfirmPanel setToast={setToast} data={removalConfirmPanel} />}
                        {reportFlag && <ReportFlag data={reportFlag} />}
                        {updateComment && <UpdateComment data={updateComment} />}
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default PopperWrapper;
