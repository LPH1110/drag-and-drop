import { comment } from 'postcss';
import { v4 as uuidv4 } from 'uuid';
import {
    ONCHANGE_BOARD_TITLE,
    CHANGE_BOARD_STATUS,
    CHANGE_BOARD_FAVOR,
    ADD_NEW_BOARD,
    DELETE_BOARD,
    ADD_NEW_COMMENT_TO_TASK,
    DELETE_COMMENT_BY_ID,
    SET_USER_SESSION,
    SET_OTP_CODE,
} from './constants';

const initState = {
    OTPcode: '',
    userSession: {
        loggedIn: false,
        info: {},
    },
    userSession: {
        id: 1110,
    },
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
    comments: {
        [uuidv4()]: {
            userId: 0,
            userName: '@TrungNguyen',
            content: 'Tui thấy nó lạ lắm á mọi người =))',
            reported: false,
            userThumbnail:
                'https://res.cloudinary.com/dzzv49yec/image/upload/v1670092118/taskbox-assets/avatar2_fssdbw.jpg',
        },
        [uuidv4()]: {
            userId: 1,
            userName: '@HanhKhung',
            content: 'Thật là một task thú vị',
            reported: false,
            userThumbnail:
                'https://res.cloudinary.com/dzzv49yec/image/upload/v1670092118/taskbox-assets/avatar4_n1nbbs.jpg',
        },
        [uuidv4()]: {
            userId: 2,
            userName: '@HongNgoc',
            content: 'Xi xi ba bla pa ra pẻng',
            reported: false,
            userThumbnail:
                'https://res.cloudinary.com/dzzv49yec/image/upload/v1670092118/taskbox-assets/avatar3_clufwp.jpg',
        },
        [uuidv4()]: {
            userId: 3,
            userName: '@PhamHue',
            content: 'Siu nhân xanh biến hìnhhhh',
            reported: false,
            userThumbnail:
                'https://res.cloudinary.com/dzzv49yec/image/upload/v1670050964/taskbox-assets/avatar1_ilyzbz.jpg',
        },
    },
};

function reducer(state, action) {
    const { boards } = state;
    const { comments } = state;
    let board;
    switch (action.type) {
        case SET_OTP_CODE:
            return {
                ...state,
                OTPcode: action.payload,
            };
        case SET_USER_SESSION:
            return {
                ...state,
                userSession: {
                    loggedIn: action.payload.loggedIn,
                    info: {
                        ...action.payload.info,
                    },
                },
            };
        case DELETE_COMMENT_BY_ID:
            delete comments[action.payload.commentId];

            return {
                ...state,
                comments: {
                    ...comments,
                },
            };
        case ADD_NEW_COMMENT_TO_TASK:
            let newComments = Object.entries(comments);
            const { userId, userName, userThumbnail, content } = action.payload;

            newComments.splice(0, 0, [
                uuidv4(),
                {
                    userId,
                    userName,
                    userThumbnail,
                    content,
                    reported: false,
                },
            ]);

            newComments = newComments.reduce(
                (acc, [id, comment]) => ({
                    ...acc,
                    [id]: comment,
                }),
                {},
            );

            return {
                ...state,
                comments: newComments,
            };
        case CHANGE_BOARD_STATUS:
            board = boards[action.payload.boardId];

            if (board.favor) {
                return {
                    ...state,
                    boards: {
                        ...boards,
                        [action.payload.boardId]: {
                            ...board,
                            closed: action.payload.closed,
                            favor: false,
                        },
                    },
                };
            } else {
                return {
                    ...state,
                    boards: {
                        ...boards,
                        [action.payload.boardId]: {
                            ...board,
                            closed: action.payload.closed,
                            favor: false,
                        },
                    },
                };
            }

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
        case ONCHANGE_BOARD_TITLE:
            board = boards[action.payload.boardId];

            return {
                ...state,
                boards: {
                    ...boards,
                    [action.payload.boardId]: {
                        ...board,
                        title: action.payload.value,
                    },
                },
            };

        default:
            throw new Error('Invalid actions...');
    }
}

export { initState };
export default reducer;
