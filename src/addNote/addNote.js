import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import API from '../API'
import NoteContext from "../NoteContext"
import './addNote.css'
import ValidationError from './ValidationError'
import PropTypes from 'prop-types'
import NoteErr from '../NoteError/NoteError'


class addNote extends React.Component{
static propTypes={
  value: PropTypes.string,
  touched: PropTypes.bool
}
    static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NoteContext

  constructor(props){
    super(props);
    this.state ={
      name: {
        value: '',
        touched: false
      },
      content: {
        value: ''
      },
      folder: {
        value: null,
        touched: false
      }
    }
  }

  updateName(name){
    this.setState({ name: {value:  name, touched: true }})
  }

  updateFolder(folder){
    this.setState({ folder: { value: folder, touched:true}})
  }

  validateName() {
    const name= this.state.name.value.trim();
      if(name.length === 0){
        return 'Name is Required';
      }
  }

  validateFolder(){
    const folder= this.state.folder.value;
      if(folder === null ){
        return'You must select a folder';
      }
  }
 

  handleCreateNote = event => {
    event.preventDefault()
    const createNewNote = {
      note_name: event.target['note-name'].value,
      content: event.target['note-content'].value,
      folder_id: event.target['note-folder-id'].value,
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
        this.props.history.push(`/folders/${note.folder_id}`)
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
                      <NoteErr>
                          <label htmlFor='note-name-input'>
                          Name
                          </label>
                          <input type='text' id='note-name-input' name='note-name' onChange={ e => this.updateName(e.target.value)} />
                        { this.state.name.touched && <ValidationError message ={this.validateName()} />}
                      </NoteErr>
                    </div>
                    <div className='field'>
                      <NoteErr>
                          <label htmlFor='note-content-input'>
                          Content
                          </label>
                          <textarea id='note-content-input' name='note-content' />
                      </NoteErr>
                    </div>
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                        Folder
                        </label>
                        <NoteErr>
                          <select id='note-folder-select' name='note-folder-id' onChange={e => this.updateFolder(e.target.folder)}>
                          <option value={null}>...</option>
                          {folders.map(folder =>
                              <option key={folder.id} value={folder.id}>
                                {folder.folder_name}
                          </ option> )}
                          </select> 
                          
                        </NoteErr>
                    </div>
                     <ValidationError message={this.validateFolder()} />
                    <div className='addNote-buttons'>
                      <button type='submit' disabled ={this.validateName() || this.validateFolder()}  >
                        Add Note
                      </button>
                    </div>
                </NotefulForm>
            </section>

      )
  }
}

export default addNote