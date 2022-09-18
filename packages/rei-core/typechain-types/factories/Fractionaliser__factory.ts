/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Fractionaliser,
  FractionaliserInterface,
} from "../Fractionaliser";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_marketplaceAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_reiAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "fractionalise",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "fractionaliseds",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getAddressOfFractionisedId",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marketplaceAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reiAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_marketplaceAddress",
        type: "address",
      },
    ],
    name: "setMarketplaceAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_reiAddress",
        type: "address",
      },
    ],
    name: "setReiAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalFractionalised",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200339a3803806200339a833981810160405281019062000037919062000217565b620000576200004b620000e160201b60201c565b620000e960201b60201c565b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200025e565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001df82620001b2565b9050919050565b620001f181620001d2565b8114620001fd57600080fd5b50565b6000815190506200021181620001e6565b92915050565b60008060408385031215620002315762000230620001ad565b5b6000620002418582860162000200565b9250506020620002548582860162000200565b9150509250929050565b61312c806200026e6000396000f3fe60806040523480156200001157600080fd5b5060043610620000b85760003560e01c8063beae190c116200007b578063beae190c1462000177578063bf99ef9d14620001ad578063c182d8da14620001cf578063c5a2611c14620001f1578063daa17f491462000211578063f2fde38b146200023357620000b8565b80633a2b39df14620000bd5780636eedf0a414620000f3578063715018a614620001295780638da5cb5b1462000135578063b47cc5561462000157575b600080fd5b620000db6004803603810190620000d5919062000999565b62000253565b604051620000ea919062000a5a565b60405180910390f35b6200011160048036038101906200010b919062000a77565b62000449565b60405162000120919062000aee565b60405180910390f35b6200013362000486565b005b6200013f6200049e565b6040516200014e919062000aee565b60405180910390f35b6200017560048036038101906200016f919062000b3c565b620004c7565b005b6200019560048036038101906200018f919062000a77565b6200050b565b604051620001a4919062000aee565b60405180910390f35b620001b76200053e565b604051620001c6919062000a5a565b60405180910390f35b620001d96200054a565b604051620001e8919062000aee565b60405180910390f35b6200020f600480360381019062000209919062000b3c565b62000570565b005b6200021b620005b4565b6040516200022a919062000aee565b60405180910390f35b6200025160048036038101906200024b919062000b3c565b620005da565b005b60008082116200029a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002919062000bcf565b60405180910390fd5b60008585600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168686600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051620002f490620007da565b620003059695949392919062000c73565b604051809103906000f08015801562000322573d6000803e3d6000fd5b5090506000819050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e6200037262000665565b83886040518463ffffffff1660e01b8152600401620003949392919062000cee565b600060405180830381600087803b158015620003af57600080fd5b505af1158015620003c4573d6000803e3d6000fd5b50505050620003d460016200066d565b8060046000620003e5600162000683565b815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200043d600162000683565b92505050949350505050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6200049062000691565b6200049c600062000716565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60046020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60018060000154905081565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b620005e462000691565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141562000657576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200064e9062000da1565b60405180910390fd5b620006628162000716565b50565b600033905090565b6001816000016000828254019250508190555050565b600081600001549050919050565b6200069b62000665565b73ffffffffffffffffffffffffffffffffffffffff16620006bb6200049e565b73ffffffffffffffffffffffffffffffffffffffff161462000714576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200070b9062000e13565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6122c18062000e3683390190565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620008518262000806565b810181811067ffffffffffffffff8211171562000873576200087262000817565b5b80604052505050565b600062000888620007e8565b905062000896828262000846565b919050565b600067ffffffffffffffff821115620008b957620008b862000817565b5b620008c48262000806565b9050602081019050919050565b82818337600083830152505050565b6000620008f7620008f1846200089b565b6200087c565b90508281526020810184848401111562000916576200091562000801565b5b62000923848285620008d1565b509392505050565b600082601f830112620009435762000942620007fc565b5b813562000955848260208601620008e0565b91505092915050565b6000819050919050565b62000973816200095e565b81146200097f57600080fd5b50565b600081359050620009938162000968565b92915050565b60008060008060808587031215620009b657620009b5620007f2565b5b600085013567ffffffffffffffff811115620009d757620009d6620007f7565b5b620009e5878288016200092b565b945050602085013567ffffffffffffffff81111562000a095762000a08620007f7565b5b62000a17878288016200092b565b935050604062000a2a8782880162000982565b925050606062000a3d8782880162000982565b91505092959194509250565b62000a54816200095e565b82525050565b600060208201905062000a71600083018462000a49565b92915050565b60006020828403121562000a905762000a8f620007f2565b5b600062000aa08482850162000982565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000ad68262000aa9565b9050919050565b62000ae88162000ac9565b82525050565b600060208201905062000b05600083018462000add565b92915050565b62000b168162000ac9565b811462000b2257600080fd5b50565b60008135905062000b368162000b0b565b92915050565b60006020828403121562000b555762000b54620007f2565b5b600062000b658482850162000b25565b91505092915050565b600082825260208201905092915050565b7f416d6f756e74206e6565647320746f206265206d6f7265207468616e20300000600082015250565b600062000bb7601e8362000b6e565b915062000bc48262000b7f565b602082019050919050565b6000602082019050818103600083015262000bea8162000ba8565b9050919050565b600081519050919050565b60005b8381101562000c1c57808201518184015260208101905062000bff565b8381111562000c2c576000848401525b50505050565b600062000c3f8262000bf1565b62000c4b818562000b6e565b935062000c5d81856020860162000bfc565b62000c688162000806565b840191505092915050565b600060c082019050818103600083015262000c8f818962000c32565b9050818103602083015262000ca5818862000c32565b905062000cb6604083018762000add565b62000cc5606083018662000a49565b62000cd4608083018562000a49565b62000ce360a083018462000add565b979650505050505050565b600060608201905062000d05600083018662000add565b62000d14602083018562000add565b62000d23604083018462000a49565b949350505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600062000d8960268362000b6e565b915062000d968262000d2b565b604082019050919050565b6000602082019050818103600083015262000dbc8162000d7a565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600062000dfb60208362000b6e565b915062000e088262000dc3565b602082019050919050565b6000602082019050818103600083015262000e2e8162000dec565b905091905056fe60806040523480156200001157600080fd5b50604051620022c1380380620022c183398181016040528101906200003791906200059b565b8585816003908051906020019062000051929190620002ae565b5080600490805190602001906200006a929190620002ae565b50505083600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600781905550620000d6620000c96200012360201b60201c565b836200012b60201b60201c565b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050505062000817565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156200019e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200019590620006d6565b60405180910390fd5b620001b260008383620002a460201b60201c565b8060026000828254620001c6919062000727565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200021d919062000727565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000284919062000795565b60405180910390a3620002a060008383620002a960201b60201c565b5050565b505050565b505050565b828054620002bc90620007e1565b90600052602060002090601f016020900481019282620002e057600085556200032c565b82601f10620002fb57805160ff19168380011785556200032c565b828001600101855582156200032c579182015b828111156200032b5782518255916020019190600101906200030e565b5b5090506200033b91906200033f565b5090565b5b808211156200035a57600081600090555060010162000340565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003c7826200037c565b810181811067ffffffffffffffff82111715620003e957620003e86200038d565b5b80604052505050565b6000620003fe6200035e565b90506200040c8282620003bc565b919050565b600067ffffffffffffffff8211156200042f576200042e6200038d565b5b6200043a826200037c565b9050602081019050919050565b60005b83811015620004675780820151818401526020810190506200044a565b8381111562000477576000848401525b50505050565b6000620004946200048e8462000411565b620003f2565b905082815260208101848484011115620004b357620004b262000377565b5b620004c084828562000447565b509392505050565b600082601f830112620004e057620004df62000372565b5b8151620004f28482602086016200047d565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200052882620004fb565b9050919050565b6200053a816200051b565b81146200054657600080fd5b50565b6000815190506200055a816200052f565b92915050565b6000819050919050565b620005758162000560565b81146200058157600080fd5b50565b60008151905062000595816200056a565b92915050565b60008060008060008060c08789031215620005bb57620005ba62000368565b5b600087015167ffffffffffffffff811115620005dc57620005db6200036d565b5b620005ea89828a01620004c8565b965050602087015167ffffffffffffffff8111156200060e576200060d6200036d565b5b6200061c89828a01620004c8565b95505060406200062f89828a0162000549565b94505060606200064289828a0162000584565b93505060806200065589828a0162000584565b92505060a06200066889828a0162000549565b9150509295509295509295565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000620006be601f8362000675565b9150620006cb8262000686565b602082019050919050565b60006020820190508181036000830152620006f181620006af565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620007348262000560565b9150620007418362000560565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620007795762000778620006f8565b5b828201905092915050565b6200078f8162000560565b82525050565b6000602082019050620007ac600083018462000784565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620007fa57607f821691505b60208210811415620008115762000810620007b2565b5b50919050565b611a9a80620008276000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80633950935111610097578063a457c2d711610066578063a457c2d71461029e578063a9059cbb146102ce578063daa17f49146102fe578063dd62ed3e1461031c576100f5565b8063395093511461020257806353c62a801461023257806370a082311461025057806395d89b4114610280576100f5565b806317d70f7c116100d357806317d70f7c1461017857806318160ddd1461019657806323b872dd146101b4578063313ce567146101e4576100f5565b806306fdde03146100fa578063095ea7b314610118578063150b7a0214610148575b600080fd5b61010261034c565b60405161010f9190610f12565b60405180910390f35b610132600480360381019061012d9190610fdc565b6103de565b60405161013f9190611037565b60405180910390f35b610162600480360381019061015d9190611187565b610401565b60405161016f9190611245565b60405180910390f35b610180610415565b60405161018d919061126f565b60405180910390f35b61019e61041b565b6040516101ab919061126f565b60405180910390f35b6101ce60048036038101906101c9919061128a565b610425565b6040516101db9190611037565b60405180910390f35b6101ec610454565b6040516101f991906112f9565b60405180910390f35b61021c60048036038101906102179190610fdc565b61045d565b6040516102299190611037565b60405180910390f35b61023a610494565b6040516102479190611037565b60405180910390f35b61026a60048036038101906102659190611314565b610597565b604051610277919061126f565b60405180910390f35b6102886105df565b6040516102959190610f12565b60405180910390f35b6102b860048036038101906102b39190610fdc565b610671565b6040516102c59190611037565b60405180910390f35b6102e860048036038101906102e39190610fdc565b6106e8565b6040516102f59190611037565b60405180910390f35b61030661070b565b6040516103139190611350565b60405180910390f35b6103366004803603810190610331919061136b565b610731565b604051610343919061126f565b60405180910390f35b60606003805461035b906113da565b80601f0160208091040260200160405190810160405280929190818152602001828054610387906113da565b80156103d45780601f106103a9576101008083540402835291602001916103d4565b820191906000526020600020905b8154815290600101906020018083116103b757829003601f168201915b5050505050905090565b6000806103e96107b8565b90506103f68185856107c0565b600191505092915050565b600063150b7a0260e01b9050949350505050565b60075481565b6000600254905090565b6000806104306107b8565b905061043d85828561098b565b610448858585610a17565b60019150509392505050565b60006012905090565b6000806104686107b8565b905061048981858561047a8589610731565b610484919061143b565b6107c0565b600191505092915050565b6000806104a033610597565b90506104aa61041b565b81146104eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e2906114dd565b60405180910390fd5b6104fc6104f66107b8565b82610c98565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd30336007546040518463ffffffff1660e01b815260040161055d939291906114fd565b600060405180830381600087803b15801561057757600080fd5b505af115801561058b573d6000803e3d6000fd5b50505050600191505090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600480546105ee906113da565b80601f016020809104026020016040519081016040528092919081815260200182805461061a906113da565b80156106675780601f1061063c57610100808354040283529160200191610667565b820191906000526020600020905b81548152906001019060200180831161064a57829003601f168201915b5050505050905090565b60008061067c6107b8565b9050600061068a8286610731565b9050838110156106cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c6906115a6565b60405180910390fd5b6106dc82868684036107c0565b60019250505092915050565b6000806106f36107b8565b9050610700818585610a17565b600191505092915050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610830576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082790611638565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108a0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610897906116ca565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405161097e919061126f565b60405180910390a3505050565b60006109978484610731565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a115781811015610a03576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fa90611736565b60405180910390fd5b610a1084848484036107c0565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610a87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7e906117c8565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610af7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aee9061185a565b60405180910390fd5b610b02838383610e6f565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610b88576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7f906118ec565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c1b919061143b565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610c7f919061126f565b60405180910390a3610c92848484610e74565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610d08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cff9061197e565b60405180910390fd5b610d1482600083610e6f565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9190611a10565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160026000828254610df19190611a30565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e56919061126f565b60405180910390a3610e6a83600084610e74565b505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610eb3578082015181840152602081019050610e98565b83811115610ec2576000848401525b50505050565b6000601f19601f8301169050919050565b6000610ee482610e79565b610eee8185610e84565b9350610efe818560208601610e95565b610f0781610ec8565b840191505092915050565b60006020820190508181036000830152610f2c8184610ed9565b905092915050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f7382610f48565b9050919050565b610f8381610f68565b8114610f8e57600080fd5b50565b600081359050610fa081610f7a565b92915050565b6000819050919050565b610fb981610fa6565b8114610fc457600080fd5b50565b600081359050610fd681610fb0565b92915050565b60008060408385031215610ff357610ff2610f3e565b5b600061100185828601610f91565b925050602061101285828601610fc7565b9150509250929050565b60008115159050919050565b6110318161101c565b82525050565b600060208201905061104c6000830184611028565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61109482610ec8565b810181811067ffffffffffffffff821117156110b3576110b261105c565b5b80604052505050565b60006110c6610f34565b90506110d2828261108b565b919050565b600067ffffffffffffffff8211156110f2576110f161105c565b5b6110fb82610ec8565b9050602081019050919050565b82818337600083830152505050565b600061112a611125846110d7565b6110bc565b90508281526020810184848401111561114657611145611057565b5b611151848285611108565b509392505050565b600082601f83011261116e5761116d611052565b5b813561117e848260208601611117565b91505092915050565b600080600080608085870312156111a1576111a0610f3e565b5b60006111af87828801610f91565b94505060206111c087828801610f91565b93505060406111d187828801610fc7565b925050606085013567ffffffffffffffff8111156111f2576111f1610f43565b5b6111fe87828801611159565b91505092959194509250565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61123f8161120a565b82525050565b600060208201905061125a6000830184611236565b92915050565b61126981610fa6565b82525050565b60006020820190506112846000830184611260565b92915050565b6000806000606084860312156112a3576112a2610f3e565b5b60006112b186828701610f91565b93505060206112c286828701610f91565b92505060406112d386828701610fc7565b9150509250925092565b600060ff82169050919050565b6112f3816112dd565b82525050565b600060208201905061130e60008301846112ea565b92915050565b60006020828403121561132a57611329610f3e565b5b600061133884828501610f91565b91505092915050565b61134a81610f68565b82525050565b60006020820190506113656000830184611341565b92915050565b6000806040838503121561138257611381610f3e565b5b600061139085828601610f91565b92505060206113a185828601610f91565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806113f257607f821691505b60208210811415611406576114056113ab565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061144682610fa6565b915061145183610fa6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156114865761148561140c565b5b828201905092915050565b7f4e6565642066756c6c206f776e65727368697000000000000000000000000000600082015250565b60006114c7601383610e84565b91506114d282611491565b602082019050919050565b600060208201905081810360008301526114f6816114ba565b9050919050565b60006060820190506115126000830186611341565b61151f6020830185611341565b61152c6040830184611260565b949350505050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611590602583610e84565b915061159b82611534565b604082019050919050565b600060208201905081810360008301526115bf81611583565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611622602483610e84565b915061162d826115c6565b604082019050919050565b6000602082019050818103600083015261165181611615565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b60006116b4602283610e84565b91506116bf82611658565b604082019050919050565b600060208201905081810360008301526116e3816116a7565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611720601d83610e84565b915061172b826116ea565b602082019050919050565b6000602082019050818103600083015261174f81611713565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006117b2602583610e84565b91506117bd82611756565b604082019050919050565b600060208201905081810360008301526117e1816117a5565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611844602383610e84565b915061184f826117e8565b604082019050919050565b6000602082019050818103600083015261187381611837565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006118d6602683610e84565b91506118e18261187a565b604082019050919050565b60006020820190508181036000830152611905816118c9565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000611968602183610e84565b91506119738261190c565b604082019050919050565b600060208201905081810360008301526119978161195b565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b60006119fa602283610e84565b9150611a058261199e565b604082019050919050565b60006020820190508181036000830152611a29816119ed565b9050919050565b6000611a3b82610fa6565b9150611a4683610fa6565b925082821015611a5957611a5861140c565b5b82820390509291505056fea2646970667358221220d21e2e74f4592fffb9e61695ab66b456d933317e28e262941ca30946a7156bd964736f6c63430008090033a2646970667358221220f49e0f4a0bb8ab9e296c909789551f3c634cc7a7b74c6231ece629b81825833464736f6c63430008090033";

type FractionaliserConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FractionaliserConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Fractionaliser__factory extends ContractFactory {
  constructor(...args: FractionaliserConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Fractionaliser";
  }

  deploy(
    _marketplaceAddress: string,
    _reiAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Fractionaliser> {
    return super.deploy(
      _marketplaceAddress,
      _reiAddress,
      overrides || {}
    ) as Promise<Fractionaliser>;
  }
  getDeployTransaction(
    _marketplaceAddress: string,
    _reiAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _marketplaceAddress,
      _reiAddress,
      overrides || {}
    );
  }
  attach(address: string): Fractionaliser {
    return super.attach(address) as Fractionaliser;
  }
  connect(signer: Signer): Fractionaliser__factory {
    return super.connect(signer) as Fractionaliser__factory;
  }
  static readonly contractName: "Fractionaliser";
  public readonly contractName: "Fractionaliser";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FractionaliserInterface {
    return new utils.Interface(_abi) as FractionaliserInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Fractionaliser {
    return new Contract(address, _abi, signerOrProvider) as Fractionaliser;
  }
}
