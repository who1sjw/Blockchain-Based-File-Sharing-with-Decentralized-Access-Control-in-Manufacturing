import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from './blockchain';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const [publicKey, setPublicKey] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null); // Reset error
      console.log(`Logging in with publicKey: ${publicKey}`);
      const role = await getUserRole(publicKey);
      console.log(`Logged in as role: ${role}`);
      if (role === '0') { // Data Owner
        navigate('/upload', { state: { publicKey, role } });
      } else if (role === '1') { // Data Requester
        navigate('/download', { state: { publicKey, role } });
      } else {
        throw new Error('Unknown role');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Login</h2>
          <Form>
            <Form.Group controlId="formPublicKey">
              <Form.Label>Public Key</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your public key" 
                value={publicKey} 
                onChange={(e) => setPublicKey(e.target.value)} 
              />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin} className="mt-3">
              Login
            </Button>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;