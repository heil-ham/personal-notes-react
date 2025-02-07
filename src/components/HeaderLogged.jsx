import { Link } from "react-router-dom"
import { BsTranslate } from "react-icons/bs"
import { BsMoon,BsSun } from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"
import { useContext } from "react"
import { LangContext, ThemeContext } from "../context/localeContext"
import PropTypes from "prop-types"

function HeaderLogged({username, logoutHandler}) {
    const {theme, ToggleTheme} = useContext(ThemeContext)
    const {language, ToggleLang} = useContext(LangContext)

    console.log(language)
    console.log(theme)
    return <header>
        <h1><Link to={'/'}>{language === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
        <nav className="navigation">
            <ul>
                <li><Link to={"/archives"}>{language === 'id' ? 'Arsip' : 'Archive'}</Link></li>
            </ul>
        </nav>
        <button className="toggle-locale" onClick={ToggleLang}><BsTranslate/></button>
        <button className="toggle-theme" onClick={ToggleTheme}>{theme === 'dark' ? <BsMoon /> : <BsSun/>}</button>
        <button className="button-logout" onClick={logoutHandler}><BiLogOut/>{username}</button>
    </header>
}

HeaderLogged.propTypes = {
    username : PropTypes.string.isRequired,
    logoutHandler : PropTypes.func.isRequired
}

export default HeaderLogged