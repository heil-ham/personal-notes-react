import PropTypes from "prop-types"
import { useContext } from "react"
import { LangContext } from "../context/localeContext"

function SearchBar( {onChangeKeyword, keyword} ) {
      const {language} = useContext(LangContext)
    
    return <section className="search-bar">
        <input type="text" name="" id="" placeholder={language === 'id' ? 'Cari berdasarkan judul ... ' : 'Search by title'} onChange={onChangeKeyword} value={keyword}/>
    </section>
}

export default SearchBar

SearchBar.propTypes = {
    onChangeKeyword : PropTypes.func.isRequired,
    keyword : PropTypes.string.isRequired
}