import { useState } from 'react';
import { Button } from '~/components';

function ClosedBoards() {
    return (
        <div>
            <Button
                type="button"
                size="medium"
                className="bg-slate-200 hover:bg-slate-100 text-slate-70 ease-in-out duration-200 rounded-md"
            >
                Closed boards
            </Button>
        </div>
    );
}

export default ClosedBoards;
