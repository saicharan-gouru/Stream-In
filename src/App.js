import "./App.css";
import {Navbar,Footer,Sidebar} from "./components";
import {Routes,Route} from "react-router-dom";
import {Homepage,Videolisting} from "./pages";



function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-main">
        <Sidebar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/videos" element={<Videolisting />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
