import React from 'react'

import RequestForm from '../../../containers/Forms/RequestInfo/RequestInfo'

import classes from './Header.module.css'

const Header = props => {
    let header = null
    switch ( props.type ) {
        case( 'home' ):
            header = (
                <div className = { classes.Home_Header }>
                    <h1 className = { classes.Home_Heading }>
                        Organize
                    </h1>
                    <h1 className = { classes.Home_Heading }>
                        Optimize
                    </h1>
                    <p className = { classes.Home_Tag }>
                        Manage your time well. Have more time for what you love.
                    </p>
                    <RequestForm />
                </div>
            )
            break
        default:
            header = <h1>{ props.title }</h1>
    }

    return header
}

export default Header