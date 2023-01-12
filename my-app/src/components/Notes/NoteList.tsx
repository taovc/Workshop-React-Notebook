import NoteModel from "./NoteModel";
import ListGroup from "react-bootstrap/ListGroup";
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

const NoteList = (props: { notes: any }) => {
  return (
    <div>
      <NoteTitle />
      <div className="note-bg">
        <ListGroup>
          {props.notes.map((note: NoteModel) => (
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
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default NoteList;
