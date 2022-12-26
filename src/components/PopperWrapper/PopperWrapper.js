import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './PopperWrapper.module.scss';
import { UpdateComment, BoardPanel, ColorPalette, RemovalConfirmPanel, ReportFlag, UserMenuActions } from './panels';

const cx = classNames.bind(styles);

function PopperWrapper({
    removalConfirmPanel,
    reportFlag,
    boardPanel,
    colorPalette,
    setCurrentColor,
    updateComment,
    userMenuActions,
    placement = 'bottom-start',
    children,
    setToast,
    left,
    right,
    trigger = 'click',
}) {
    const classes = cx(
        'z-[1000] absolute cursor-auto overflow-y-auto max-h-[min((100vh-96px)-60px,734px)] rounded-lg shadow-lg py-2 px-3 bg-white',
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
                        {userMenuActions && <UserMenuActions data={userMenuActions} />}
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default PopperWrapper;
