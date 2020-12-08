import React from 'react'
import './menuList.css'
import {NavLink} from "react-router-dom";

const MenuList = ({menu, handle}) => {

    return (
        <ul className="menu__list active__menu">
            {
                menu.lists.map((item, i) => (
                    <li className="menu__item" key={i} onClick={handle}>
                        <NavLink to={item.to} className="item__link">{item.label}</NavLink>
                    </li>
                ))
            }
        </ul>
    )
}

export default MenuList
