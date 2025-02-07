import React from "react";
import ComponentHeader from "./ComponentHeader";
import ComponentNoteInput from "./ComponentNoteInput";
import ComponentActiveNote from "./ComponentActiveNote";
import { getInitialData } from "../utils";

class ComponentApp extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            noteList: getInitialData(),
            query: ''
        }
    }

    addToNoteList = (newNote) => {
        this.setState((prevState) => (
            {
                noteList: [
                    ...prevState.noteList,
                    {
                        id: Date.now(),
                        title: newNote.title,
                        body: newNote.body,
                        createdAt: new Date().toISOString(),
                        archived: false,
                    }
                ]
            }
        ))
    }

    deleteFromNoteList = (id) => {
        const newNotes = this.state.noteList.filter((note) => note.id !== id)
        this.setState(() => (
            {
                noteList: newNotes
            }
        ))
    }

    changeArchiveFromNoteList = (id) => {
        const foundNote = this.state.noteList.filter((note) => note.id == id)[0]
        const index = this.state.noteList.indexOf(foundNote)
        
        let notes = [...this.state.noteList]
        let notesItem = {...notes[index]}
        notes[index] = notesItem

        notesItem.archived = !notesItem.archived
        console.log(notesItem)
        console.log(notes)
        
        this.setState(() => (
            {
                noteList: notes
            }
        ))
    }

    searchNoteList = (query) => {
            this.setState(() => (
                {
                    query: query
                } 
            ))
    }

    findActiveAndQueried(){
        return this.state.noteList.filter((note) => note.archived == false && note.title.toUpperCase().includes(this.state.query.toUpperCase()))
    }

    findActive() {
        return this.state.noteList.filter((note) => note.archived == false)
    }

    findArchived() {
        return this.state.noteList.filter((note) => note.archived == true)
    }

    findArchivedAndQueried() {
        return this.state.noteList.filter((note) => note.archived == true && note.title.toUpperCase().includes(this.state.query.toUpperCase()))
    }

    render() {
        return <>
        <ComponentHeader searchNoteList={this.searchNoteList}/>
        <div className="note-app__body">
            <ComponentNoteInput addToNoteList={this.addToNoteList}/>
            <h2>Catatan Aktif</h2>
            {
                this.state.query !== '' ?
                (
                    this.findActiveAndQueried().length == 0 ?
                    <p className="notes-list__empty-message">No Records</p> : 
                    <ComponentActiveNote notes={this.findActiveAndQueried()} deleteFromNoteList={this.deleteFromNoteList} changeArchiveFromNoteList={this.changeArchiveFromNoteList} tombolArsip={"Arsipkan"}/>
                ) : 
                (
                    this.findActive().length == 0 ? 
                    <p className="notes-list__empty-message">No Records</p> : 
                    <ComponentActiveNote notes={this.findActive()} deleteFromNoteList={this.deleteFromNoteList} changeArchiveFromNoteList={this.changeArchiveFromNoteList} tombolArsip={"Arsipkan"}/>
                )
            }
            <h2>Arsip</h2>
            {
                this.state.query !== '' ?
                (
                    this.findArchivedAndQueried().length == 0 ? 
                    <p className="notes-list__empty-message">No Records</p> :
                    <ComponentActiveNote notes={this.findArchivedAndQueried()} deleteFromNoteList={this.deleteFromNoteList} changeArchiveFromNoteList={this.changeArchiveFromNoteList} tombolArsip={"Pindahkan"}/> 
                    
                ) :
                (
                    this.findArchived().length == 0 ? 
                    <p className="notes-list__empty-message">No Records</p> :
                    <ComponentActiveNote notes={this.findArchived()} deleteFromNoteList={this.deleteFromNoteList} changeArchiveFromNoteList={this.changeArchiveFromNoteList} tombolArsip={"Pindahkan"}/> 
                )
            }
            
        </div>
        </>
    }
}

export default ComponentApp