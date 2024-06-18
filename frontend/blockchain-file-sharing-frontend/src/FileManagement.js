import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { getAllUsers, grantAccess, uploadFile, getUserFiles, getAccessList, getUserName } from './blockchain';

function FileManagement() {
  const location = useLocation();
  const { publicKey, role } = location.state;
  const [username, setUsername] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dataRequesters, setDataRequesters] = useState([]);

  useEffect(() => {
    // Fetch all users and set data requesters
    const fetchUsers = async () => {
      const users = await getAllUsers();
      const requesters = users.filter(user => user.role === '1'); // Filter data requesters
      setDataRequesters(requesters);
    };

    // Fetch user files and username
    const fetchFilesAndUsername = async () => {
      const username = await getUserName(publicKey);
      setUsername(username);

      const files = await getUserFiles(publicKey);
      const filesWithAccess = await Promise.all(files.map(async file => {
        const accessList = await getAccessList(file.fileName);
        return { name: file.fileName, requester: accessList.length > 0 ? accessList[0] : 'Not Authorized' };
      }));
      setUploadedFiles(filesWithAccess);
    };

    fetchUsers();
    fetchFilesAndUsername();
  }, [publicKey]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file.name).then(() => {
        const newFile = {
          name: file.name,
          requester: 'Not Authorized'
        };
        setUploadedFiles([...uploadedFiles, newFile]);
      }).catch(console.error);
    }
  };

  const handleGrantAccess = (fileIndex, requesterAddress) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[fileIndex].requester = requesterAddress;
    setUploadedFiles(updatedFiles);

    // Call blockchain function to grant access
    grantAccess(publicKey, requesterAddress, updatedFiles[fileIndex].name);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>File Management</h2>
          <p>Username: {username}</p>
          <p>Public Key: {publicKey}</p>
          <p>Role: {role === '0' ? 'Data Owner' : 'Unknown'}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formFileUpload">
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Uploaded Files</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Data Requester Access</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>
                    <Form.Select
                      value={file.requester}
                      onChange={(e) => handleGrantAccess(index, e.target.value)}
                    >
                      <option value="Not Authorized">Not Authorized</option>
                      {dataRequesters.map(requester => (
                        <option key={requester.publicKey} value={requester.publicKey}>
                          {requester.username}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default FileManagement;