import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import NoteList from "./components/Notes/NoteList";
import NoteDetail from "./components/Notes/NoteDetail";
import NoteModel from "./components/Notes/NoteModel";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NoteList setNotes={setNotes} />} />
        <Route path="/notes/:id" element={<NoteDetail/>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
