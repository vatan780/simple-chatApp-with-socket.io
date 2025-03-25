import { Button } from "@chakra-ui/react";
// import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import ChatPage from './Pages/ChatPage'
import './App.css'


function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </Router>

      </div>

    </>

  );
}

export default App;
