
export const findFolder = (folders=[], folder_id) =>
  folders.find(folder => folder.id === folder_id)

export const findNote = (notes=[], id) =>
  notes.find(note => note.id === id)

export const getNotesForFolder = (notes=[], id) => (
  (!id)
    ? notes
    : notes.filter(note => note.folder_id === id)
)

export const countNotesForFolder = (notes=[], folder_id) =>
  notes.filter(note => note.folder_id === folder_id).length
