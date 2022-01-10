import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Home";
import Settings from "./Settings";
import About from "./About";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return(
    <div className="container">
      <Header/>

      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/About" element={<About/>}/>
          </Routes>
        </BrowserRouter>
      </div>

      <Footer/>

    </div>
  );
}
