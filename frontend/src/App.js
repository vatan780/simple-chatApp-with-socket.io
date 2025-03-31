import { Button } from "@chakra-ui/react";
// import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './Pages/Home'
import ChatPage from './Pages/ChatPage'
import './App.css'
import { useEffect } from "react";


function App() {


 
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={<ChatPage />} />
          </Routes>
        </Router>

      </div>

    </>

  );
}

export default App;
