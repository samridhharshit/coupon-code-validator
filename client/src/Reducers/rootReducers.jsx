const initState = {
    // dummyData: [
    //     {
    //         "id": 1,
    //         "title": "first text",
    //         "body": "hgsacxjv klz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 2,
    //         "title": "second text",
    //         "body": "hgsacxj vklz;ioausgfGA SVZCXVM.KL"
    //     },
    //     {
    //         "id": 3,
    //         "title": "third text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 4,
    //         "title": "fourth text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 5,
    //         "title": "fifth text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 6,
    //         "title": "sixth text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 7,
    //         "title": "seventh text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 8,
    //         "title": "eighth text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 9,
    //         "title": "ninth text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 10,
    //         "title": "tenth text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 11,
    //         "title": "eleventh text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     },
    //     {
    //         "id": 12,
    //         "title": "twelve text",
    //         "body": "hgs acxj vklz;io ausgfGASVZCXVM.KL"
    //     }
    // ],
    // userId: null,
    user: {}
};

const rootReducers = (state = initState, action) => {
    // console.log(action)
    if (action.type === 'MOUNT_USER') {
        console.log(action)
        return {
            ...state,
            user: action.userData
        };
        // console.log(state);
    }
    if (action.type === 'REMOVE_USER') {
        console.log('removing user')
        return {
            ...state,
            user: {}
        }
    }
    return state;
};

export default rootReducers;