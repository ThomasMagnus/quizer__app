import React from 'react'
import './menu.css'

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu__wrapper" onClick={this.props.handle}>
                <div className="menu__line"></div>
                <div className="menu__line"></div>
                <div className="menu__line"></div>
            </div>
        )
    }
}

export default Menu
