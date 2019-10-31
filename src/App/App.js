import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import addNewFolder from '../addNewFolder/addNewFolder'
import addNote from '../addNote/addNote'
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NoteContext from '../NoteContext'
import API from '../API'
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
        notes: [],
        folders: []
    };
}
    componentDidMount() {
        
        Promise.all([
            fetch(`${API.API_ENDPOINT}/notes`),
            fetch(`${API.API_ENDPOINT}/folders`)
        ])
        .then(([notesResult, foldersResult]) => {
            if (!notesResult.ok)
              return notesResult.json().then(e => Promise.reject(e))
            if (!foldersResult.ok)
              return foldersResult.json().then(e => Promise.reject(e))
    
            return Promise.all([
              notesResult.json(),
              foldersResult.json(),
            ])
          })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }
    
    handleAddFolder = folder => {
        this.setState({
          folders: [
            ...this.state.folders,
            folder
          ]
        })
      }
    
      handleCreateNote = note => {
        this.setState({
          notes: [
            ...this.state.notes,
            note
          ]
        })
      }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component ={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component ={NoteListMain}
                       
                    />
                ))}
                <Route
                    path="/note/:noteId" component={NotePageMain}
                />
                 <Route
                    path="/add-folder" component={addNewFolder}
                />
                 <Route
                    path="/add-note" component={addNote}
                />
            </>
        );
    }

    render() {
        const contextValue={
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            createNote: this.handdleCreateNote
        }
        return (
           <NoteContext.Provider value={contextValue}> 
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}       
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
           </NoteContext.Provider> 
        );
    }
}

export default App;
