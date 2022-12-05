import React from 'react';
import Button from '~/components/Button';
import { FlagIcon } from '@heroicons/react/24/solid';

function ReportFlag({ data }) {
    return (
        <div className="min-w-[12rem] py-1 -mx-3">
            <Button
                type="button"
                className="p-2 hover:bg-slate-100 ease-in-out duration-200"
                leftIcon={<FlagIcon className="w-5 h-5" />}
            >
                Report this comment
            </Button>
        </div>
    );
}

export default ReportFlag;
