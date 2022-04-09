import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
