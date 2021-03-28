import * as actionTypes from '../actions/actionCreator';

const updateObject = (oldObject,updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

const initialState = {
    navValue : "write",
    title : "",
    details : "",
    thumbnail : "",
}

const navUpdate = (state, action) => {
    return updateObject(state, {
        navValue : action.value,
    });
}

const titleUpdate = (state, action) => {
    return updateObject(state, {
        title : action.value,
    });
}

const detailsUpdate = (state, action) => {
    return updateObject(state, {
        details : action.value,
    });
}

const thumbnailUpdate = (state, action) => {
    return updateObject(state, {
        thumbnail : action.value,
    });
}

const clearForm = (state, action) => {
    return updateObject(state, {
        title : "",
        details : "",
        thumbnail : "",
    });
}

// const navUpdate = (state, action) => {
//     return {
//         ...state,
//         navValue : action.value
//     }
// }

const AuthReducer = (state=initialState, action) => {

    switch(action.type) {
        case actionTypes.UPDATE_NAV:
            return navUpdate(state,action);

        case actionTypes.UPDATE_TITLE:
            return titleUpdate(state,action);

        case actionTypes.UPDATE_DETAILS:
            return detailsUpdate(state,action);

        case actionTypes.UPDATE_IMAGE:
            return thumbnailUpdate(state,action);

        case actionTypes.CLEAR_FORM:
            return clearForm(state,action);

        default:
            return state;
    }
    
}

export default AuthReducer;