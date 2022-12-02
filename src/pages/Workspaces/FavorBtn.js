import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import styles from './Workspaces.module.scss';
import classNames from 'classnames/bind';

import { Button } from '~/components';

const cx = classNames.bind(styles);

function FavorBtn({ data, boards, setBoards }) {
    const handleChangeFavor = (e, boardId) => {
        e.preventDefault();
        const board = boards[boardId];
        setBoards((prev) => ({
            ...prev,
            [boardId]: {
                ...board,
                favor: !data.favor,
            },
        }));
    };
    return (
        <Button
            onClick={(e) => handleChangeFavor(e, data.id)}
            className={cx('favor-btn', data.favor ? 'block' : 'hidden', 'px-1')}
        >
            {!data.favor ? (
                <StarIconOutline className="w-5 h-5 text-slate-400" />
            ) : (
                <StarIconSolid className="w-5 h-5 text-yellow-400" />
            )}
        </Button>
    );
}

export default FavorBtn;
