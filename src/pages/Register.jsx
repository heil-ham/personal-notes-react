import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useInput from "../hooks/customHooks"
import { register } from "../utils/api"
import { LangContext } from "../context/localeContext"

function Register() {
    const [name, nameChangeHandler] = useInput('')
    const [email, emailChangeHandler] = useInput('')
    const [password, passwordChangeHandler] = useInput('')
    const [confirmPassword, confirmPasswordChangeHandler] = useInput('')

    const {language, setLanguage} = useContext(LangContext)
    
    const navigate = useNavigate()

    function registerHandler(event) {
        event.preventDefault()
        
        if (password !== confirmPassword) {
            alert("Password tidak sama")
        } else {
            register({name, email, password}).then(({error}) => {
                if (!error) {
                    navigate('/')
                }
            })

        }

    }



    return (
        <section className="register-page">
            <h2>{language === 'id' ? 'Isi untuk daftar' : 'Fill up to register'}</h2>
            <div className="input-register">
                <form onSubmit={registerHandler}>
                <label htmlFor="name">{language === 'id' ? 'Nama' : 'Name'}</label>
                <input type="text" name="name" id="name" required onChange={nameChangeHandler} value={name}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required onChange={emailChangeHandler} value={email} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required onChange={passwordChangeHandler} value={password} />
                <label htmlFor="confirm-password">{language === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
                <input type="password" name="confirm-password" id="confirm-password" required onChange={confirmPasswordChangeHandler} value={confirmPassword} />
                <button>Register</button>
                </form>
            </div>
            <p>{language === 'id' ? 'Sudah punya akun ?' : 'Already have an account ?'} <Link to={'/'}>Login</Link></p>
        </section>
    )
}

export default Register