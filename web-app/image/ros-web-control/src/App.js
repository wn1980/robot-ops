import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css"

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

      <header></header>
    <main role="main" className="flex-shrink-0">
        <div className="container-fluid">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/About" element={<About/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      </main>

      <div id="speed-label" class="text-center"></div>
      <div id="speed-slider" class="text-center"></div>
      
      <Footer/>

    </div>
  );
}
