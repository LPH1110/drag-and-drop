import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Tooltip({ message, children }) {
    return <Tippy content={<span className="text-md">{message}</span>}>{children}</Tippy>;
}

export default Tooltip;
