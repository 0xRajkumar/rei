import { ethers } from 'hardhat';

async function main() {
    const Storage = await ethers.getContractFactory('Storage');
    const storage = await Storage.deploy();

    await storage.deployed();

    console.log('Deployed to ', storage.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
