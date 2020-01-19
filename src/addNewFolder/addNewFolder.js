import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import API from '../API'
import NoteContext from '../NoteContext'
import ValidationError from '../addNote/ValidationError';
import './addNewFolder.css'
import PropTypes from 'prop-types'
import FolderErr from '../FolderError/FolderError'



class addNewFolder extends React.Component{
  static propTypes={
    value: PropTypes.string,
    touched: PropTypes.bool
  }
  static contextType = NoteContext;

constructor(props){
super(props);
  this.state={
      folderName:{
        value: '',
        touched:false
     },
  };
}

updateFolderName(folderName){
    this.setState({ folderName: { value: folderName, touched:true }})
}

validateFolderName() {
  
      const folderName= this.state.folderName.value.trim();
        if (folderName.length === 0) {
          return ('Folder Name is Required');
        }
}

  handleSubmit = event => {
    event.preventDefault()
    const newFolder = {
      name: event.target['folder-name'].value
    }
    fetch(`${API.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder),
    })
      .then(results => {
        if (!results.ok)
          return results.json().then(e => Promise.reject(e))
        return results.json()
      })
      .then(folder => {
        newFolder.id = folder.id
        this.context.addFolder(folder)
        this.props.history.push(`/folders/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
    <section className='AddFolder'>
        <h2>Create a folder</h2>
       
        <NotefulForm onSubmit={this.handleSubmit}>
            <div className='field'>
              <FolderErr >
                  <label htmlFor='folder-name-input'>
                  Folder Name
                  </label>
            
                  <input type='text' id='folder-name-input' name='folder-name' onChange={e => this.updateFolderName(e.target.value)} />
                
                  {this.state.folderName.touched && <ValidationError message={this.validateFolderName()} />}
              </FolderErr >
            </div>
                  <div className='buttons'>
                  <button type='submit' disabled={this.validateFolderName()}>Add Folder</button>
                  
               
             </div>
        </NotefulForm>
    </section>)}

}

export default addNewFolder

