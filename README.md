# Decentralized-Donation-System-Hyperledger

## Description

This revolutionary project addresses transparency concerns in charitable donations by introducing a decentralized donation system powered by blockchain technology. Donors are empowered with the ability to trace their contributions and monitor fund utilization, ushering in a new era of transparency in charitable giving. The upgrade to Hyperledger further enhances the system, overcoming drawbacks inherent in blockchain systems like comparatively low Scalability and control.

## Table of Contents

- [Decentralized Donation System Hyperledger](#decentralized-donation-system-hyperledger)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Contributing](#contributing)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Clone the repository

```bash
git clone https://github.com/Siddhant-Nawale/Decentralized-Donation-System-Hyperledger.git
cd Decentralized-Donation-System-Hyperledger
cd Backend
```
### Initialise the hyperledger with our chaincode

Install hyperledger in subsystem for linux tool in windows if not using linux
start the hyper ledger network with
```bash
cd fabric-samples/test-network
./network.sh down
./network.sh up
```
Copy the backend DDA app into the fabric-sample folder
```bash
cd ..
cd Backend-hyperledger
network.sh up
```
Start the app with
```bash
npm install
nodemon start
```

### Invocation
In Frontend run the following command
```bash
npm run dev
```

## Contributing

We welcome contributions from the community. Here's how you can contribute to this project.

### Creating Pull Requests
```
- Fork the repository.
- Create a new branch with a descriptive name for your feature or fix.
- Make your changes and test them.
- Create a pull request with a clear title and description.
```


### Commit Linting Standards
```
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- chore: Maintenance or tooling updates
```

Thank you for your interest in contributing!
