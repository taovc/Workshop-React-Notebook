import Note from "./NoteModel";

class NoteCrud {
  CreateNote = (note: Note) => {
    // Create a new note
  };
  ReadNotes = (): any => {
    // Read all notes
  };
  UpdateNote = (notes: Note[], id: string, note: Note) => {
    // update a note
    notes[parseInt(id) - 1] = note;
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("Note updated");
  };
  DeleteNote = (note: Note) => {
    // delete a note
  };
}

const noteCrud = new NoteCrud();

export default noteCrud;
