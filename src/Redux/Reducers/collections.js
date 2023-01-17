const initState = {};

const collectionsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'collections:add':
            state[action.key] = action.data;
            return state;
        case 'collections:remove':
            return {};
        default:
            return state;
    }
}

export default collectionsReducer;