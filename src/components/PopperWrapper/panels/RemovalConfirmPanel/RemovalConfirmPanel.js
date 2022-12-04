import { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import { Button, Toast } from '~/components';
import { useStore, actions } from '~/store';

function RemovalConfirmPanel({ data, setToast }) {
    const [state, dispatch] = useStore();
    const [showLoading, setShowLoading] = useState(false);

    const handleDeleteBoard = (e) => {
        e.preventDefault();
        setShowLoading(true);
        setTimeout(() => {
            setShowLoading(false);
            dispatch(actions.deleteBoard({ boardId: data.id }));
            setToast({
                body: {
                    message: 'Deleted board successfully',
                    status: 'success',
                },
                show: true,
            });
            setTimeout(() => {
                setToast((prev) => ({
                    ...prev,
                    show: false,
                }));
            }, 2000);
        }, 2000);
    };
    return (
        <div className="min-w-[16rem]">
            <div className="pt-2 pb-3 border-b border-slate-300 mb-2 relative flex justify-items-center">
                <h4 className="w-full font-semibold">Permanent removal</h4>
                <Button type="button" className="text-slate-500 hover:text-slate-400 ease duration-200">
                    <XMarkIcon className="w-5 h-5" />
                </Button>
            </div>
            <div>
                <p className="text-left py-2 my-3 text-slate-500">
                    All lists, cards and actions will be deleted, and you won't be able to re-open the board. There is
                    no undo.
                </p>
                <Button
                    type="button"
                    size="medium"
                    onClick={(e) => handleDeleteBoard(e)}
                    className="my-2 w-full py-2 bg-red-400 text-slate-100 font-semibold rounded-md hover:bg-red-400/90 ease-in-out duration-200"
                >
                    {showLoading ? (
                        <p className="flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Deleting
                        </p>
                    ) : (
                        'Delete'
                    )}
                </Button>
            </div>
        </div>
    );
}

export default RemovalConfirmPanel;
