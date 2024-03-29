import * as actionTypes from './actionTypes'

import axios from '../../axios-backend'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authLoginSuccess = token => {
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        token
    }
}

export const authRegisterSuccess = message => {
    return {
        type: actionTypes.AUTH_REGISTER_SUCCESS,
        message
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authReset = () => {
    return {
        type: actionTypes.AUTH_RESET
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

/*
    Check for saved token on localStorage to have a persistant state
*/
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            dispatch(logout())
        } else {
            dispatch(authLoginSuccess( token ))
        }
    }
}

/* 
    Send auth data to backend.
    param isSignup will determine which url we send our auth data to.
    Will set error or success on auth store depending on which action we dispatch
    from try / catch block
*/
export const auth = (email, password, isSignup) => {
    return async dispatch => {
        dispatch(authStart())
        const authData = { email, password }
        let url = 'users/login'
        
        if (isSignup) {
            url = 'users'
        }

        try {
            const response = await axios.post(url, authData)
            if (!response) throw new Error('User Not Found')
            if (!isSignup) {
                localStorage.setItem('token', response.data.token)
                dispatch(authLoginSuccess( response.data.token ))
            } else {
                dispatch(authRegisterSuccess( response.data.message ))
            }
        } catch (e) {
            let errorMessage = 'Login failed!'

            if (isSignup) errorMessage = 'Sign up failed!'

            dispatch(authFail(errorMessage))
        }
    }
}

/**
 * Hit backend logout route to clear old user tokens
 */
export const startLogout = token => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'x-auth': token
                }
            }

            await axios.delete('/users/login', config)
            localStorage.removeItem('token')
            dispatch(logout())
        } catch (e) {
            dispatch(authFail(e.message))
        }
    }
}