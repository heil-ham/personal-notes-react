/* eslint react/prop-types: 0 */
import React from "react";

class ComponentHeader extends React.Component {
    constructor(props) {
        super(props)

        this.onSearchHandler = this.onSearchHandler.bind(this)
    }

    onSearchHandler(event) {
        this.props.searchNoteList(event.target.value)
    }

    render () {
        return <div className="note-app__header">
            <h1>Catatan</h1>
            <form action="">
                <input type="text" name="pencarian" id="pencarian" placeholder="Cari catatan..." onChange={this.onSearchHandler}/>
            </form>
        </div>
    }
}

export default ComponentHeader