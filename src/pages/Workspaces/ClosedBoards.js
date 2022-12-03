import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from '~/components';
import { useStore } from '~/store';
import ClosedBoardRow from './ClosedBoardRow';

function ClosedBoards() {
    const [state, dispatch] = useStore();
    const { boards } = state;

    return (
        <div>
            <label
                htmlFor="my-modal-3"
                className="cursor-pointer rounded-md py-2 px-3 bg-slate-200 text-slate-700 hover:bg-slate-200/70"
            >
                Closed boards
            </label>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Closed boards</h2>
                        <label htmlFor="my-modal-3" className="cursor-pointer hover:text-slate-600 text-slate-700">
                            <XMarkIcon className="w-6 h-6" />
                        </label>
                    </div>
                    <div>
                        {Object.entries(boards).map(([id, board]) =>
                            board.closed ? <ClosedBoardRow key={id} data={{ ...board, id }} /> : '',
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClosedBoards;
