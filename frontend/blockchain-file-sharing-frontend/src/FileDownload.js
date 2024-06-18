import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { getUserName, getAccessList, getAllUploadedFiles } from './blockchain';

function FileDownload() {
  const location = useLocation();
  const { publicKey, role } = location.state;
  const [username, setUsername] = useState('');
  const [accessibleFiles, setAccessibleFiles] = useState([]);

  useEffect(() => {
    // Fetch username
    const fetchUsername = async () => {
      const username = await getUserName(publicKey);
      setUsername(username);
    };

    // Fetch files with access
    const fetchAccessibleFiles = async () => {
      // Fetch all files and filter by access
      const allFiles = await getAllUploadedFiles();
      const filesWithAccess = await Promise.all(allFiles.map(async file => {
        const accessList = await getAccessList(file.fileName);
        if (accessList.includes(publicKey)) {
          return file.fileName;
        }
        return null;
      }));
      setAccessibleFiles(filesWithAccess.filter(file => file !== null));
    };

    fetchUsername();
    fetchAccessibleFiles();
  }, [publicKey]);

  return (
    <Container>
      <Row>
        <Col>
          <h2>File Download</h2>
          <p>Username: {username}</p>
          <p>Public Key: {publicKey}</p>
          <p>Role: {role === '1' ? 'Data Requester' : 'Unknown'}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Accessible Files</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>File Name</th>
              </tr>
            </thead>
            <tbody>
              {accessibleFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default FileDownload;