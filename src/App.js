import './App.css';
import React, { useState } from 'react';
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {

  // Alert.js Setup
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <NoteState> {/*Context API... Wherever we want to use states of context AP, wrap those components in context API i.e. NoteState */}
    <BrowserRouter>
    <Navbar />
    <Alert alert={alert}/>
    <div className="container my-2">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
      <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
    </Routes>
    </div>
  </BrowserRouter>
  </NoteState>
  );
}

export default App;

