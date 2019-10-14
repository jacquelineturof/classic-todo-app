import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Button.module.css'

const Button = props => {
    let button = null
    const { type, children, clicked } = props

    switch (type) {
        case 'requestForm':
            button = (
                <button className = { classes.Request_Info_Button }>
                    { children }
                </button>
            )
            break
        case 'authForm':
            button = (
                <button className = { classes.Auth_Button }>
                    { children }
                </button>
            )
            break
        case 'authToggle':
            button = (
                <button
                    onClick = { props.isSignup ? props.login : props.register }>
                    { props.isSignup ? 
                        'Already have an account?' : 'Create an Account'
                    }
                </button>
            )
            break
        case 'navMenu':
            button = (
                <button className = { classes.Nav_Menu_Button }>
                    <FontAwesomeIcon 
                        icon = { [ 'fad', 'caret-circle-down' ] } 
                        className = { classes.Nav_Menu_Icon }
                        onClick = { clicked } />
                </button>
            )
            break
        default:
            button = (
                <button>{ children }</button>
            )
    }

    return button
}

export default Button