import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import NoteList from "./components/Notes/NoteList";
import NoteDetail from "./components/Notes/NoteDetail";
import NoteModel from "./components/Notes/NoteModel";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    if (localStorage.getItem("notes") === null) {
      setNotes(require("./db.json").notes);
      localStorage.setItem("notes", JSON.stringify(require("./db.json").notes));
    } else {
      setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NoteList notes={notes} />} />
        <Route path="/notes/:id" element={<NoteDetail notes={notes} />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
