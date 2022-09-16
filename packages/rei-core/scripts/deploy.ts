import { ethers } from 'hardhat';

async function main() {
    const REI = await ethers.getContractFactory('REI');
    const rei = await REI.deploy();

    await rei.deployed();

    console.log('Deployed to ', rei.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
