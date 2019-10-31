import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import API from '../API'
import NoteContext from '../NoteContext'


class addNewFolder extends React.Component{
    static contextType = NoteContext;

  handleSubmit = event => {
    event.preventDefault()
    const folder = {
      name: event.target['folder-name'].value
    }
    fetch(`${API.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(results => {
        if (!results.ok)
          return results.json().then(e => Promise.reject(e))
        return results.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
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
                <label htmlFor='folder-name-input'>
                Name
                </label>
           
                <input type='text' id='folder-name-input' name='folder-name' />
            </div>
                <div className='buttons'>
                <button type='submit'></button>
                </div>
        </NotefulForm>
    </section>)}

}

export default addNewFolder

