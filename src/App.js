import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import styled from "styled-components";

const Box = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
