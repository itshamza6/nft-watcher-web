const initState = {}

const banenrReducer = (state = initState, action) => {
    switch (action.type) {
        case 'banner:add':
            return action.data;
        case 'banner:remove':
            return {};
        default:
            return state;
    }
}

export default banenrReducer;