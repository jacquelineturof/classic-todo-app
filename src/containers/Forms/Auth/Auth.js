import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkValidity } from '../../../shared/utility' 

import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import AuthFormFooter from '../../../components/UI/AuthFormFooter/AuthFormFooter'

import classes from './Auth.module.css'

import * as actions from '../../../store/actions'

export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                label: 'Email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                label: 'Password'
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password'
                },
                value: '',
                validation: {
                    minLength: 6
                },
                valid: false,
                touched: false,
                label: 'Confirm Password'             
            }
        },
        formIsValid: false,
        isSignup: false
    }

    /*
        Load the form that matches the navLink the user
        clicked.
    */
    componentDidMount () {
        this.props.history.location.pathname === '/signup' ?
            this.setState({ isSignup: true }) : this.setState({ isSignup: false })
    }

    /* Toggle to a signup form, set isFormValid back to false
    we don't want validation to carry over if user switches to 
    a different form */
    loginSwitchHandler = () => {
        this.setState({ isSignup: false, isFormValid: false })
    }

    registerSwitchHandler = () => {
        this.setState({ isSignup: true, isFormValid: false })
    }

    // Update state when input is entered from the user
    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                    touched: true
                
            }
        }

        // Make sure all input given by the user is valid
        // the valid property will be used to disable/enable the button
        // on the form
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            // Do not check the confirm password field if we are not
            // dealing with a signup form
            if (!this.state.isSignup && inputIdentifier === 'confirmPassword') {
                continue
            }
            formIsValid = updatedControls[inputIdentifier].valid
        }
        this.setState( { controls: updatedControls, formIsValid } )
    }

    /*
        If isSignup is true
        Make sure password and password confirm are equal
        Display an alert to user on error or success
    */
   submitHandler = ( event ) => {
        event.preventDefault()

        const email = this.state.controls.email.value
        const password = this.state.controls.password.value
        const confirm = this.state.controls.confirmPassword.value
        const signup = this.state.isSignup

        // Confirm password and confirmPassword fields match
        // If they do fire onAuth
        if (this.isPasswordConfirmed( password, confirm )) { 
            // this.props.onAuth( email, password, signup ) 
            this.props.onAuth( email, password, signup)
            // TODO: Set success alert
            this.resetForm()
        }
    }

    /* state alert to inform user of error
        reset password and confirm password values
        leave email address field alone
        Params -> the password and the confirmation password strings
        returns -> a boolean 
    */
   isPasswordConfirmed = (password, confirm) => {
        if (this.state.isSignup && password !== confirm) {
            let formControls = { ...this.state.controls }
            formControls.password.value = ''
            formControls.confirmPassword.value = ''
    
            this.setState({ controls: formControls })
            return false
        }
        return true
    }

    // Reset user fields
    resetForm = () => {
        let formControls = { ...this.state.controls }
        formControls.email.value = ''
        formControls.password.value = ''
        formControls.confirmPassword.value = ''
        this.setState({ controls: formControls })
    }

    render () {
        // Create form elements from controls on state
        const formElementsArray = [];
        
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } )
        }

        // Build form from form elements
        let form = formElementsArray.map( formElement =>  {
            // Only add confirm password field if the form isSignup
            if (formElement.id === 'confirmPassword' && !this.state.isSignup) { return null }
        
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => this.inputChangedHandler( event, formElement.id )}
                    label = { formElement.config.label }
                    faPrefix = { formElement.config.prefix }
                    iconClassName = { formElement.config.icon } />
                )
        } )

        return (
            <section className = { classes.Auth }>
                <h1 className = { classes.Auth_Heading }>
                    { this.state.isSignup ? 'REGISTER' : 'LOGIN'}
                </h1>
                <div className = { classes.Auth_Form_Container }>
                    <div className = { classes.Auth_Image_Container }>
                    </div>
                    <form className = { classes.Auth_Form }>
                        { form }
                        <Button type = "authForm">
                            Submit
                        </Button>
                    </form>
                </div>
                <AuthFormFooter 
                    isSignup = { this.state.isSignup }
                    login = { this.loginSwitchHandler }
                    register = { this.registerSwitchHandler } />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        success: state.auth.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup )),
        onAlertClose: () => dispatch ( actions.authReset() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)