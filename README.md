# REI

Invest and Lend through REI NFT's without any friction.

<p align="left">
  <img width="70%" src="https://i.ibb.co/1ZK7Vmr/rei-logo-16-9-1.jpg">
</p>

# Working

### For Loanee

## 1. Creating Application for REI NFT

First user need to fill form of REI NFT creation if he want to borrow loan as collateral. Then he need to wait some time untill apporover approves his NFT.

## 2. Fractionalising NFT

He need to Fractionalise his NFT into smaller parts to take loan from many investers.

## 3. Applying for loan

After fractionlising his NFT loanee need to apply for loan on the basis of his REI NFT to take loan.

## 4. Funded state

Loanee need to wait till his all fraction are invested by invester.

## 5. Taking and Repaying

Loanee need to withdraw his loan amount after Funded state and after his loan period loanee will get some time to pay his all loan back otherwise his NFT can be liquidated by liquidator.

### For Invester

## 1. Investing

Invester can participate in many projects and invester can invest in many fraction of same project.

## 2. Withdrawing

Invester need to wait untill Repayment or Liquidation state if he want to withdraw investment with interest. After this invester will be able to give back all fractions and take his invesment with interest.

## The problem it solves

## 1. Fractional Ownership

loanee can tokenize their properties into real estate shares that can be fractionally owned by several investors.

## 2. No intermediaries

Blockchain has effectively overcome one of the biggest hurdles in real estate investing by removing middlemen and unnecessary costs in the form of commissions, registration fees, and service fees that are charged by these middlemen.

## 3. Decentralized and Transparent

Since the data on the blockchain is decentralized and distributed, it is accessible to buyers and sellers throughout the network. This allows complete transparency and trust in the process of transactions.

## Challenges we ran into

## 1. Decentralized Storage 🕵️‍♂️

We had a big problem of storing REI NFT images and metadata becouse of decentralized Dapp we can't keep detail on server.

### Solution :-

We used IPFS to store REI NFT Images and metadata which will be decentralized and we web3.storage to upload images and metadata from UI.

## 2. Indexing onchain data

Indexing onchain data using ethersjs was not easy and it's was slow with bad user experience.

### Solution :-

We used THe graph to index onchain data becouse of the graph now user experience is good and fetching onchain is more easy using graphql.

## Technologies we used

#### 1. Solidity

#### 2. IPFS

#### 3. TheGraph

#### 4. React

#### 5. Ethers and Wagmi
