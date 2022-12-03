import { XMarkIcon } from '@heroicons/react/24/solid';

import { Button, PopperWrapper } from '~/components';
import { useStore, actions } from '~/store';

function ClosedBoardRow({ data, setToast }) {
    const [state, dispatch] = useStore();

    const handleReOpenBoard = (e) => {
        e.preventDefault();
        dispatch(actions.changeBoardStatus({ boardId: data.id, closed: false }));
    };

    return (
        <div className="py-4">
            <div className="flex items-center justify-between">
                <h4 className="text-lg">{data.title}</h4>
                <div className="flex items-center">
                    <Button
                        type="button"
                        size="small"
                        leftIcon={<XMarkIcon className="w-5 h-5" />}
                        className="relative rounded-sm bg-slate-200 text-slate-700 hover:bg-slate-200/80 ease-in-out duration-200"
                    >
                        Delete
                    </Button>
                    <Button
                        type="button"
                        size="small"
                        onClick={(e) => handleReOpenBoard(e)}
                        className="rounded-sm font-semibold bg-blue-200 text-blue-600 hover:bg-blue-200/80 ease-in-out duration-200"
                    >
                        Reopen
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ClosedBoardRow;
