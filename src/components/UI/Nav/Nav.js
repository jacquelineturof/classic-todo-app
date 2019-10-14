import React from 'react'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Nav.module.css'

/*
    Our nav bar. Links are determined by the auth prop.
*/
const nav = props => {
    // Links for unauthenticated user
    let links = (
        <div className = { classes.Nav_Links }>
            <NavLink
                to = "/"
                className = { classes.Nav_Link }>
                Sign Up
            </NavLink>
            <NavLink
                to = "/"
                className = { classes.Nav_Link }>
                Sign In
            </NavLink>
            <NavLink
                to = "/"
                className = { [ classes.Nav_Link, classes.Nav_Learn_More ].join(' ') }>
                Learn More
            </NavLink>
        </div>
    )
    
    // Links for authenticated user
    if ( props.auth ) {
        links = (
            <div className = { classes.Nav_Links_Auth }>
                <div className = { classes.Nav_Links_Auth_Main }>
                    <NavLink
                        to = "/"
                        className = { classes.Nav_Link_Auth }>
                        Calendar
                    </NavLink>
                    <NavLink
                        to = "/"
                        className = { classes.Nav_Link_Auth }>
                        Add Todo
                    </NavLink>
                    <NavLink
                        to = "/"
                        className = { classes.Nav_Link_Auth }>
                        Analytics
                    </NavLink>
                    <NavLink
                        to = "/"
                        className = { classes.Nav_Link_Auth }>
                        Settings
                    </NavLink>
                </div>
                <div className = { classes.Nav_Links_Auth_Highlighted }>
                    <NavLink
                        to = "/"
                        className = 
                            { [ classes.Nav_Link_Auth, classes.Nav_Link_Auth_Contact ] 
                                .join(' ')}>
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
    }

    return (
        <nav className = { classes.Nav_Bar }>
            <div className = { classes.Nav_Brand }>
                <FontAwesomeIcon 
                    icon = { [ 'fad', 'seedling' ] } 
                    className = { classes.Nav_Icon } />
            </div>
            { links }
        </nav>
    )
}

export default nav