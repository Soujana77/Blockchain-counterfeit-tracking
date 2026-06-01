# MediChain – Blockchain-Based Counterfeit Medicine Detection and Supply Chain Tracking System

## Overview

MediChain is a blockchain-powered pharmaceutical supply chain management system designed to detect counterfeit medicines and ensure transparency throughout the medicine distribution lifecycle.

The system leverages Ethereum blockchain technology, QR code verification, role-based access control, and analytics dashboards to provide secure medicine tracking from manufacturers to end customers.

---

## Features

### Blockchain-Based Medicine Registration

* Register medicines on Ethereum blockchain
* Immutable medicine records
* Ownership history tracking
* Transparent supply chain management

### QR Code Management

* Generate QR codes for medicines
* Download QR codes
* Scan QR codes using camera
* Automatic medicine verification after scanning

### Medicine Verification

* Verify medicine authenticity
* Retrieve blockchain records
* Display manufacturer information
* View ownership history
* Detect counterfeit products

### Ownership Transfer

* Transfer medicine ownership across supply chain participants
* Distributor management
* Wholesaler management
* Ownership history recording
* Prevention of invalid ownership transfers

### Role-Based Dashboard System

#### Manufacturer Dashboard

* Add new medicines
* Generate QR codes
* View analytics
* Monitor medicine lifecycle

#### Distributor Dashboard

* Receive medicines
* Transfer ownership
* Verify incoming medicines

#### Wholesaler Dashboard

* Verify medicine authenticity
* Transfer ownership
* Track supply chain movement

#### Pharmacy Dashboard

* Verify medicines
* Confirm ownership
* Mark medicines as sold

#### Customer Verification Portal

* Scan QR codes
* Verify authenticity
* View supply chain timeline
* Detect suspicious products

### Counterfeit Detection System

The system identifies suspicious activities through:

* Excessive scan detection
* Duplicate QR scan monitoring
* Impossible location jump detection
* Counterfeit alert generation

### Supply Chain Analytics

* Total medicines tracked
* Total QR scans
* Suspicious product alerts
* Sold medicines count
* Recent scan activity
* Security monitoring dashboard

### Sales Lifecycle Tracking

* Medicine registration
* Ownership transfer
* Pharmacy verification
* Customer sale completion
* Sold status management

---

## Technology Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Recharts
* Axios
* React Hot Toast
* Leaflet Maps

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Blockchain

* Solidity
* Ganache
* Web3.js
* MetaMask

### Additional Tools

* QRCode Generator
* HTML5 QR Scanner
* jsPDF

---

## System Workflow

1. Manufacturer registers medicine on blockchain.
2. QR code is generated and attached to the product.
3. Distributor receives medicine through ownership transfer.
4. Wholesaler receives and verifies medicine.
5. Pharmacy verifies medicine authenticity.
6. Pharmacy marks medicine as sold.
7. Customer scans QR code.
8. System verifies medicine against blockchain records.
9. Counterfeit detection checks scan history and ownership records.
10. Verification report is generated.

---

## Counterfeit Detection Logic

The system flags suspicious products when:

* Excessive scan activity exceeds defined thresholds.
* QR codes appear at impossible geographic locations within short time intervals.
* Ownership records do not match blockchain history.

---

## Dashboard Analytics

### Available Metrics

* Total Medicines
* Total Scans
* Suspicious Products
* Sold Medicines

### Visualizations

* Weekly Scan Activity
* Product Safety Distribution
* Live Security Alerts
* Scan Location Map

---

## Smart Contract Functions

### addMedicine()

Registers a new medicine on blockchain.

### transferOwnership()

Transfers ownership to another participant.

### verifyMedicine()

Verifies medicine authenticity and returns medicine details.

### getOwnershipHistory()

Retrieves complete ownership history.

---

## Future Enhancements

* Real blockchain wallet authentication
* Multi-user registration system
* Supply chain participant management
* Email notifications
* AI-powered counterfeit prediction
* Mobile application support
* Blockchain event monitoring
* Cloud deployment

---

## Project Structure

```text
Frontend (React)
│
├── Pages
├── Components
├── Layouts
├── Routes
└── Services

Backend (Node.js)
│
├── Smart Contract Integration
├── MongoDB Models
├── Analytics APIs
├── Verification APIs
└── Transfer APIs

Blockchain
│
├── Solidity Smart Contract
├── Ganache Network
└── MetaMask Integration
```

---

## Authors

Developed as a Blockchain-Based Pharmaceutical Supply Chain Management and Counterfeit Detection Project.

### Team Members

* Soujanya Jain
* Tejaswini K S
* U M Vinay
* Vinay Kumar B M

---

## License

This project is developed for academic and educational purposes.
