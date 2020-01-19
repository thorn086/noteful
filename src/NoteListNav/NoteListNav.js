import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import NavButton from '../Button/Button'
import { countNotesForFolder } from '../notes-helpers'
import NoteContext from '../NoteContext'
import './NoteListNav.css'

class NoteListNav extends React.Component {
 static contextType=NoteContext
 
 render(){
  const { folders, notes }=this.context
  return (
    
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folders/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(notes, folder.id)}
              </span>
              {folder.folder_name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <NavButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <br />
          Folder
        </NavButton>
      </div>
    </div>
  )
}
}
export default NoteListNav
