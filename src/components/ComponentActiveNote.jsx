/* eslint react/prop-types: 0 */
// import React from "react";
import ComponentNoteItem from "./ComponentNoteItem";

function ComponentActiveNote({ notes,deleteFromNoteList,changeArchiveFromNoteList, tombolArsip }) {
    return (
            <div className="notes-list">
                {notes.map((note) => (
                    <ComponentNoteItem key={note.id} id={note.id} title={note.title} createdAt={note.createdAt} body={note.body} deleteFromNoteList={deleteFromNoteList} changeArchiveFromNoteList={changeArchiveFromNoteList} tombolArsip={tombolArsip}/>
                )
                )}
            </div>
        );
}

export default ComponentActiveNote