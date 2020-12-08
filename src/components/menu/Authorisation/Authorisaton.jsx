import React from 'react'
import './authorisation.css'
import Input from "../../Input/Input";
import { postData } from "../../sevices/postData";

class Authorisaton extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.target = ''
        this.url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHMaKuVv5ylgcCx41jbJnt_fYJtcih94g'
    }

    state = {
        valid: false,
        classes: {
            email: ['authorisation__input', 'email'],
            password: ['authorisation__input', 'password'],
        },
        validForm: {
            email: {
                value: '',
                type: 'email',
                label: 'Введите email:',
                errorMessage: 'Введите валидный email',
                valid: false,
                touched: false,
                validation: {
                    email: true,
                    require: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Введите пароль:',
                errorMessage: 'Введите валидный пароль',
                valid: false,
                touched: false,
                validation: {
                    password: true,
                    require: true,
                }
            }
        }
    }

    onChangeInput = (input) => {
        if (input.type === 'email') {
            const validEmail = /^\w+@\w+\.\w{2,}$/;
            if (validEmail.test(input.value)) {
                this.setState({valid: true})
                this.target = ''
            } else {
                this.setState({valid: false})
                this.target = input
            }
        }
    }

    renderInputs() {
        return (
            Object.keys(this.state.validForm).map((controlName, i) => {
                const control = this.state.validForm[controlName]
                return (
                        <Input
                            key={i}
                            type={control.type}
                            label={control.label}
                            valid={this.state.validForm.email.valid}
                            handlerDetect={this.onChangeInput}
                            class={this.state.classes}
                        />
                )
            })
        )
    }

    componentDidMount() {
        this.password = document.querySelector('.password')
        this.errorMail = document.querySelector('.error__mail')
        this.email = document.querySelector('.email')
        this.password = document.querySelector('.password')
    }

    changeClick = (e) => {
        e.preventDefault()
        if (!this.state.valid) {
            try {
                this.errorMail.remove()
                this.errorMail.style.border = '1px solid #f9ae09'
            } catch (e){}
            const div = document.createElement('div')
            div.classList.add('error__mail')
            div.textContent = `Вы ввели не валидный email`
            try {
                this.target.style.border = '1px solid red'
                this.target.after(div)
            } catch (e) {}
        }
        if (this.password.value.length < 6) {
            try {
                this.password.remove()
                this.password.style.border = '1px solid #f9ae09'
            } catch (e){}
            const div = document.createElement('div')
            div.classList.add('error__password')
            div.textContent = `Введите минимум 6 символов`
            this.password.style.border = '1px solid red'
            this.password.parentElement.after(div)
        }
    }

    reqistrate = async (e) => {
        e.preventDefault()
        await postData(this.url, {
            email: this.email.value,
            password: this.password.value,
            returnSecureToken: true
        })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="authorisation__wrapper">
                <h2 className="authorisation__title">Авторизация</h2>
                <form className="authorisation__form">
                    <div className="authorisation__inputs">
                        {this.renderInputs()}
                        <button className="btn__enter" type="submit"
                                onClick={this.changeClick}>Войти</button>
                        <button className="btn__register" type="submit" onClick={this.reqistrate}>Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Authorisaton
