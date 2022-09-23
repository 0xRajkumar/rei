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

    //Applying for APPLICATION
    const data = {
        name: 'Eiffel Tower',
        description:
            'The French architect and engineer Gustave Eiffel, who also designed the Statue of Liberty, built the Eiffel Tower in 1889. Standing 324 meters tall, it is one of the most famous buildings in the world and a symbol of Paris, the capital of France. La Tour Eiffel in French language is one of the most visited monuments in the world and represents France in a simple symbol.',
        imageURI:
            'https://ipfs.io/ipfs/QmdPaPgLUqzqeDTef1yge9BNpM8u1mJzD9ZnrLXfFurjJL',
        Country: 'INDIA',
        State: 'Faridabad',
        gpsCoordinates: 'Heaven',
        surfaceAreaInMTRs: 1000
    };
    for (let i = 0; i < 5; i++) {
        const applyingtx = await approver.applyForApproval(
            data.name,
            data.description,
            data.imageURI,
            data.Country,
            data.State,
            data.gpsCoordinates,
            data.surfaceAreaInMTRs
        );
        await applyingtx.wait();
    }
    const decisiontx1 = await approver.applicationDecision(
        1,
        1,
        'QmQkmca3w46SfipJPkVVuaHyw44KjsPVitoRWWfnFCAF6b'
    );
    await decisiontx1.wait();
    const decisiontx2 = await approver.applicationDecision(
        2,
        1,
        'QmQkmca3w46SfipJPkVVuaHyw44KjsPVitoRWWfnFCAF6b'
    );
    await decisiontx2.wait();
    const decisiontx3 = await approver.applicationDecision(
        3,
        1,
        'QmQkmca3w46SfipJPkVVuaHyw44KjsPVitoRWWfnFCAF6b'
    );
    await decisiontx3.wait();
    const atx1 = await rei.approve(fractionaliser.address, 1);
    await atx1.wait();
    const atx2 = await rei.approve(fractionaliser.address, 2);
    await atx2.wait();
    const fractionalising1 = await fractionaliser.fractionalise(
        'Testing',
        'Testing',
        1,
        10
    );
    await fractionalising1.wait();
    const fractionalising2 = await fractionaliser.fractionalise(
        'Testing',
        'Testing',
        2,
        10
    );
    await fractionalising2.wait();
    const fractionaliserdnftAddress1 =
        await fractionaliser.getAddressOfFractionisedId(1);
    const FractionalisedNFT = await ethers.getContractFactory(
        'FractionalisedNFT'
    );
    const FractionalisedNFTContract1 = FractionalisedNFT.attach(
        fractionaliserdnftAddress1
    );

    // const fractionaliserdnftAddress2 =
    // await fractionaliser.getAddressOfFractionisedId(2);
    // const FractionalisedNFTContract2 = FractionalisedNFT.attach(
    // fractionaliserdnftAddress2
    // );
    const aftx1 = await FractionalisedNFTContract1.approve(
        reimarket.address,
        10
    );
    await aftx1.wait();
    // const da2 = await FractionalisedNFTContract2.approve(reimarket.address, 10);
    // await da2.wait();
    const laontransaction1 = await reimarket.applyForLoan(1, 10, 10, 100, 1000);
    await laontransaction1.wait();
    // const laontransaction2 = await reimarket.applyForLoan(2, 10, 10, 100, 1000);
    // await laontransaction2.wait();
    const aptx = await erc20contract.approve(reimarket.address, 1000000);
    await aptx.wait();
    const itx = await reimarket.invest(1, 4);
    await itx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
