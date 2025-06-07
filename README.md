
# 🛡️ Anti-Counterfeit Product Identification System Using Blockchain

An **innovative solution leveraging blockchain technology** to combat counterfeit products in various industries. It integrates **QR codes, smart contracts, and the Ethereum network** to deliver a **secure, transparent platform for product tracking and authenticity verification**.

This project addresses global supply chain issues by reducing counterfeit goods, enhancing transparency, and building trust among stakeholders.

---

## 📖 Table of Contents

* [📌 Overview](#-overview)
* [🚀 Basic Walkthrough](#-basic-walkthrough)
* [🛠️ Technologies Used](#-technologies-used)
* [✨ Key Features](#-key-features)
* [⚙️ Project Setup](#-project-setup)
* [📊 Operational Workflow](#-operational-workflow)
* [📝 Technical Implementation](#-technical-implementation)
* [🎯 Results Simulation](#-results-simulation)

---

## 📌 Overview

The system uses:

* **QR Codes** to scan and verify product details via a web interface.
* **Smart Contracts** to securely store product verification logic on the Ethereum blockchain.
* **Ethereum Network (Sepolia Testnet)** as a decentralized and tamper-proof database.
* **React Web Interface** for seamless product tracking and history view.

This ensures:
✅ Tamper-proof data
✅ Transparent supply chain operations
✅ Trustless and decentralized verification

---

## 🚀 Basic Walkthrough

📁 **Project Structure**

* `identeefi-backend-node` — Node.js backend APIs
* `identeefi-frontend-react` — React-based frontend interface
* `identeefi-postgres-database` — CSV data files for backend database
* `identeefi-smartcontract-solidity` — Solidity smart contracts deployed on Ethereum Sepolia Testnet

---

## 🛠️ Technologies Used

* **Solidity** — Smart contract development
* **Hardhat** — Ethereum development environment
* **React.js** — Web UI
* **Node.js** — Backend services
* **ethers.js** — Interact with Ethereum blockchain

---

## ✨ Key Features

* 📱 **QR Code-Based Verification**
  Overt technology for product authenticity check via smartphone scan.

* 🔒 **Smart Contracts**
  Store product data and verification logic securely on the blockchain.

* 🌐 **Decentralized Storage**
  Product data and status are stored on the **Ethereum Sepolia Testnet**.

* 🖥️ **Interactive Web Dashboard**
  A React-powered interface to manage and view product info and history.

* 🚫 **Duplicate QR Detection**
  Detects duplicate or fraudulent product records based on transaction history.

---

## ⚙️ Project Setup

1️⃣ Clone the repository:

```bash
git clone <repo-url>
```

2️⃣ Set up the database:

* In `identeefi-postgres-database`, import CSV files into your PostgreSQL database.

3️⃣ Configure and run the backend:

* In `identeefi-backend-node`

```bash
npm install
# Update Postgres credentials in config
node postgres.js
```

4️⃣ Set up and run the frontend:

* In `identeefi-frontend-react`

```bash
npm install
npm start
```

5️⃣ Deploy Smart Contract:

* Smart contract is deployed to **Sepolia Testnet** under `identeefi-smartcontract-solidity`.

6️⃣ Install **MetaMask**, connect to Sepolia, and get free SepoliaETH from [Sepolia Faucet](https://sepoliafaucet.com/).

---

## 📊 Operational Workflow

**Entities Involved:**

* **Administrator:** Manages account creation and system setup.
* **Manufacturer:** Registers product and adds it to blockchain.
* **Supplier:** Updates product information while it’s in transit.
* **Retailer:** Finalizes product status as “Sold”.
* **Consumer:** Scans QR code to verify authenticity.

**System Flow:**

1. Product added by Manufacturer → QR code generated.
2. Supplier updates product info.
3. Retailer logs final status.
4. Consumer scans QR code and views history on blockchain.

---

## 📝 Technical Implementation

* **Smart Contract (Solidity + Hardhat)**
  Functions for product registration, history update, and data retrieval.

* **Blockchain Deployment (Sepolia Testnet)**
  Cost-effective environment for testing without real ETH.

* **Client-side Application (React + ethers.js)**
  User-friendly frontend for managing blockchain transactions.

---

## 🎯 Results Simulation

**Example Product:**

* Serial Number: `c12345`
* Name: `Classic Handbag`
* Brand: `Chanel`
* Description: `Lambskin, Black`

**Flow:**

* Manufacturer registers → QR code generated
* Supplier logs current location & timestamp
* Retailer updates final sale status
* Consumer scans to view full verified history

**If scanned at an unauthorized location, discrepancies in blockchain record alert for counterfeiting.**

---

## ✨ Conclusion

This system **redefines product verification** in supply chains with transparent, tamper-proof blockchain records. It protects brands and consumers alike while disincentivizing counterfeiters.

---

## ⭐ If you found this project useful, give it a ⭐ on [GitHub](https://github.com/suraksha0244)

---

