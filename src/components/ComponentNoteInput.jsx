/* eslint react/prop-types: 0 */
import React from "react";

class ComponentNoteInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title:'',
            body:''
        }

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this)
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onTitleChangeHandler(event) {
        if (event.target.value.length <= 50) {
            this.setState({
                title: event.target.value
            })
        }
        console.log(this.state)
    }
    
    onBodyChangeHandler(event) {
        this.setState({
            body: event.target.value
        })
        console.log(this.state)
    }
    
    onSubmitHandler(event) {
        event.preventDefault()

        this.setState({
            title: '',
            body:''
        })
        this.props.addToNoteList(this.state)
    }

    render() {
        return (
        <div className="note-input" onSubmit={this.onSubmitHandler}>
            <h2>Buat Catatan</h2>
            <form action="">
                <p className="note-input__title__char-limit">Sisa karakter : {50 - this.state.title.length}</p>
                <input className="note-input__title" placeholder="Ini adalah judul" type="text" name="" id="" required value={this.state.title} onChange={this.onTitleChangeHandler} />
                <textarea className="note-input__body" name="" id="" placeholder="Tuliskan catatanmu di sini ..." required value={this.state.body} onChange={this.onBodyChangeHandler}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
        ) 
    }
}

export default ComponentNoteInput