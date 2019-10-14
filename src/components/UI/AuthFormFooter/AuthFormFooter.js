import React from 'react'

import Button from '../Button/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './AuthFormFooter.module.css'

const authFormFooter = props => (
    <div className = { classes.Auth_Form_Footer }>
        <Button 
            type = "authToggle" 
            isSignup = { props.isSignup }
            login = { props.login }
            register = { props.register } />
        <div className = { classes.Footer_Social_Media }>
            <FontAwesomeIcon 
                icon = { [ 'fab', 'facebook-square' ] } 
                className = { classes.Auth_Footer_Icon } />
            <FontAwesomeIcon 
                icon = { [ 'fab', 'google-plus-square' ] } 
                className = { classes.Auth_Footer_Icon } />
        </div>
    </div>
)

export default authFormFooter