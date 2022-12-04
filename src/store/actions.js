import {
    CHANGE_BOARD_STATUS,
    CHANGE_BOARD_FAVOR,
    ADD_NEW_BOARD,
    DELETE_BOARD,
    ONCHANGE_BOARD_TITLE,
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
