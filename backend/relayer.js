require('dotenv').config();
const { ethers } = require('ethers');
const ChainAGatewayABI = require('./abis/ChainAGateway.json');
const ChainBGatewayABI = require('./abis/ChainBGateway.json');

class CrossChainRelayer {
  constructor() {
    // Initialize providers
    this.chainAProvider = new ethers.providers.JsonRpcProvider(process.env.AMOY_RPC_URL);
    this.chainBProvider = new ethers.providers.JsonRpcProvider(process.env.HOLESKY_RPC_URL);
    
    // Initialize signer
    this.signer = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY);
    
    // Initialize contracts
    this.chainAGateway = new ethers.Contract(
      process.env.CHAIN_A_GATEWAY_ADDRESS,
      ChainAGatewayABI,
      this.signer.connect(this.chainAProvider)
    );
    
    this.chainBGateway = new ethers.Contract(
      process.env.CHAIN_B_GATEWAY_ADDRESS,
      ChainBGatewayABI,
      this.signer.connect(this.chainBProvider)
    );
  }

  async handleLockEvent(nonce, tokenAddress, sender, receiver, amount) {
    try {
      console.log(`Processing lock event (Nonce: ${nonce})...`);
      
      // Check if wrapped token exists
      const wrappedToken = await this.chainBGateway.factory.originalToWrapped(tokenAddress);
      
      // Mint wrapped tokens on Chain B
      const tx = await this.chainBGateway.mint(
        nonce,
        tokenAddress,
        receiver,
        amount
      );
      
      await tx.wait();
      console.log(`Minted ${amount} wrapped tokens on Chain B (TX: ${tx.hash})`);
    } catch (error) {
      console.error('Error handling lock event:', error);
    }
  }

  async handleBurnEvent(sender, originalToken, amount) {
    try {
      console.log(`Processing burn event...`);
      
      // Generate unique unlock nonce
      const unlockNonce = Date.now();
      
      // Unlock original tokens on Chain A
      const tx = await this.chainAGateway.unlock(
        unlockNonce,
        sender,
        originalToken,
        amount
      );
      
      await tx.wait();
      console.log(`Unlocked ${amount} tokens on Chain A (TX: ${tx.hash})`);
    } catch (error) {
      console.error('Error handling burn event:', error);
    }
  }

  start() {
    // Listen to Lock events on Chain A
    this.chainAGateway.on('Locked', (nonce, token, sender, receiver, amount) => {
      this.handleLockEvent(nonce, token, sender, receiver, amount);
    });

    // Listen to Burn events on Chain B
    this.chainBGateway.on('Burned', (sender, originalToken, amount) => {
      this.handleBurnEvent(sender, originalToken, amount);
    });

    console.log('Relayer started listening for events...');
  }
}

// Start the relayer
const relayer = new CrossChainRelayer();
relayer.start();