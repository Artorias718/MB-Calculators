import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calculator from './components/Oddsmatcher';
import Dutcher from './components/Dutcher'; 
import Casino from './components/Casino'; 
import Converter from './components/Converter'; 

import backgroundImage from './assets/sic.png'; // Sostituisci con il percorso corretto


import './App.css';

function App() {
  return (
    <Router>
      <>
        <Navbar bg="dark" variant="dark">
          <Container >
            <Navbar.Brand as={Link} to="/">Matched Betting Calculator</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/converter">Converter</Nav.Link>
              <Nav.Link as={Link} to="/oddsmatcher">Oddsmatcher</Nav.Link>
              <Nav.Link as={Link} to="/dutcher">Dutcher</Nav.Link>
              <Nav.Link as={Link} to="/casino">Casino</Nav.Link>

            </Nav>
          </Container>
        </Navbar>

        <Container  className="mt-5 container-padding">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/oddsmatcher" element={<Calculator />} />
            <Route path="/dutcher" element={<Dutcher />} />
            <Route path="/casino" element={<Casino />} />
            <Route path="/converter" element={<Converter />} />

          </Routes>
        </Container>

        <footer className="bg-dark text-white text-center py-3 mt-5">
          © 2024 Sic Calculators
        </footer>
      </>
    </Router>
  );
}

// Pagina Home (puoi personalizzarla)
const HomePage = () => {
  return (
    <div class="homepage">
      
    </div>
  );
}

export default App;