import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { BoardPanel, ColorPalette, RemovalConfirmPanel } from './panels';

function PopperWrapper({
    removalConfirmPanel,
    boardPanel,
    colorPalette,
    setCurrentColor,
    placement = 'bottom-start',
    children,
    setToast,
}) {
    return (
        <div onClick={(e) => e.preventDefault()}>
            <Tippy
                interactive
                trigger="click"
                placement={placement}
                render={(attrs) => (
                    <div
                        className="z-[1000] absolute right-0 cursor-auto overflow-y-auto max-h-[min((100vh-96px)-60px,734px)] rounded-lg shadow-[0_0_20px_0_rgba(44,104,144,0.5)] py-2 px-3 bg-white"
                        tabIndex="-1"
                        {...attrs}
                    >
                        {colorPalette && <ColorPalette setCurrentColor={setCurrentColor} />}
                        {boardPanel && <BoardPanel data={boardPanel} />}
                        {removalConfirmPanel && <RemovalConfirmPanel setToast={setToast} data={boardPanel} />}
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default PopperWrapper;
