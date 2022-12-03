import { CHANGE_BOARD_STATUS, CHANGE_BOARD_FAVOR, ADD_NEW_BOARD, DELETE_BOARD } from './constants';

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

export const deletBoard = (payload) => ({
    type: DELETE_BOARD,
    payload,
});
