import NotesList from "../components/NotesList"
import SearchBar from "../components/SearchBar"
import { data, useSearchParams } from "react-router-dom"
import { getArchivedNotes } from "../utils/api"
import { useContext, useEffect, useState } from "react"
import { LangContext } from "../context/localeContext"

function Archives() {
  const [searchParams, setSearchParam] = useSearchParams()
  const [filteredArchivedNotes, setFilteredArchivedNotes] = useState([])
  
  const {language} = useContext(LangContext)

  const keyword = searchParams.get("keyword") || ""

  function onChangeKeyword(event) {
    setSearchParam(() => {
      return {
        keyword : event.target.value || "",
      }
    })
  }

  useEffect(() => {
    (async () => {
      getArchivedNotes().then(({error, data}) => {
        const filteredArchivedData = data.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()))
        setFilteredArchivedNotes(filteredArchivedData)
      })
    })()
  },[keyword])  

  return <section className="homepage">
    <h2>{language === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>   
    <SearchBar onChangeKeyword={onChangeKeyword} keyword={keyword}/>
    <NotesList notes={filteredArchivedNotes}/>
  </section>
}

export default Archives