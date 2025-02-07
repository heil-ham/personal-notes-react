import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoteDetail from './pages/NoteDetail';
import Archives from './pages/Archives';
import AddNote from './pages/AddNote';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { getUserLogged, putAccessToken, register } from './utils/api';
import HeaderLogged from './components/HeaderLogged';
import { LangContext, ThemeContext } from './context/localeContext';


function App() {
  const [authedUser, setAuthedUser] = useState(null)
  const [initializing, setInitializing] = useState(true)
  const [language, setLanguage] = useState(localStorage.getItem('langContext') || 'id')
  const [theme, setTheme] = useState(localStorage.getItem('themeContext') || 'light')

  function ToggleLang() {
    setLanguage((lang) => {
      const newLang = lang === 'id' ? 'en' : 'id'
      localStorage.setItem('langContext', newLang)
      return newLang
    })
  }

  function ToggleTheme() {
    setTheme((theme) => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('themeContext', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
      return newTheme
    })
  }

  function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken)
    
    getUserLogged().then(({error, data}) => {
      setAuthedUser(data)
    })
  }

  function logoutHandler() {
    putAccessToken('')
    setAuthedUser(null)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    getUserLogged().then(({error, data}) => {
      setInitializing(false)
      setAuthedUser(data)
    })
  },[])

  const themeContextValue = useMemo(() => {
    return {theme, ToggleTheme}
  }, [theme])

  const langContextValue = useMemo(() => {
    return {language, ToggleLang}
  }, [language])

  if (initializing) {
    return <div></div>
  }

  if (authedUser) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LangContext.Provider value={langContextValue}>
          <div className="app-container">
            <HeaderLogged username={authedUser.name} logoutHandler={logoutHandler}/>
            <main>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/archives' element={<Archives/>}/>
                <Route path='/notes/:id' element={<NoteDetail />}/>
                <Route path='/notes/new' element={<AddNote />}/>
                <Route path='*' element={<NotFoundPage />}/>
              </Routes>
            </main>
          </div>
        </LangContext.Provider>
      </ThemeContext.Provider>
    );
  } else {
    console.log(authedUser)
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LangContext.Provider value={langContextValue}>
          <div className="app-container">
            <Header/>
            <main>
              <Routes>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<Login onLoginSuccess={onLoginSuccess}/>}/>
              </Routes>
            </main>
          </div>
        </LangContext.Provider>
      </ThemeContext.Provider>
    );
  }
  
}

export default App;
