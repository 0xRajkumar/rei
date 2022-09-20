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
    const tx = await rei.setApproverContract(approver.address);
    await tx.wait();
    console.log('REI deployed to ', rei.address);
    console.log('Approver deployed to ', approver.address);
    const Fractionaliser = await ethers.getContractFactory('Fractionaliser');
    const fractionaliser = await Fractionaliser.deploy(
        '0x0000000000000000000000000000000000000000',
        rei.address
    );
    await fractionaliser.deployed();
    console.log('Fractionaliser deployed to ', fractionaliser.address);
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
    for (let i = 0; i < 3; i++) {
        const newtx = await approver.applyForApproval(
            data.name,
            data.description,
            data.imageURI,
            data.Country,
            data.State,
            data.gpsCoordinates,
            data.surfaceAreaInMTRs
        );
        await newtx.wait();
    }
    await approver.applicationDecision(
        1,
        1,
        'QmQkmca3w46SfipJPkVVuaHyw44KjsPVitoRWWfnFCAF6b'
    );
    const decisiontsx = await approver.applicationDecision(
        2,
        1,
        'QmQkmca3w46SfipJPkVVuaHyw44KjsPVitoRWWfnFCAF6b'
    );
    await decisiontsx.wait();
    const atx = await rei.approve(fractionaliser.address, 1);
    await atx.wait();
    const n = await fractionaliser.fractionalise('Testing', 'Testing', 1, 10);
    await n.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
