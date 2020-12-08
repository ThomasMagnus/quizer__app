import React from 'react'
import './select.css'

const Select = (props) => {
    const state = {
        value: ['1', '2', '3', '4'],
    }

    return (
        <>
        <p className="select__title">Выберите правильный ответ</p>
        <select className="form__select" name="answers"
                title="Выберете правильный ответ"
                onChange={(e) => props.handler(e.target)}>
            {state.value.map((item, i) => <option key={i} className="form__option" value={item}>{+item}</option>)}
        </select>
        </>
    )
}

export default Select
