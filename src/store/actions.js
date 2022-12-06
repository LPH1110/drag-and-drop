import {
    CHANGE_BOARD_STATUS,
    CHANGE_BOARD_FAVOR,
    ADD_NEW_BOARD,
    DELETE_BOARD,
    ONCHANGE_BOARD_TITLE,
    ADD_NEW_COMMENT_TO_TASK,
    DELETE_COMMENT_BY_ID,
} from './constants';

export const changeBoardFavor = (payload) => ({
    type: CHANGE_BOARD_FAVOR,
    payload,
});

export const changeBoardStatus = (payload) => ({
    type: CHANGE_BOARD_STATUS,
    payload,
});

export const addNewBoard = (payload) => ({
    type: ADD_NEW_BOARD,
    payload,
});

export const deleteBoard = (payload) => ({
    type: DELETE_BOARD,
    payload,
});

export const onChangeBoardTitle = (payload) => ({
    type: ONCHANGE_BOARD_TITLE,
    payload,
});

export const addNewCommentToTask = (payload) => ({
    type: ADD_NEW_COMMENT_TO_TASK,
    payload,
});

export const deleteCommentById = (payload) => ({
    type: DELETE_COMMENT_BY_ID,
    payload,
});
