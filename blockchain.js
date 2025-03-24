// Import required modules
const crypto = require("crypto"); 
const readline = require("readline-sync");

//Block class
class Block {
    constructor(index, transactions, previousHash = "") {
        this.index = index; // Block number
        this.timestamp = Date.now(); // Timestamp of block creation
        this.transactions = transactions; // List of transactions
        this.previousHash = previousHash; // Hash of the previous block
        this.nonce = 0; //Proof-of-Work
        this.hash = this.computeHash(); //hash of the block
    }

    // Function to compute the block's hash using SHA-256
    computeHash() {
        return crypto
            .createHash("sha256")
            .update(this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce)
            .digest("hex");
    }
}

//Blockchain class
class Blockchain {
    constructor() {
        this.chain = []; //chain of blocks
        this.createGenesisBlock(); // Initializing the blockchain with a genesis block
    }

    // Function to create the Genesis Block
    createGenesisBlock() {
        const genesisBlock = new Block(0, "Genesis Block", "0"); // Genesis block has block number 0 and previous hash "0"
        this.chain.push(genesisBlock);
    }

    // Function to get the latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Function to add a new block to the blockchain
    addBlock(transactions) {
        const previousBlock = this.getLatestBlock();
        let newBlock = new Block(this.chain.length, transactions, previousBlock.hash); // Creating a new block
        newBlock = this.proofOfWork(newBlock); // Performing proof-of-work before adding
        this.chain.push(newBlock); // Adding block to the blockchain
    }

    // Proof-of-Work function
    proofOfWork(block, difficulty = 4) {
        // Keep changing nonce until hash starts with a certain number of zeroes
        while (block.hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
            block.nonce++;
            block.hash = block.computeHash();
        }
        return block;
    }

    // Function to check if the blockchain is valid
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Checking if the block's hash is valid
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }

            // Checking if the block correctly links to the previous block
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    // Function to display the blockchain
    displayBlockchain() {
        console.log(JSON.stringify(this.chain, null, 2));
    }

    // Function to tamper with a block's transactions (for testing)
    tamperBlock(index, newTransaction) {
        if (index < 1 || index >= this.chain.length) { // Prevent tampering with Genesis Block
            console.log("❌ Invalid Block Index! Cannot modify Genesis Block.");
            return;
        }
        this.chain[index].transactions = newTransaction;
        console.log(`Block ${index} has been tampered!`);
    }
}

// new Blockchain instance
const myBlockchain = new Blockchain();

// Menu-driven system
while (true) {
    console.log("\n📜 Blockchain Menu:");
    console.log("1️⃣ Add a New Block");
    console.log("2️⃣ View Blockchain");
    console.log("3️⃣ Check Blockchain Validity");
    console.log("4️⃣ Tamper with a Block");
    console.log("5️⃣ Exit");

    let choice = readline.question("Enter your choice: "); // Getting user input

    switch (choice) {
        case "1": // Option to add a new block
            let transactions = readline.question("Enter transactions (comma separated): ").split(",");
            myBlockchain.addBlock(transactions);
            console.log("✅ Block Added Successfully!");
            break;

        case "2": // Option to view the blockchain
            console.log("\n📜 Blockchain:");
            myBlockchain.displayBlockchain();
            break;

        case "3": // Option to check blockchain validity
            let isValid = myBlockchain.isChainValid();
            console.log(isValid ? "✅ Blockchain is VALID!" : "❌ Blockchain is INVALID!");
            break;

        case "4": // Option to tamper with a block
            let blockIndex = parseInt(readline.question("Enter Block Index to Tamper: "));
            let newTx = readline.question("Enter New Transactions: ");
            myBlockchain.tamperBlock(blockIndex, newTx);
            break;

        case "5": // Option to exit
            console.log("👋 Exiting... Goodbye!");
            process.exit(0);

        default:
            console.log("❌ Invalid choice! Please enter a valid option.");
    }
}
