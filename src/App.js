import "./App.css";
import {Navbar,Footer} from "./components";
import {Routes,Route} from "react-router-dom";
import {Homepage,Videolisting} from "./pages";



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/videos" element={<Videolisting />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
