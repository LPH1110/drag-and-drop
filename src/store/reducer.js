import { SHOW_MODAL } from './constants';

const initState = {
    ['closed-boards-modal']: {
        isOpening: false,
    },
};

function reducer(state, action) {
    switch (action.type) {
        case SHOW_MODAL:
            const modal = initState[action.payload.modalName];
            return {
                ...state,
                [action.payload.modalName]: {
                    ...modal,
                    isOpening: action.payload.isOpening,
                },
            };
        default:
            throw new Error('Invalid actions...');
    }
}

export { initState };
export default reducer;
