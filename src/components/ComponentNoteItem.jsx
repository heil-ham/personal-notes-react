/* eslint react/prop-types: 0 */
import { showFormattedDate } from "../utils"

function ComponentNoteItem({ id, title, createdAt, body, deleteFromNoteList, changeArchiveFromNoteList, tombolArsip }) {
    function onDeleteHandler(id) {
        deleteFromNoteList(id)
    }

    function onChangeArchiveHandler(id) {
        changeArchiveFromNoteList(id)
    }

    return <>
        <div className="note-item">
            <div className="note-item__content">
                <h3 className="note-item__title">{title}</h3>
                <p className="note-item__date">{showFormattedDate(createdAt)}</p>
                <p className="note-item__body">{body}</p>
            </div>
            <div className="note-item__action">
                <button className="note-item__delete-button" onClick={() => onDeleteHandler(id)}>Delete</button>
                <button className="note-item__archive-button" onClick={() => onChangeArchiveHandler(id)}>{tombolArsip}</button>
            </div>
        </div>
    </>
}

export default ComponentNoteItem