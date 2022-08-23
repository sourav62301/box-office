import React from 'react';
import { Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { Starred } from './pages/Starred';
import {Show} from './pages/Show';
import { ThemeProvider } from 'styled-components';


const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/starred" element={<Starred />} />
      <Route exact path="/show/:id" element={<Show />} />
      <Route element={<div>404 : NOT FOUND </div>} />
    </Routes>
    </ThemeProvider>
  );
}

export default App;
