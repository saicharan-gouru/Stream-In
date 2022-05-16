import "./App.css";
import {Navbar} from "./components";
import {Routes,Route} from "react-router-dom";
import {Homepage} from "./pages";



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
