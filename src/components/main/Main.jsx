import React, {Component} from 'react'
import './main.css'

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="main">
                {this.props.children}
            </main>
        )
    }
}

export default Main
