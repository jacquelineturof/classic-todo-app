import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '../Button/Button'
import NavLinks from './NavLinks/NavLinks'

import classes from './Nav.module.css'

/*
    Our nav bar. Links are determined by the auth prop.
*/
const nav = props => (
    <nav className = { classes.Nav_Bar }>
        <div className = { classes.Nav_Brand }>
            <FontAwesomeIcon 
                icon = { [ 'fad', 'seedling' ] } 
                className = { classes.Nav_Icon } />
        </div>
        <NavLinks auth = { props.auth } isMenu = { false } />
        { /* if view port becomes too small, show nav menu button 
                instead of full menu */ }
        <Button 
            type = "navMenu"
            clicked = { props.showMenu } />
    </nav>
)

export default nav