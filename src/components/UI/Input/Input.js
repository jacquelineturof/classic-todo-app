import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    // Set up input icon and label if input has them
    let icon = null;

    if (props.iconClassName) {
        icon = (
            <div className = { classes.Icon_Container }>
                <FontAwesomeIcon 
                    icon = { [ props.faPrefix, props.iconClassName ] } 
                    className = { classes.Input_Icon } />
            </div>
        )
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            { icon } 
            {inputElement}
        </div>
    );

};

export default input;