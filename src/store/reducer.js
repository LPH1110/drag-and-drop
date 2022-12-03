import { v4 as uuidv4 } from 'uuid';
import { CHANGE_BOARD_STATUS, CHANGE_BOARD_FAVOR, ADD_NEW_BOARD, DELETE_BOARD } from './constants';

const initState = {
    boards: {
        [uuidv4()]: {
            title: 'Board 1',
            favor: false,
            closed: false,
        },
        [uuidv4()]: {
            title: 'Board 2',
            favor: false,
            closed: false,
        },
        [uuidv4()]: {
            title: 'Board 3',
            favor: false,
            closed: false,
        },
        [uuidv4()]: {
            title: 'Board 4',
            favor: false,
            closed: false,
        },
        [uuidv4()]: {
            title: 'Board 5',
            favor: false,
            closed: false,
        },
        [uuidv4()]: {
            title: 'Board 6',
            favor: false,
            closed: false,
        },
    },
};

function reducer(state, action) {
    const { boards } = state;
    let board;
    switch (action.type) {
        case CHANGE_BOARD_STATUS:
            board = boards[action.payload.boardId];

            return {
                ...state,
                boards: {
                    ...boards,
                    [action.payload.boardId]: {
                        ...board,
                        closed: action.payload.closed,
                    },
                },
            };
        case CHANGE_BOARD_FAVOR:
            board = boards[action.payload.boardId];

            return {
                ...state,
                boards: {
                    ...boards,
                    [action.payload.boardId]: {
                        ...board,
                        favor: action.payload.favor,
                    },
                },
            };
        case ADD_NEW_BOARD:
            return {
                ...state,
                boards: {
                    ...boards,
                    [uuidv4()]: {
                        title: 'New board title',
                        favor: false,
                        closed: false,
                    },
                },
            };
        case DELETE_BOARD:
            delete boards[action.payload.boardId];

            return {
                ...state,
                boards: {
                    ...boards,
                },
            };

        default:
            throw new Error('Invalid actions...');
    }
}

export { initState };
export default reducer;
