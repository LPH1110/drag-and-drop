import { useState } from 'react';

import Button from '../Button';
import PopperWrapper from '../PopperWrapper';

function ColumnHeading({ data }) {
    const [currentColor, setCurrentColor] = useState({
        backgroundColor: 'bg-white',
        textColor: 'text-slate-700',
    });
    return (
        <div>
            <PopperWrapper left colorPalette setCurrentColor={setCurrentColor}>
                <Button
                    size="small"
                    className={`text-md font-semibold ${currentColor.backgroundColor} ${currentColor.textColor} rounded-full`}
                >
                    {data.name} <span className="ml-1">({data.items.length})</span>
                </Button>
            </PopperWrapper>
        </div>
    );
}

export default ColumnHeading;
