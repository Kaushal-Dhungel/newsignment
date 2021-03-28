import * as actions from './actionCreator';

export const updateNav = (value) => {
    return {
        type: actions.UPDATE_NAV,
        value : value
    }
}

export const updateForm = (name,value) => {
    if (name === "title"){
        return {
            type: actions.UPDATE_TITLE,
            value : value
        }
    }

    else if (name === "details") {
        return {
            type: actions.UPDATE_DETAILS,
            value : value
        }
    }

    else if (name === "thumbnail") {
        return {
            type: actions.UPDATE_IMAGE,
            value : value
        }
    }

    else {
        return {
            type:actions.CLEAR_FORM,
            value : value
        }
    }

}

