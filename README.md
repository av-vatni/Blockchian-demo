# Blockchain Implementation in JavaScript

## Overview

This is a simple blockchain implemented in JavaScript with a command-line interface. It allows users to:

- Add blocks with transactions
- View the blockchain
- Check blockchain validity
- Tamper with blocks (for testing)
- Exit the program

## Features

- Uses Proof-of-Work (PoW) for security.
- Supports multiple transactions per block.
- Validates the integrity of the blockchain.
- Allows tampering to test security.

## Installation and Usage

### Prerequisites

Ensure [Node.js](https://nodejs.org/) is installed.

### Steps to Run

1. Create a directory and add `blockchain.js`.
2. Open a terminal and navigate to the directory.
3. Run:
   ```sh
   node blockchain.js
   ```

## Menu Options Explained

- 1️⃣ **Add a New Block** – Enter transactions to add a new block.
- 2️⃣ **View Blockchain** – Display all blocks in the blockchain.
- 3️⃣ **Check Blockchain Validity** – Verify if the blockchain is intact.
- 4️⃣ **Tamper with a Block** – Modify a block’s transactions to see its effect.
- 5️⃣ **Exit** – Close the program.

## Example Output

```sh
node blockchain.js

📜 Blockchain Menu:
1️⃣ Add a New Block
2️⃣ View Blockchain
3️⃣ Check Blockchain Validity
4️⃣ Tamper with a Block
5️⃣ Exit
Enter your choice: 1
Enter transactions (comma separated): Ted pays Barney 10 BTC
✅ Block Added Successfully!

Enter your choice: 2
📜 Blockchain:
[ {...Genesis Block...}, {...New Block...} ]

Enter your choice: 3
✅ Blockchain is VALID!

Enter your choice: 4
Enter Block Index to Tamper: 1
Enter New Transactions: Robin pays Lily 100 BTC
Block 1 has been tampered!

Enter your choice: 3
❌ Blockchain is INVALID!

Enter your choice: 5
👋 Exiting... Goodbye!
```

## How It Works

1. A Genesis Block is created first.
2. New blocks can be added with transactions.
3. Proof-of-Work ensures difficulty.
4. Users can verify the blockchain’s integrity.
5. Tampering demonstrates blockchain security.

## Conclusion

This project showcases blockchain fundamentals:
- Block structure
- Hashing
- Proof-of-Work (PoW)
- Blockchain integrity

