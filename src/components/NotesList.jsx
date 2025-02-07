import PropTypes, { object } from "prop-types"
import NoteItem from "./NoteItem"

function NotesList( { notes } ) {
    return notes.length > 0 ? <section className="notes-list">
        {notes.map((note) => <NoteItem key={note.id} id={note.id} title={note.title} createdAt={note.createdAt} body={note.body} />)}
    </section> : 
    <section className="notes-list-empty">
        <p className="notes-list__empty">No Records</p>
    </section>
}

export default NotesList

NotesList.propTypes = {
    notes : PropTypes.arrayOf(object).isRequired
}