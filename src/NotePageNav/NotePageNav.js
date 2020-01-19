import React from 'react'
import NavButton from '../Button/Button'
import NoteContext from '../NoteContext'
import {findNote, findFolder} from '../notes-helpers'
import './NotePageNav.css'
import PropTypes from 'prop-types'


class NotePageNav extends React.Component {
static propTypes={
  id: PropTypes.number
}

  static defaultProps = {
    history: {
      goBack: () => {}
    }
  }
  static contextType = NoteContext
  render(){
    const { notes, folders, } = this.context
    const { id } = this.props.match.params
    const note = findNote(notes, parseInt(id)) || {}
    const folder = findFolder(folders, note.folder_id)
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
      {note.folder_id && (
        <h3 className='NotePageNav__folder-name'>
          {folder.folder_name}
        </h3>
      )}
    </div>
  )
}
}

export default NotePageNav
