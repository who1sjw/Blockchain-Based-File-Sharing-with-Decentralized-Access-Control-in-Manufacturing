# Blockchain-Based-File-Sharing-with-Decentralized-Access-Control-in-Manufacturing

In the aftermath of the COVID-19 pandemic, the manufacturing industry has seen a surge in ransomware attacks, posing a significant threat to data security and operational continuity. Manufacturers frequently need to share sensitive information with customers, suppliers, and other supply chain partners, making their data vulnerable to unauthorized access, tampering, and potential extortion.
To address these challenges, we present a blockchain-based file-sharing system designed specifically for the manufacturing industry. This solution leverages the inherent properties of blockchain technology to establish a secure, decentralized, and auditable data-sharing environment.

I use Ganache to simulate a blockchain network, React.js for the front end, and Python with the Brownie framework to deploy and manage our smart contracts.

---

**Project Overview**

1. **Frontend (React.js)**
   - **Components:**
     - User Registration
     - User Login
     - File Management
     - File Download
   - **State Management:**
     - useState, useEffect
   - **Routing:**
     - React Router for navigation between components

2. **Backend (Smart Contracts)**
   - **Technologies:**
     - Solidity for smart contracts
     - Brownie for deployment and testing
   - **Key Smart Contracts:**
     - FileSharing: Manages user registration, file uploads, and access control

3. **Blockchain Network**
   - **Simulation:**
     - Ganache for local blockchain simulation
   - **Interaction Tools:**
     - Metamask for connecting to the blockchain
     - Ethers.js for interacting with smart contracts

4. **Deployment and Testing**
   - **Tools:**
     - Python and Brownie for deploying and managing smart contracts
     - Ganache CLI for local blockchain instance
     - Brownie console for testing and verification
