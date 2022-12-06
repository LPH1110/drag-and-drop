import { useState } from 'react';
import { PencilIcon, TrashIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

import { Button, Toast } from '~/components';
import { useStore, actions } from '~/store';

function UpdateComment({ data }) {
    const [state, dispatch] = useStore();
    const { commentId } = data;
    const [forward, setForward] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const handleDeleteComment = () => {
        setShowLoading(true);
        setTimeout(() => {
            setShowLoading(false);
            dispatch(actions.deleteCommentById({ commentId }));
            setForward(false);
        }, 2000);
    };

    return (
        <div>
            {forward ? (
                <div className="min-w-[16rem]">
                    <div className="pt-2 pb-3 border-b border-slate-300 mb-2 relative flex justify-items-center">
                        <Button
                            onClick={() => setForward(false)}
                            className="text-slate-600 hover:text-slate-500 absolute left-0 top-1/2 -translate-y-1/2"
                            type="button"
                        >
                            <span>
                                <ChevronLeftIcon className="w-5 h-5" />
                            </span>
                        </Button>
                        <h4 className="w-full text-center font-semibold">Delete Comment</h4>
                    </div>
                    <div>
                        <p className="text-left py-2 my-3 text-slate-500">
                            Are you sure that you want to delete this comment permanently ?
                        </p>
                        <div className="flex items-center justify-end">
                            <Button
                                type="button"
                                size="medium"
                                onClick={() => setForward(false)}
                                className="rounded-lg hover:bg-slate-100 text-slate-700 ease-in-out duration-200"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                size="medium"
                                onClick={handleDeleteComment}
                                className="bg-red-400 text-slate-100 font-semibold rounded-md hover:bg-red-400/90 ease-in-out duration-200"
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
                </div>
            ) : (
                <div className="min-w-[10rem] py-1 -mx-3">
                    <div>
                        <Button
                            type="button"
                            leftIcon={<PencilIcon className="w-5 h-5" />}
                            className="flex items-center justify-center w-full p-2 hover:bg-slate-100 ease-in-out duration-200"
                        >
                            Modify
                        </Button>
                    </div>
                    <div>
                        <Button
                            type="button"
                            onClick={() => setForward(true)}
                            leftIcon={<TrashIcon className="w-5 h-5" />}
                            className="flex items-center justify-center w-full p-2 hover:bg-slate-100 ease-in-out duration-200"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateComment;
