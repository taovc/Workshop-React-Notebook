import NoteModel from "./NoteModel";

// display the details page for note, and u can update the note.

const NoteDetail = (notes: NoteModel | any) => {
  console.log(notes);
  return <div>
    <h1>Details</h1>
  </div>;
};

export default NoteDetail;
