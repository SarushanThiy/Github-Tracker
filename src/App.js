import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RepoInfo from "./components/RepoInfo/Repoinfo";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/:username/:repo" element={<RepoInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
