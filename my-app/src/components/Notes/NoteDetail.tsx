import NoteModel from "./NoteModel";
import { useParams } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import noteCrud from "./NoteService";

// display the details page for note, and u can update the note.

const NoteDetail = (props: { notes: NoteModel[] }) => {
  const notes = props.notes;
  const { id } = useParams<{ id: string }>();
  if (id === undefined) {
    return <div>404</div>;
  }
  let note = notes[parseInt(id) - 1];

  return (
    <div>
      <h1>Details</h1>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
        <Form.Control
          placeholder="Title"
          aria-label="Title"
          aria-describedby="basic-addon1"
          defaultValue={note?.title}
          onChange={(e) => {
            note.title = e.target.value;
          }}
        />
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Content</InputGroup.Text>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          defaultValue={note?.content}
          onChange={(e) => {
            note.content = e.target.value;
          }}
        />
      </InputGroup>
      <button
        onClick={() => {
          noteCrud.UpdateNote(notes, id, note);
        }}
      >
        Update
      </button>
    </div>
  );
};

export default NoteDetail;
