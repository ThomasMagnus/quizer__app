import React from 'react'
import './input.css'

const Input = (props) => {
    return (
        <>
            <label className={props.labelClass}>{props.label}
            <input
                id={props.id}
                className={props.type === 'email' ? props.class.email.join(' ') : props.type === 'password'
                    ? props.class.password.join(' ') : props.class}
                type={props.type}
                onInput={(e) => {props.handlerDetect(e.target)}}
                />
            </label>
        </>
    )
}

export default Input
