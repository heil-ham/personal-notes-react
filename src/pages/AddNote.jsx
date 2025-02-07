import { BiSave } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { addNote } from "../utils/api"
import { LangContext } from "../context/localeContext"

function AddNote() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const {language} = useContext(LangContext)

    function onChangeTitle(event) {
        setTitle(() => event.target.value)
    }

    function onInputBody(event) {
        setBody(() => event.target.innerHTML)
    }

    function saveNote() {
        addNote({title, body}).then(({error, data}) => {
            if (!error) {
                navigate("/")  
            }
        })
    }

    return <section className="add-new-page">
        <div className="add-new-page__input">
            <input type="text" name="" id="" className="add-new-page__input__title" placeholder={language === 'id' ? "Catatan Rahasia" : 'Your secret'} onChange={onChangeTitle} value={title} />
            <div className="add-new-page__input__body" contentEditable={true} data-placeholder={language === 'id' ? "Tuliskan rahasia kelam mu" : 'Tell us your darkest secret'} onInput={onInputBody} />
        </div>
        <div className="add-new-page__action">
            <button className="action" title="Simpan" onClick={saveNote}><BiSave/></button>
        </div>
    </section>
}

export default AddNote