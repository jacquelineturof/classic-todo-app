import React, { Component } from 'react'

import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'

import axios from '../../../axios-backend'

import { checkValidity } from '../../../shared/utility'

import classes from './RequestInfo.module.css'

/*
    Request Info Form. User will provide their email.
    Once email is validated we will send ajax request to backend
    to our send grid setup to send an email to the email address
    provided by the user.
*/
class RequestInfoForm extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: ' Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        }
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

        // Check validity
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid
        }
        this.setState( { controls: updatedControls, formIsValid } )
    }

    // Reset user fields
    resetForm = () => {
        let formControls = { ...this.state.controls }
        formControls.email.value = ''
        this.setState({ controls: formControls })
    }

    submitHandler = async event  => {
        event.preventDefault()
    
        const email = this.state.controls.email.value

        this.resetForm()

        try {
            const response = await axios.get(`request-info/${email}`)
            console.log('response', response)
        } catch (e) {
            console.log(e.message)
        }
    }

    render () {
        // Create form elements from controls on state
        const formElementsArray = [];
        
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        // Build form from form elements
        let form = formElementsArray.map( formElement =>  {
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
                )
        } )

        return (
            <form
                onSubmit = { this.submitHandler }
                className = { classes.Request_Form }>
                { form }
                <Button type = "requestForm">
                    Submit
                </Button>
            </form>
        )
    }
}

export default RequestInfoForm