import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import API from '../API'
import NoteContext from "../NoteContext"
import './addNote.css'

class addNote extends React.Component{
    static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NoteContext

  handleCreateNote = event => {
    event.preventDefault()
    const createNewNote = {
      name: event.target['note-name'].value,
      content: event.target['note-content'].value,
      folderId: event.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${API.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(createNewNote),
    })
      .then(results => {
        if (!results.ok)
          return results.json().then(e => Promise.reject(e))
        return results.json()
      })
      .then(note => {
        this.context.createNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
    }

      render() {
        const { folders=[] } = this.context
        return (
          <section className='CreateNote'>
            <h2>Create a note</h2>
                <NotefulForm  onSubmit={this.handleCreateNote} >
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                        Name
                        </label>
                        <input type='text' id='note-name-input' name='note-name' />
                    </div>
                    <div className='field'>
                        <label htmlFor='note-content-input'>
                        Content
                        </label>
                        <textarea id='note-content-input' name='note-content' />
                    </div>
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                        Folder
                        </label>
                        <select id='note-folder-select' name='note-folder-id'>
                        <option value={null}>...</option>
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>
                              {folder.name}
                            </ option> 
                        )}
                        </select>     
                    </div>
                    <div className='addNote-buttons'>
                      <button type='submit' >
                        Add Note
                      </button>
                    </div>
                </NotefulForm>
            </section>

      )
  }
}

export default addNote