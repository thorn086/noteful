import React from 'react'
import { Link } from 'react-router-dom'
import NoteContext from '../NoteContext'
import API from '../API'
import './Note.css'


class Note extends React.Component {
  static defaultProps = {
    notes: [],
    onDeleteNote: () => { },
  }

  static contextType = NoteContext



  handleClickDelete = event => {
    event.preventDefault()
    const id = this.props.id

    fetch(`${API.API_ENDPOINT}/notes/${id}`, {
      method: 'DELETE',
    })
      .then(result => {
        if (!result.ok)
          return result.json().then(event => Promise.reject(event))
      })
      .then(() => {
        this.context.deleteNote(id)
        this.props.onDeleteNote(id)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  render() {
    const { name, id, modified } = this.props

    return (

      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${id}`}>
            {name}
          </Link>
        </h2>

        <button className='Note__delete' type='button' onClick={this.handleClickDelete}>

          remove
      </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
          <div className="Date">{new Date(modified).toUTCString()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Note;