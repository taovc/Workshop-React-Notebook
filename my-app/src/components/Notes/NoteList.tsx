import NoteModel from "./NoteModel";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import noteCrud from "./NoteService";

const NoteTitle = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#282c34",
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          width: "100%",
          marginTop: "0px",
        }}
      >
        Notes
      </h1>
    </div>
  );
};

const NoteCreate = (props: { setCreate: any }) => {
  let note: NoteModel = {
    id: "0",
    title: "",
    content: "",
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        margin: "auto",
        marginTop: "-35%",
      }}
    >
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
        className="btn btn-primary"
        style={{
          position: "relative",
          left: "40%",
        }}
        onClick={() => {
          props.setCreate(false);
          noteCrud.CreateNote(note);
        }}
      >
        Create
      </button>
    </div>
  );
};

const NoteList = () => {
  const [creating, setCreate] = useState(false);
  const notes = noteCrud.ReadNotes();

  return (
    <div>
      <NoteTitle />
      <div className="note-bg">
        <ListGroup>
          {notes.map((note: NoteModel) => (
            <div key={note.id}>
              <ListGroup.Item
                action
                variant="secondary"
                className="note-item"
                key={note.id}
                onClick={() => {
                  window.location.href = `/notes/${note.id}`;
                }}
              >
                {note.title}
              </ListGroup.Item>
              <Button
                variant="danger"
                style={{
                  position: "absolute",
                  marginTop: "-40px",
                  left: "60%",
                }}
                onClick={() => {
                  noteCrud.DeleteNote(note.id);
                }}
              >
                Delete {note.title}
              </Button>
            </div>
          ))}
        </ListGroup>
        <Button
          variant="primary"
          style={{
            position: "absolute",
            bottom: "200px",
            height: "50px",
            width: "200px",
            left: "50%",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </Button>
        <Button
          variant="secondary"
          style={{
            position: "absolute",
            bottom: "200px",
            height: "50px",
            width: "200px",
            left: "37%",
          }}
          onClick={() => {
            setCreate(true);
          }}
        >
          Create
        </Button>
      </div>
      {creating ? <NoteCreate setCreate={setCreate} /> : null}
    </div>
  );
};

export default NoteList;
