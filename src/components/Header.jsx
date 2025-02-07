import { Link } from "react-router-dom"
import { BsTranslate } from "react-icons/bs"
import { BsMoon,BsSun } from "react-icons/bs"
import { useContext } from "react"
import { ThemeContext,LangContext } from "../context/localeContext"

function Header() {
    const { theme, ToggleTheme} = useContext(ThemeContext)
    const {language, ToggleLang} = useContext(LangContext)

    return <header>
        <Link to={'/'}>
            <h1>{language === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</h1>
        </Link>
        <nav className="navigation">
            <ul>
                <li>
                    <BsTranslate className="toggle-locale" onClick={ToggleLang}/>
                </li>
                <li>
                    {theme === 'dark' ? <BsMoon className="toggle-theme" onClick={ToggleTheme}/> : <BsSun className="toggle-theme" onClick={ToggleTheme}/>}
                </li>
            </ul>
        </nav>
    </header>
}

export default Header