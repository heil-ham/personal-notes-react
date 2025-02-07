import NotesList from "../components/NotesList"
import SearchBar from "../components/SearchBar"
import { FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { getActiveNotes } from "../utils/api"
import { useContext, useEffect, useState } from "react"
import { LangContext } from "../context/localeContext"


function Home() {
  const [searchParams, setSearchParam] = useSearchParams()
  const [filteredActiveNotes, setFilteredActiveNotes] = useState([])
  const [loading, setLoading] = useState(true)

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
      const {error, data } = await getActiveNotes()
      const filteredData = data.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()))
      setFilteredActiveNotes(filteredData)
      setLoading(false)
    })()
  },[keyword])
  

  return loading ? <h1>Loading....</h1>
  : <section className="homepage">
    <h2>{language === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
    <SearchBar onChangeKeyword={onChangeKeyword} keyword={keyword}/>
    <NotesList notes={filteredActiveNotes}/>
    <div className="homepage__action">
      <Link to={"/notes/new"} className="action" title="Tambah"><FiPlus/></Link>
    </div>
  </section>
}

export default Home