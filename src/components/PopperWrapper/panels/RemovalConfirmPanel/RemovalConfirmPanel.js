import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import { Button, Toast } from '~/components';
import { useStore, actions } from '~/store';

function RemovalConfirmPanel({ data, setToast }) {
    const [state, dispatch] = useStore();

    const handleDeleteBoard = (e) => {
        e.preventDefault();
        dispatch(actions.deletBoard({ boardId: data.id }));
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
    };
    return (
        <div>
            <div className="pt-2 pb-3 border-b border-slate-300 mb-2 relative flex justify-items-center">
                <h4 className="w-full font-semibold">Close board ?</h4>
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
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default RemovalConfirmPanel;
