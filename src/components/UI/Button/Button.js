import React from 'react'

import classes from './Button.module.css'

const Button = props => {
    let button = null
    const { type, children } = props

    switch (type) {
        case 'requestForm':
            button = (
                <button className = { classes.Request_Info_Button }>
                    { children }
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