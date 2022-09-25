import { ethers } from 'hardhat';

async function main() {
    //FIRST deploying all contract :
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
    const settingApproverInREI = await rei.setApproverContract(
        approver.address
    );
    await settingApproverInREI.wait();

    const ERC20Contract = await ethers.getContractFactory('ERC20Contract');
    const erc20contract = await ERC20Contract.deploy();
    await erc20contract.deployed();

    const REIMarket = await ethers.getContractFactory('REIMarket');
    const reimarket = await REIMarket.deploy(
        '0x0000000000000000000000000000000000000000',
        erc20contract.address
    );
    await reimarket.deployed();

    const Fractionaliser = await ethers.getContractFactory('Fractionaliser');
    const fractionaliser = await Fractionaliser.deploy(
        reimarket.address,
        rei.address
    );
    await fractionaliser.deployed();
    await reimarket.setFractionaliserContract(fractionaliser.address);

    console.log('REI deployed to ', rei.address);
    console.log('Approver deployed to ', approver.address);
    console.log('Fractionaliser deployed to ', fractionaliser.address);
    console.log('reimarket deployed to ', reimarket.address);
    console.log('ERC20', erc20contract.address);

    const aprTx = await approver.setApprover(
        '0x7fEe81884c652399A0c4a1B888107565945856Fd',
        true
    );
    await aprTx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
