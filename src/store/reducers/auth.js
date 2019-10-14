import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    token: null,
    error: null,
    message: null
}

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, message: null } )
}

const authRegisterSuccess = (state, action) => {
    return updateObject(state, { message: action.message, error: null })
}

const authLoginSuccess = (state, action) => {
    return updateObject(state, { token: action.token, error: null })
}

const authFail = (state, action) => {
    return updateObject(state, { error: action.error })
}

const authReset = (state, action) => {
    return updateObject(state, { error: null, message: null })
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, error: null, message: null })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_REGISTER_SUCCESS: return authRegisterSuccess(state, action)
        case actionTypes.AUTH_LOGIN_SUCCESS: return authLoginSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_RESET: return authReset(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        default: return state
    }
}

export default reducer