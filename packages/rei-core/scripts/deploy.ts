import { ethers } from 'hardhat';

async function main() {
    const REI = await ethers.getContractFactory('REI');
    const rei = await REI.deploy(
        'Real Estate Investment',
        'REI',
        '0x0000000000000000000000000000000000000000'
    );
    await rei.deployed();
    const Approver = await ethers.getContractFactory('Approver');
    const approver = await Approver.deploy(rei.address);
    await approver.deployed();
    await rei.setApproverContract(approver.address);
    console.log('REI deployed to ', rei.address);
    console.log('Approver deployed to ', approver.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
