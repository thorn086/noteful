import React from 'react'
import Note from '../Note/Note'
import NoteContext from '../NoteContext'
import {findNote} from '../notes-helpers'
import './NotePageMain.css'
import PropTypes from 'prop-types'

class NotePageMain extends React.Component {

static propTypes={
  id: PropTypes.number
}

  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NoteContext

  handleDeleteNote = () => {
    this.props.history.push(`/`)
  }

  render(){
    const { notes=[] } = this.context
    const { id } = this.props.match.params
    const note = findNote(notes, parseInt(id)) || { content: '' }
   
  return (  
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.note_name}
        modified={note.modified}
        onDeleteNote={this.handleDeleteNote}
      />
      <div className='NotePageMain__content'>
      {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

export default NotePageMain
