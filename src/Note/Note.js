import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import NoteContext from '../NoteContext'
import API from '../API'
import './Note.css'

class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }

  static contextType= NoteContext
  
  handleClickDelete = event => {
    event.preventDefault()
    const noteId = this.props.id

    fetch(`${API.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(result => {
        if (!result.ok)
          return result.json().then(event => Promise.reject(event))
        return result.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  render(){
    const {name, id, modified}=this.props
  return (

    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      
      <button className='Note__delete' type='button' onClick={this.handleClickDelete}>
        
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
         
          <div className="Date">{format(new Date(modified), 'do MMM, yyyy')}</div>
        </div> 
     </div>
  </div>
  )
}
}

export default Note