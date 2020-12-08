import React from 'react'
import './layout.css'
import MenuList from "../main/menu-list/MenuList";

const Layout = ({menu, handle}) => {
    return (
        <div className="layout active__layout">
            <MenuList menu={menu} handle={handle}/>
        </div>
    )
}

export default Layout
