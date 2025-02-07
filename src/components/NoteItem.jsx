import { Link } from "react-router-dom"
import HTMLReactParser from "html-react-parser/lib/index"
import PropTypes from "prop-types"
import { showFormattedDate } from "../utils"
import { useContext } from "react"
import { LangContext } from "../context/localeContext"

function NoteItem( { id, title, createdAt, body }) {
    const {language} = useContext(LangContext)

    return <section className="note-item">
        <h3 className="note-item__title"><Link to={`/notes/${id}`}>{title}</Link></h3>
        <p className="note-item__createdAt">{showFormattedDate(createdAt,language)}</p>
        <p className="note-item__body">{HTMLReactParser(body)}</p>
    </section>
}

export default NoteItem

NoteItem.propTypes = {
    id : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    createdAt : PropTypes.string.isRequired,
    body : PropTypes.string.isRequired
}