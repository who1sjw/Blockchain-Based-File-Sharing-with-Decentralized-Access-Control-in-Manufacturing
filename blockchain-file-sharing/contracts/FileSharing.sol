// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileSharing {
    enum Role { DataOwner, DataRequester }

    struct User {
        string username;
        string email;
        Role role;
        address publicKey;
    }

    struct File {
        string fileName;
        address owner;
    }

    mapping(address => User) public users;
    address[] public userAddresses;
    mapping(string => address[]) public fileAccess; // fileName to list of requester addresses
    mapping(address => File[]) public userFiles; // owner address to list of files
    File[] public allFiles; // Store all files

    event UserRegistered(string username, string email, Role role, address publicKey);
    event AccessGranted(string fileName, address owner, address requester);
    event FileUploaded(string fileName, address owner);

    function registerUser(string memory _username, string memory _email, Role _role, address _publicKey) public {
        require(users[_publicKey].publicKey == address(0), "User with this public key is already registered");
        users[_publicKey] = User(_username, _email, _role, _publicKey);
        userAddresses.push(_publicKey);

        emit UserRegistered(_username, _email, _role, _publicKey);
    }

    function getAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            allUsers[i] = users[userAddresses[i]];
        }
        return allUsers;
    }

    function isUserRegistered(address _publicKey) public view returns (bool) {
        return users[_publicKey].publicKey != address(0);
    }

    function getUserRole(address _publicKey) public view returns (Role) {
        require(users[_publicKey].publicKey != address(0), "User not registered");
        return users[_publicKey].role;
    }

    function grantAccess(address owner, address requester, string memory fileName) public {
        require(users[owner].role == Role.DataOwner, "Only Data Owner can grant access");
        require(users[requester].role == Role.DataRequester, "Only Data Requester can be granted access");
        fileAccess[fileName].push(requester);
        emit AccessGranted(fileName, owner, requester);
    }

    function getAccessList(string memory fileName) public view returns (address[] memory) {
        return fileAccess[fileName];
    }

    function uploadFile(string memory fileName) public {
        require(users[msg.sender].role == Role.DataOwner, "Only Data Owner can upload files");
        File memory newFile = File({fileName: fileName, owner: msg.sender});
        userFiles[msg.sender].push(newFile);
        allFiles.push(newFile);
        emit FileUploaded(fileName, msg.sender);
    }

    function getUserFiles(address owner) public view returns (File[] memory) {
        return userFiles[owner];
    }

    function getAllUploadedFiles() public view returns (File[] memory) {
        return allFiles;
    }

    function getUserName(address _publicKey) public view returns (string memory) {
        return users[_publicKey].username;
    }
}