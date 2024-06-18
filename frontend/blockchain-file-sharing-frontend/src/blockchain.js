import { BrowserProvider, Contract, Wallet } from 'ethers';
import FileSharing from './contracts/FileSharing.json';

const contractAddress = '0x977419cCb40065eB5c279C3f0FD40Ee99af5D4CC'; // Use the latest deployed contract address

// Create a BrowserProvider instance
const provider = new BrowserProvider(window.ethereum);

async function getSigner() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  return provider.getSigner();
}

// Store private keys for demonstration purposes (not secure)
const privateKeyStorage = {};

export const registerUser = async (username, email, role) => {
  try {
    // Generate a new wallet for the user
    const newWallet = Wallet.createRandom();
    const userAddress = newWallet.address;  // This is the new public key
    const privateKey = newWallet.privateKey; // This is the private key

    console.log(`Registering user with username: ${username}, email: ${email}, role: ${role}, publicKey: ${userAddress}, privateKey: ${privateKey}`);
    
    // Get the current signer
    const signer = await getSigner();
    
    // Create contract instance with signer
    const contractWithSigner = new Contract(contractAddress, FileSharing.abi, signer);
    
    // Check if the user is already registered to avoid overwriting
    const isRegistered = await contractWithSigner.isUserRegistered(userAddress);
    if (isRegistered) {
      throw new Error('User with this public key is already registered');
    }

    // Call registerUser function from the contract
    const transaction = await contractWithSigner.registerUser(username, email, role, userAddress);
    await transaction.wait();
    console.log(`Transaction successful with hash: ${transaction.hash}`);

    // Store the private key for demonstration purposes
    privateKeyStorage[userAddress] = privateKey;

    return { username, email, role, publicKey: userAddress, privateKey };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    // Use the provider to call the contract method
    const contractWithProvider = new Contract(contractAddress, FileSharing.abi, provider);
    const users = await contractWithProvider.getAllUsers();
    console.log(`Fetched users: ${JSON.stringify(users, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )}`);
    return users.map(user => ({
      username: user.username,
      email: user.email,
      role: user.role.toString(), // Ensure role is a string
      publicKey: user.publicKey,
      privateKey: privateKeyStorage[user.publicKey] || 'N/A' // Retrieve private key from storage
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserRole = async (publicKey) => {
  try {
    const contractWithProvider = new Contract(contractAddress, FileSharing.abi, provider);
    const role = await contractWithProvider.getUserRole(publicKey);
    return role.toString(); // Convert role to string
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};

export const grantAccess = async (ownerPublicKey, requesterPublicKey, fileName) => {
  try {
    const signer = await getSigner();
    const contractWithSigner = new Contract(contractAddress, FileSharing.abi, signer);
    const transaction = await contractWithSigner.grantAccess(ownerPublicKey, requesterPublicKey, fileName);
    await transaction.wait();
    console.log(`Access granted for file: ${fileName}, from owner: ${ownerPublicKey} to requester: ${requesterPublicKey}`);
  } catch (error) {
    console.error("Error granting access:", error);
    throw error;
  }
};

export const uploadFile = async (fileName) => {
  try {
    const signer = await getSigner();
    const contractWithSigner = new Contract(contractAddress, FileSharing.abi, signer);
    const transaction = await contractWithSigner.uploadFile(fileName);
    await transaction.wait();
    console.log(`File uploaded: ${fileName}`);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const getUserFiles = async (publicKey) => {
  try {
    const contractWithProvider = new Contract(contractAddress, FileSharing.abi, provider);
    const files = await contractWithProvider.getUserFiles(publicKey);
    return files;
  } catch (error) {
    console.error("Error fetching user files:", error);
    throw error;
  }
};

export const getAccessList = async (fileName) => {
  try {
    const contractWithProvider = new Contract(contractAddress, FileSharing.abi, provider);
    const accessList = await contractWithProvider.getAccessList(fileName);
    return accessList;
  } catch (error) {
    console.error("Error fetching access list:", error);
    throw error;
  }
};

export const getUserName = async (publicKey) => {
  try {
    const contractWithProvider = new Contract(contractAddress, FileSharing.abi, provider);
    const username = await contractWithProvider.getUserName(publicKey);
    return username;
  } catch (error) {
    console.error("Error fetching username:", error);
    throw error;
  }
};

export const getAllUploadedFiles = async () => {
  try {
    const contractWithProvider = new Contract(contractAddress, FileSharing.abi, provider);
    // Assuming there's a method in the contract to get all uploaded files
    const files = await contractWithProvider.getAllUploadedFiles(); // Replace with actual method
    return files;
  } catch (error) {
    console.error("Error fetching all uploaded files:", error);
    throw error;
  }
};