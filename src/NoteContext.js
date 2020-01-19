import React from 'react'

const NoteContext = React.createContext({
    notes:[],
    folders:[],
    addFolder: ()=>{},
    createNote: ()=> {},
    deleteNote: ()=>{}
})

export default NoteContext