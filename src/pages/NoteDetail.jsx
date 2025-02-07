import { redirect, useNavigate, useParams } from "react-router-dom"
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api"
import { IoArchiveOutline } from "react-icons/io5"
import { HiOutlineTrash } from "react-icons/hi"
import NotFoundPage from "./NotFoundPage"
import { useEffect, useState } from "react"
import HTMLReactParser from "html-react-parser/lib/index"
import NoteNotFound from "./NoteNotFound"

function NoteDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            getNote(id).then(({error, data}) => {
                setNote(data)
                setLoading(false)
            })
        })()
    },[id])


    async function archiveOrActivateHandler() {
        if (note.archived) {
            await unarchiveNote(note.id)
        } else {
            await archiveNote(note.id)
            console.log(note)
        }
        navigate('/')
    }

    async function deleteHandler() {
        await deleteNote(note.id)
        navigate('/')
    }

    if (loading) {
        return <h1>Loading.....</h1>
    }
    
    return note ? <section className="detail-page">
        <h3 className="detail-page__title">{note.title}</h3>
        <p className="detail-page__createdAt">{note.createdAt}</p>
        <div className="detail-page__body">{HTMLReactParser(note.body)}</div>
        <div className="detail-page__action">
            <button className="action" title={note.archived ? 'aktifkan' : 'arsipkan'} onClick={archiveOrActivateHandler}><IoArchiveOutline/></button>
            <button className="action" title='hapus' onClick={deleteHandler}><HiOutlineTrash/></button>
        </div>
    </section> : 
    <NoteNotFound />
}

export default NoteDetail