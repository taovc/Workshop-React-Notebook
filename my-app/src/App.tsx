import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useEffect } from "react";
import NoteList from "./components/Notes/NoteList";
import NoteDetail from "./components/Notes/NoteDetail";

function App() {
  useEffect(() => {}, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
