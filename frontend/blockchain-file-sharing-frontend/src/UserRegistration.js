import React, { useState, useEffect } from 'react';
import { registerUser, getAllUsers } from './blockchain';
import { Form, Button, Alert, Table, Container, Row, Col } from 'react-bootstrap';

function UserRegistration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(0); // Default to DataOwner
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleRegisterUser = async () => {
    try {
      setError(null); // Reset error
      console.log(`Registering user with username: ${username}, email: ${email}, role: ${role}`);
      const { publicKey, privateKey } = await registerUser(username, email, role);
      console.log(`Registered with publicKey: ${publicKey}, privateKey: ${privateKey}`);
      setPublicKey(publicKey);
      setPrivateKey(privateKey);
      await fetchUsers(); // Refresh user list after registration
    } catch (error) {
      console.error("Error registering user:", error);
      setError(error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleName = (role) => {
    if (role === "0") {
      return 'DataOwner';
    } else if (role === "1") {
      return 'DataRequester';
    } else {
      return 'Unknown';
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Register User</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control 
                as="select" 
                value={role} 
                onChange={(e) => setRole(parseInt(e.target.value))}>
                <option value={0}>DataOwner</option>
                <option value={1}>DataRequester</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleRegisterUser} className="mt-3">
              Register
            </Button>
          </Form>
          {publicKey && (
            <Alert variant="success" className="mt-4">
              <p>Public Key: {publicKey}</p>
            </Alert>
          )}
          {privateKey && (
            <Alert variant="info" className="mt-4">
              <p>Private Key (For Demonstration Only): {privateKey}</p>
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Registered Users</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Role Value</th>
                <th>Public Key (Address)</th>
                <th>Private Key (For Demonstration Only)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                console.log(`Displaying user: ${JSON.stringify(user, (key, value) => 
                  typeof value === 'bigint' ? value.toString() : value
                )}`);
                return (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{getRoleName(user.role)}</td>
                    <td>{user.role}</td>  
                    <td>{user.publicKey}</td>
                    <td>{user.privateKey}</td> {/* Display private key */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default UserRegistration;