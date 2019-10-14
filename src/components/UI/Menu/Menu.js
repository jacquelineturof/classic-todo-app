import React from 'react'

import NavLinks from '../Nav/NavLinks/NavLinks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Menu.module.css'

const menu = props => (
    <div className = { classes.Menu }>
        <div className = { classes.Icon_Container }>
            <FontAwesomeIcon 
                icon = { [ 'fal', 'times' ] } 
                className = { classes.Menu_Close_Icon }
                onClick = { props.close } />
        </div>
        <NavLinks 
            auth = { props.auth } 
            isMenu = { true }
            close = { props.close } />
    </div>
)

export default menu