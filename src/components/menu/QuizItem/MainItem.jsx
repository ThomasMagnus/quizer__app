import React from 'react'
import './mainItem.css'
import {Link} from "react-router-dom";

const MainItem = () => {
    return (
        <div className="quiz__list-wrapper">
            <ul className="main__list">
                <li className="main__item">
                    <Link to="/quizList">Список тестов</Link>
                </li>
                <li className="main__item">
                    <Link to="/authorisation">Авторизация</Link>
                </li>
                <li className="main__item">
                    <Link to="/quizCreator">Создать тест</Link>
                </li>
            </ul>
        </div>
    )
}

export default MainItem
