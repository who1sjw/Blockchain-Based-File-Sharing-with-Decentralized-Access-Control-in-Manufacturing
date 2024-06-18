好的，我们将继续撰写演讲稿，详细说明如何部署智能合约并在前端创建账户，然后使用 Brownie 控制台验证这些操作。

---

**Slide 3: Deploying the Smart Contract**

**Speaker:**
"Let's start by deploying our smart contract to the local blockchain network. We use Brownie, a Python-based development and testing framework for Ethereum smart contracts, to manage this process.

First, we compile our smart contract using the following command:

**[Show Command]**
```bash
brownie compile
```

This command compiles the Solidity code and generates the necessary artifacts for deployment.

Next, we deploy the smart contract to our local Ganache blockchain network:

**[Show Command]**
```bash
brownie run scripts/deploy.py --network ganache-local
```

This command runs our deployment script, which deploys the compiled smart contract to the specified network.

After deployment, we need to copy the contract's ABI and bytecode to our frontend project so that our React application can interact with the smart contract:

**[Show Command]**
```bash
cp build/contracts/FileSharing.json ../frontend/blockchain-file-sharing-frontend/src/contracts/
```

This copies the necessary contract artifacts to the frontend directory."

---

**Slide 4: Creating Accounts in the Frontend**

**Speaker:**
"Now, let's move to the frontend and create three user accounts. These accounts will be used to demonstrate the different functionalities of our system.

**[Show the frontend interface for creating accounts and demonstrate the process]**

In our frontend application, we can register new users by filling out the registration form with a username, email, and role (either Data Owner or Data Requester). Once the form is submitted, the frontend code calls the `registerUser` function from our smart contract to register the user on the blockchain."

---

**Slide 5: Verify in Brownie Console**

**Speaker:**
"To ensure that our accounts have been successfully registered on the blockchain, we will verify the details using the Brownie console.

First, we open the Brownie console with the following command:

**[Show Command]**
```bash
brownie console --network ganache-local
```

Once inside the console, we execute the following commands to interact with our deployed smart contract and retrieve the user details:

**[Show Commands]**
```python
from brownie import accounts, FileSharing
from web3 import Web3
import time

account = accounts[0]
contract = FileSharing[-1]
users = contract.getAllUsers()
for user in users:
    print(f"Username: {user[0]}, Email: {user[1]}, Role: {user[2]}, Public Key: {user[3]}")
```

This script fetches all registered users from the smart contract and prints their details. We can see the usernames, emails, roles, and public keys of the registered users, confirming that the registration process was successful."

---

**Speaker:**
"With our smart contract deployed and user accounts created, we are now ready to demonstrate the core functionalities of our system. Let's move on to the user registration process."

---

