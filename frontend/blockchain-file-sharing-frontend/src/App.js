import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import UserRegistration from './UserRegistration';
import UserLogin from './Login';
import FileManagement from './FileManagement';
import FileDownload from './FileDownload';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Blockchain Based Access Control File Sharing System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/upload">File Management</Nav.Link>
                <Nav.Link as={Link} to="/download">File Download</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/upload" element={<FileManagement />} />
            <Route path="/download" element={<FileDownload />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;