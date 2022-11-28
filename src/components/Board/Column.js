import { Droppable } from '@hello-pangea/dnd';
import { EllipsisHorizontalIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './Board.module.scss';
import ColumnHeading from './ColumnHeading';
import ColumnItem from './ColumnItem';

const cx = classNames.bind(styles);

function Column({ handleAddColumn, handleAddTask, id, data }) {
    return (
        <div className={cx('column', 'rounded-xl w-80 shrink-0')} key={id}>
            <div className="px-4 pt-4 flex items-center justify-between mb-2">
                <ColumnHeading data={data} />
                <div className="flex items-center">
                    <Button onClick={handleAddColumn}>
                        <span>
                            <PlusCircleIcon className="w-6 h-6 text-slate-800 hover:text-slate-600" />
                        </span>
                    </Button>
                    <Button>
                        <span>
                            <EllipsisHorizontalIcon className="w-6 h-6 text-slate-800 hover:text-slate-600" />
                        </span>
                    </Button>
                </div>
            </div>
            <Droppable droppableId={id}>
                {(provided, snapshot) => {
                    return (
                        <div className="px-4" ref={provided.innerRef} {...provided.droppableProps}>
                            <div
                                className={cx(
                                    'column-inner',
                                    snapshot.isDraggingOver ? 'py-4 rounded-xl bg-sky-100/50' : 'py-4 rounded-xl',
                                )}
                            >
                                {data.items.map((item, index) => {
                                    return <ColumnItem data={item} key={item.id} index={index} />;
                                })}
                            </div>
                            <div className="mt-2">
                                <Button
                                    size="large"
                                    onClick={() => handleAddTask(id)}
                                    className="text-slate-500 w-full font-semibold rounded-md bg-slate-200/50 hover:bg-slate-100 ease-in-out duratin-200"
                                    leftIcon={<PlusCircleIcon className="w-5 h-5" />}
                                >
                                    Add task
                                </Button>
                            </div>
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
}

export default Column;
