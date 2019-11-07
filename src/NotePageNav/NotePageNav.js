import React from 'react'
import NavButton from '../Button/Button'
import NoteContext from '../NoteContext'
import {findNote, findFolder} from '../notes-helpers'
import './NotePageNav.css'
import PropTypes from 'prop-types'


class NotePageNav extends React.Component {
static propTypes={
  noteId: PropTypes.string
}

  static defaultProps = {
    history: {
      goBack: () => { }
    }
  }
  static contextType = NoteContext
  render(){
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
  return (
    <div className='NotePageNav'>
      <NavButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <br />
        Back
      </NavButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
}
}

export default NotePageNav
