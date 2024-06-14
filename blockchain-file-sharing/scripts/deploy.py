# scripts/deploy.py
from brownie import FileSharing, accounts, network

def main():
    if network.show_active() == "ganache-local":
        account = accounts[0]
    else:
        account = accounts.load('deployment_account')

    # Deploy the contract
    deployment = FileSharing.deploy({'from': account})
    
    # Get the transaction hash
    tx_hash = deployment.tx.txid
    
    # Wait for the transaction to be confirmed (increase timeout if necessary)
    tx_receipt = network.web3.eth.wait_for_transaction_receipt(tx_hash, timeout=300)

    # Output transaction and contract information
    print(f'Transaction sent: {tx_hash}')
    print(f'FileSharing deployed to: {deployment.address}')
    print(f'Transaction receipt: {tx_receipt}')