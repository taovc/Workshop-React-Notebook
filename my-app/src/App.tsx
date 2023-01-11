import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        todo: add the other routes here
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
