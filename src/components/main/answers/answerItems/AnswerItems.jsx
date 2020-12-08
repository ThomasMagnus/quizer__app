import React, {Component} from 'react'
import './AnswerItems.css'

class AnswerItems extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.questions[this.props.count].firstAnswer.map((item, i) => {
                return (
                    <li id={item.id} className={"main__item" + (this.props.state[item.id] ? this.props.state[item.id] : '')}
                        key={i} onClick={() =>{
                            this.props.handler(item.id, this.props.questions[this.props.count].rightAnswerId, this.props.questions)
                            this.props.yourAnswersArr.push(item.text)
                        }}>{i + 1}. {item.text}</li>
                )
            })
        )
    }

}

export default AnswerItems
