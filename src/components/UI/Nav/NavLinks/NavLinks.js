import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavLinks.module.css'

/*
    Our nav links for menu and nav.
    The links returned are based on user
    authentication and if the component
    is the nav or menu component
*/
const navLinks = props => {
    const { auth, isMenu, close } = props
    let links = null

    // auth links
    if (auth) {
        links = (
            <div className = { isMenu ? classes.Menu_Links : classes.Nav_Links_Auth }>
                <div className = { isMenu ? classes.Menu_Links_Main1 : 
                        classes.Nav_Links_Auth_Main }>
                    <NavLink
                        to = "/"
                        className = { isMenu ? classes.Menu_Link : 
                            classes.Nav_Link_Auth }
                            onClick = { close }>
                        Calendar
                    </NavLink>
                    <NavLink
                        to = "/"
                        className = { isMenu ? classes.Menu_Link : 
                            classes.Nav_Link_Auth }
                            onClick = { close }>
                        Add Todo
                    </NavLink>
                    <NavLink
                        to = "/"
                        className = { isMenu ? classes.Menu_Link : 
                            classes.Nav_Link_Auth }
                            onClick = { close }>
                        Analytics
                    </NavLink>
                    <NavLink
                        to = "/"
                        className = { isMenu ? classes.Menu_Link : 
                            classes.Nav_Link_Auth }
                            onClick = { close }>
                        Settings
                    </NavLink>
                </div>
                <div className = { isMenu ? classes.Menu_Links_Main2 :
                    classes.Nav_Links_Auth_Highlighted }
                    onClick = { close }>
                    <NavLink
                        to = "/"
                        className = 
                            { [ classes.Nav_Link_Auth, classes.Nav_Link_Auth_Contact ] 
                                .join(' ')}
                        onClick = { close }>
                        Contact Us
                    </NavLink>
                    <NavLink
                        to = "/"
                        className = 
                            { [ classes.Nav_Link_Auth, classes.Nav_Link_Auth_Logout ]
                                .join(' ') }>
                        Logout
                    </NavLink>
                </div>
            </div>
        )
    } else {
        // non auth links
        links = (
            <div className = { isMenu ? classes.Menu_Links : classes.Nav_Links }>
                <NavLink
                    to = "/signup"
                    className = { isMenu ? classes.Menu_Link : classes.Nav_Link }
                    onClick = { close }>
                    Sign Up
                </NavLink>
                <NavLink
                    to = "/signin"
                    className = { isMenu ? classes.Menu_Link : classes.Nav_Link}
                    onClick = { close }>
                    Sign In
                </NavLink>
                <NavLink
                    to = "/"
                    className = 
                        { isMenu ? classes.Menu_Link : 
                            [ classes.Nav_Link, classes.Nav_Learn_More ].join(' ') }
                            onClick = { close }>
                    Learn More
                </NavLink>
            </div>
        )
    }

    return links // if we return null there was an error
}

export default navLinks