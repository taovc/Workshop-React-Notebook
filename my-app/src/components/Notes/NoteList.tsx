import NoteModel from "./NoteModel";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

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

const NoteList = (props: { setNotes: any }) => {
  const notes = require("../../db.json");
  useEffect(() => {}, [notes]);
  props.setNotes(notes.notes);

  return (
    <div>
      <NoteTitle />
      <div className="note-bg">
        <ListGroup>
          {notes.notes.map((note: NoteModel) => (
            <ListGroup.Item
              action
              variant="secondary"
              className="note-item"
              key={note.id}
              onClick={() => {
                console.log("clicked");
              }}
            >
              {note.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button
          variant="secondary"
          style={{
            position: "absolute",
            bottom: "200px",
            height: "50px",
            width: "200px",
          }}
          href="/"
        >Home</Button>
      </div>
    </div>
  );
};

export default NoteList;
