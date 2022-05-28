import "./App.css";
import {Navbar,Footer,Sidebar,ScrollToTop} from "./components";
import {Routes,Route} from "react-router-dom";
import {Homepage,Videolisting,Login,Signup,SingleVideoPage} from "./pages";



function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-main">
        <Sidebar />
        <div className="app-content">
          <ScrollToTop>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/videos" element={<Videolisting />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="video/:_id" element={<SingleVideoPage />}></Route>
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
          </ScrollToTop>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
