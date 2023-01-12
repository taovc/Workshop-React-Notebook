import Note from "./NoteModel";

class NoteCrud {
  CreateNote = (note: Note) => {
    // Create a note
    let notes: Note[] = [];
    if (localStorage.getItem("notes") === null) {
      notes = [];
      note.id = "1";
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      notes = JSON.parse(localStorage.getItem("notes") || "[]");
      note.id = (notes.length + 1).toString();
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
    window.location.reload();
  };
  ReadNotes = (): any => {
    // Read all notes
    let notes: Note[] = [];
    if (localStorage.getItem("notes") === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem("notes") || "[]");
    }
    return notes;
  };
  UpdateNote = (notes: Note[], id: string, note: Note) => {
    // update a note
    notes[parseInt(id) - 1] = note;
    localStorage.setItem("notes", JSON.stringify(notes));
  };
  DeleteNote = (id: string) => {
    // delete a note
    let notes: Note[] = [];
    if (localStorage.getItem("notes") === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem("notes") || "[]");
      notes.forEach((note: Note, index: number) => {
        if (note.id === id) {
          notes.splice(index, 1);
        }
      });
      localStorage.setItem("notes", JSON.stringify(notes));
    }
    window.location.reload();
  };
}

const noteCrud = new NoteCrud();

export default noteCrud;
