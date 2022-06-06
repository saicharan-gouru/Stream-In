import "./App.css";
import {Navbar,Footer,Sidebar,ScrollToTop,RequiresAuth} from "./components";
import {Routes,Route} from "react-router-dom";
import {Homepage,Videolisting,Login,Signup,SingleVideoPage,History,Likespage} from "./pages";



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
            <Route path="/history" element={<RequiresAuth><History /></RequiresAuth>}></Route>
            <Route path="/liked" element={<RequiresAuth><Likespage /></RequiresAuth>}></Route>
          </Routes>
          </ScrollToTop>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
