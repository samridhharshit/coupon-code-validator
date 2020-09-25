const initState = {
    items: [],
    stories: []
};

const rootReducers = (state = initState, action) => {
    if (action.type === 'ADD_ITEM') {
        return {
            ...state,
            items: [...state.items, action.itemId]
        }
    }
    if (action.type === 'SET_STORIES') {
        return {
            ...state,
            stories: action.stories
        }
    }
    return state;
};

export default rootReducers;