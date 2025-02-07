import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { login } from "../utils/api"
import { LangContext } from "../context/localeContext"
import useInput from "../hooks/customHooks"
import PropTypes from "prop-types"

function Login({onLoginSuccess}) {
    const {language} = useContext(LangContext)

    const [email, onEmailChangeHandler] = useInput()
    const [password, onPasswordChangeHandler] = useInput()

    function onSubmitHandler(event) {
        event.preventDefault()
        login({email, password}).then(({error, data}) => {
            if (!error) {
                onLoginSuccess(data)
            }
        })
    }
    return (
        <section className="homepage">
            <h2>Login</h2>
            <div className="input-login">
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="add-new-page__input__title" onChange={onEmailChangeHandler} value={email} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={onPasswordChangeHandler} value={password} />
                <button>Login</button>
            </form>
            </div>
            <p>{language === 'id' ? 'Tidak punya akun ?' : 'Don\'t have a account ?'} <Link to={'/register'}>{language === 'id' ? 'Daftar' : 'Sign Up'}</Link></p>
        </section>
    )
}

Login.propTypes = {
    onLoginSuccess : PropTypes.func.isRequired
}

export default Login