const optionReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_OPTIONS":
            return action.options;
        case "ADD_OPTION":
            return [
                ...state,
                action.option
            ]
        case "REMOVE_OPTION":
            return state.filter(({ id }) => id !== action.id);
        case "RESET_OPTION":
            return [];
        default: 
            return state;
    }
};

export default optionReducer;