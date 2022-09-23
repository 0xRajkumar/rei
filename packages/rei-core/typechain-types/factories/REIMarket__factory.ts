/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { REIMarket, REIMarketInterface } from "../REIMarket";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "fractionaliser",
        type: "address",
      },
      {
        internalType: "address",
        name: "usdtAddress",
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
        indexed: false,
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fractionalisedId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "fractionalisedNftAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfFractions",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "Loanee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loanAmountPerFraction",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "interestPerFractionInPercentage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "repayByTimeStamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum REIMarket.LendStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "Applied",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfInvesters",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfFractionsInvested",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "invester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountInvestedByInvester",
        type: "uint256",
      },
    ],
    name: "InterestPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfFractionsInvested",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfInvesters",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum REIMarket.LendStatus",
        name: "status",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "invester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountInvestedByInvester",
        type: "uint256",
      },
    ],
    name: "Invested",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum REIMarket.LendStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "Repayed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum REIMarket.LendStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "WithDrawalLoan",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfFractionsInvested",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfInvesters",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "invester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountInvestedByInvester",
        type: "uint256",
      },
    ],
    name: "WithdrawalBeforeFunded",
    type: "event",
  },
  {
    inputs: [],
    name: "USDTAddress",
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
        name: "_fractionalisedId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberOfFractions",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_loanAmountPerFraction",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_interestPerFractionInPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repayByTimeStamp",
        type: "uint256",
      },
    ],
    name: "applyForLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
    ],
    name: "getBackInvestmentWithInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberOfFraction",
        type: "uint256",
      },
    ],
    name: "invest",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "relaxationPeriodForlonee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
    ],
    name: "repay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fractionaliser",
        type: "address",
      },
    ],
    name: "setFractionaliserContract",
    outputs: [],
    stateMutability: "nonpayable",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "usdtAddress",
        type: "address",
      },
    ],
    name: "updateUSDT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberOfFraction",
        type: "uint256",
      },
    ],
    name: "withdrawBeforeFunded",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lendingNumber",
        type: "uint256",
      },
    ],
    name: "withdrawLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620034df380380620034df833981810160405281019062000037919062000258565b620000576200004b6200012260201b60201c565b6200012a60201b60201c565b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200029f565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200022082620001f3565b9050919050565b620002328162000213565b81146200023e57600080fd5b50565b600081519050620002528162000227565b92915050565b60008060408385031215620002725762000271620001ee565b5b6000620002828582860162000241565b9250506020620002958582860162000241565b9150509250929050565b61323080620002af6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806377ec3e2c1161008c578063b3a4562e11610066578063b3a4562e146101c2578063d87aa643146101de578063f2fde38b146101fa578063ff920c7414610216576100cf565b806377ec3e2c1461016a5780638be6033e146101885780638da5cb5b146101a4576100cf565b806312641422146100d45780631d5e0660146100f05780632a104d8d1461010c578063371fd8e61461012857806361b148fb14610144578063715018a614610160575b600080fd5b6100ee60048036038101906100e99190612588565b610234565b005b61010a600480360381019061010591906125eb565b610278565b005b61012660048036038101906101219190612666565b610867565b005b610142600480360381019061013d9190612666565b610adc565b005b61015e60048036038101906101599190612588565b610f53565b005b610168610fd8565b005b610172610fec565b60405161017f91906126a2565b60405180910390f35b6101a2600480360381019061019d91906126bd565b610ff2565b005b6101ac61164b565b6040516101b9919061270c565b60405180910390f35b6101dc60048036038101906101d79190612666565b611674565b005b6101f860048036038101906101f391906126bd565b611c6d565b005b610214600480360381019061020f9190612588565b6122b1565b005b61021e612335565b60405161022b919061270c565b60405180910390f35b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bf99ef9d6040518163ffffffff1660e01b815260040160206040518083038186803b1580156102e057600080fd5b505afa1580156102f4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610318919061273c565b85111561035a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610351906127c6565b60405180910390fd5b6000841161039d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039490612858565b60405180910390fd5b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636eedf0a4876040518263ffffffff1660e01b81526004016103fa91906126a2565b60206040518083038186803b15801561041257600080fd5b505afa158015610426573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044a919061288d565b9050848173ffffffffffffffffffffffffffffffffffffffff166370a0823161047161235b565b6040518263ffffffff1660e01b815260040161048d919061270c565b60206040518083038186803b1580156104a557600080fd5b505afa1580156104b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104dd919061273c565b101561051e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051590612906565b60405180910390fd5b60008411801561052e5750600083115b61056d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056490612972565b60405180910390fd5b848173ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e61059261235b565b306040518363ffffffff1660e01b81526004016105b0929190612992565b60206040518083038186803b1580156105c857600080fd5b505afa1580156105dc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610600919061273c565b1015610641576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610638906129e1565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166323b872dd61066561235b565b30886040518463ffffffff1660e01b815260040161068593929190612a01565b602060405180830381600087803b15801561069f57600080fd5b505af11580156106b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d79190612a70565b506106e26001612363565b6000600660006106f26001612379565b81526020019081526020016000209050868160000181905550818160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085816002018190555061075f61235b565b8160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550848160070181905550838160080181905550828160090181905550600081600b0160006101000a81548160ff021916908360048111156107e4576107e3612a9d565b5b02179055507ff89b21ee910bf63eddd5c078034761f6127a6f54fd7ef70eef93bfb0fdc059716108146001612379565b8884898560040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168a8a8a600060405161085699989796959493929190612b73565b60405180910390a150505050505050565b6108716001612379565b8111156108b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108aa906129e1565b60405180910390fd5b6000600660008381526020019081526020016000209050600160048111156108de576108dd612a9d565b5b81600b0160009054906101000a900460ff16600481111561090257610901612a9d565b5b1461090c57600080fd5b61091461235b565b73ffffffffffffffffffffffffffffffffffffffff168160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099c906129e1565b60405180910390fd5b600281600b0160006101000a81548160ff021916908360048111156109cd576109cc612a9d565b5b0217905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd30610a1961235b565b84600201548560070154610a2d9190612c2f565b6040518463ffffffff1660e01b8152600401610a4b93929190612a01565b602060405180830381600087803b158015610a6557600080fd5b505af1158015610a79573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a9d9190612a70565b507f6ba49b521d62c24e8060f3b813e949ad86679fe027df553fb1919b1a0750c930826002604051610ad0929190612c89565b60405180910390a15050565b610ae66001612379565b811115610b28576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1f906129e1565b60405180910390fd5b60006006600083815260200190815260200160002090504281600a01548260090154610b549190612cb2565b1015610b95576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b8c906129e1565b60405180910390fd5b60026004811115610ba957610ba8612a9d565b5b81600b0160009054906101000a900460ff166004811115610bcd57610bcc612a9d565b5b14610bd757600080fd5b600081600701549050600061271083600801548460070154610bf99190612c2f565b610c039190612d37565b905060008183610c139190612cb2565b9050836002015481610c259190612c2f565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231610c6b61235b565b6040518263ffffffff1660e01b8152600401610c87919061270c565b60206040518083038186803b158015610c9f57600080fd5b505afa158015610cb3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd7919061273c565b1015610d18576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d0f906129e1565b60405180910390fd5b836002015481610d289190612c2f565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e610d6e61235b565b306040518363ffffffff1660e01b8152600401610d8c929190612992565b60206040518083038186803b158015610da457600080fd5b505afa158015610db8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ddc919061273c565b1015610e1d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e14906129e1565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd610e6361235b565b30876002015485610e749190612c2f565b6040518463ffffffff1660e01b8152600401610e9293929190612a01565b602060405180830381600087803b158015610eac57600080fd5b505af1158015610ec0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ee49190612a70565b50600384600b0160006101000a81548160ff02191690836004811115610f0d57610f0c612a9d565b5b02179055507feeb4d7c159e7b93011157f426e0a861c84b49be383846666d37a1abf83dd822b856003604051610f44929190612c89565b60405180910390a15050505050565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b610fe0612387565b610fea6000612405565b565b60055481565b610ffc6001612379565b82111561103e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611035906129e1565b60405180910390fd5b60006006600084815260200190815260200160002090506000600481111561106957611068612a9d565b5b81600b0160009054906101000a900460ff16600481111561108d5761108c612a9d565b5b1461109757600080fd5b8060060160006110a561235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115611122576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611119906129e1565b60405180910390fd5b818160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823161116b61235b565b6040518263ffffffff1660e01b8152600401611187919061270c565b60206040518083038186803b15801561119f57600080fd5b505afa1580156111b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111d7919061273c565b1015611218576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120f90612db4565b60405180910390fd5b818160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e61126161235b565b306040518363ffffffff1660e01b815260040161127f929190612992565b60206040518083038186803b15801561129757600080fd5b505afa1580156112ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112cf919061273c565b1015611310576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611307906129e1565b60405180910390fd5b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd61135861235b565b30856040518463ffffffff1660e01b815260040161137893929190612a01565b602060405180830381600087803b15801561139257600080fd5b505af11580156113a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113ca9190612a70565b50600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3061141261235b565b8585600701546114229190612c2f565b6040518463ffffffff1660e01b815260040161144093929190612a01565b602060405180830381600087803b15801561145a57600080fd5b505af115801561146e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114929190612a70565b508181600301546114a39190612dd4565b8160030181905550818160060160006114ba61235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114ff9190612dd4565b81600601600061150d61235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600081600601600061155b61235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414156115a9576115a8816005016124c9565b5b7f5150ca58af13b805018b8101dd0959e0fa15b4674b84d8459506e8f576b1b8618382600301546115dc84600501612379565b6115e461235b565b8560060160006115f261235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205460405161163e959493929190612e08565b60405180910390a1505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61167e6001612379565b8111156116c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116b7906129e1565b60405180910390fd5b60006006600083815260200190815260200160002090504260055482600a015483600901546116ef9190612cb2565b6116f99190612cb2565b101561173a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611731906129e1565b60405180910390fd5b6003600481111561174e5761174d612a9d565b5b81600b0160009054906101000a900460ff16600481111561177257611771612a9d565b5b1461177c57600080fd5b60008160070154905060006127108360080154846007015461179e9190612c2f565b6117a89190612d37565b9050600081836117b89190612cb2565b905060008460060160006117ca61235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600081836118159190612c2f565b9050818660010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823161186061235b565b6040518263ffffffff1660e01b815260040161187c919061270c565b60206040518083038186803b15801561189457600080fd5b505afa1580156118a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118cc919061273c565b1461190c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161190390612db4565b60405180910390fd5b818660010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e61195561235b565b306040518363ffffffff1660e01b8152600401611973929190612992565b60206040518083038186803b15801561198b57600080fd5b505afa15801561199f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119c3919061273c565b1015611a04576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119fb906129e1565b60405180910390fd5b8560010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd611a4c61235b565b8860040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856040518463ffffffff1660e01b8152600401611a9093929190612e5b565b602060405180830381600087803b158015611aaa57600080fd5b505af1158015611abe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ae29190612a70565b50600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd30611b2a61235b565b846040518463ffffffff1660e01b8152600401611b4993929190612a01565b602060405180830381600087803b158015611b6357600080fd5b505af1158015611b77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b9b9190612a70565b506000866006016000611bac61235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550818660030154611bfa9190612dd4565b8660030181905550611c0e866005016124c9565b7f22667dcafa1dff3bf9063b870e4e81e132f6660e9d5f2bc44b1b20ab98acedb387611c3c88600501612379565b8860030154611c4961235b565b6000604051611c5c959493929190612ecd565b60405180910390a150505050505050565b611c776001612379565b821115611cb9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cb0906129e1565b60405180910390fd5b600060066000848152602001908152602001600020905080600301548160020154611ce49190612dd4565b821115611d26576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d1d906129e1565b60405180910390fd5b6000828260070154611d389190612c2f565b905080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231611d8161235b565b6040518263ffffffff1660e01b8152600401611d9d919061270c565b60206040518083038186803b158015611db557600080fd5b505afa158015611dc9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ded919061273c565b1015611e2e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e2590612f6c565b60405180910390fd5b80600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e611e7561235b565b306040518363ffffffff1660e01b8152600401611e93929190612992565b60206040518083038186803b158015611eab57600080fd5b505afa158015611ebf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ee3919061273c565b1015611f24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f1b90612fd8565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd611f6a61235b565b30846040518463ffffffff1660e01b8152600401611f8a93929190612a01565b602060405180830381600087803b158015611fa457600080fd5b505af1158015611fb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fdc9190612a70565b508160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb61202561235b565b856040518363ffffffff1660e01b8152600401612043929190612ff8565b602060405180830381600087803b15801561205d57600080fd5b505af1158015612071573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120959190612a70565b5060008383600301546120a89190612cb2565b905080836003018190555060008360060160006120c361235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414156121115761211083600501612363565b5b8383600601600061212061235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546121659190612cb2565b83600601600061217361235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508260030154836002015414156121f857600183600b0160006101000a81548160ff021916908360048111156121e9576121e8612a9d565b5b02179055504283600a01819055505b7f6b5075def2f18d0bf25432c97336c3a7ee13314030cd7d21bd064f9b5404d1a3858261222786600501612379565b86600a015487600b0160009054906101000a900460ff1661224661235b565b89600601600061225461235b565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040516122a29796959493929190613021565b60405180910390a15050505050565b6122b9612387565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415612329576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161232090613102565b60405180910390fd5b61233281612405565b50565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b6001816000016000828254019250508190555050565b600081600001549050919050565b61238f61235b565b73ffffffffffffffffffffffffffffffffffffffff166123ad61164b565b73ffffffffffffffffffffffffffffffffffffffff1614612403576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123fa9061316e565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008160000154905060008111612515576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161250c906131da565b60405180910390fd5b6001810382600001819055505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006125558261252a565b9050919050565b6125658161254a565b811461257057600080fd5b50565b6000813590506125828161255c565b92915050565b60006020828403121561259e5761259d612525565b5b60006125ac84828501612573565b91505092915050565b6000819050919050565b6125c8816125b5565b81146125d357600080fd5b50565b6000813590506125e5816125bf565b92915050565b600080600080600060a0868803121561260757612606612525565b5b6000612615888289016125d6565b9550506020612626888289016125d6565b9450506040612637888289016125d6565b9350506060612648888289016125d6565b9250506080612659888289016125d6565b9150509295509295909350565b60006020828403121561267c5761267b612525565b5b600061268a848285016125d6565b91505092915050565b61269c816125b5565b82525050565b60006020820190506126b76000830184612693565b92915050565b600080604083850312156126d4576126d3612525565b5b60006126e2858286016125d6565b92505060206126f3858286016125d6565b9150509250929050565b6127068161254a565b82525050565b600060208201905061272160008301846126fd565b92915050565b600081519050612736816125bf565b92915050565b60006020828403121561275257612751612525565b5b600061276084828501612727565b91505092915050565b600082825260208201905092915050565b7f496e76616c6964205f6672616374696f6e616c69736564496400000000000000600082015250565b60006127b0601983612769565b91506127bb8261277a565b602082019050919050565b600060208201905081810360008301526127df816127a3565b9050919050565b7f4e756d626572206f66204672616374696f6e2073686f756c64206265206d6f7260008201527f65207468616e207a65726f000000000000000000000000000000000000000000602082015250565b6000612842602b83612769565b915061284d826127e6565b604082019050919050565b6000602082019050818103600083015261287181612835565b9050919050565b6000815190506128878161255c565b92915050565b6000602082840312156128a3576128a2612525565b5b60006128b184828501612878565b91505092915050565b7f496e76616c6964202062616c616e63654f660000000000000000000000000000600082015250565b60006128f0601283612769565b91506128fb826128ba565b602082019050919050565b6000602082019050818103600083015261291f816128e3565b9050919050565b7f496e76616c6964205f6c6f616e416d6f756e745065724672616374696f6e0000600082015250565b600061295c601e83612769565b915061296782612926565b602082019050919050565b6000602082019050818103600083015261298b8161294f565b9050919050565b60006040820190506129a760008301856126fd565b6129b460208301846126fd565b9392505050565b50565b60006129cb600083612769565b91506129d6826129bb565b600082019050919050565b600060208201905081810360008301526129fa816129be565b9050919050565b6000606082019050612a1660008301866126fd565b612a2360208301856126fd565b612a306040830184612693565b949350505050565b60008115159050919050565b612a4d81612a38565b8114612a5857600080fd5b50565b600081519050612a6a81612a44565b92915050565b600060208284031215612a8657612a85612525565b5b6000612a9484828501612a5b565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000819050919050565b6000612af1612aec612ae78461252a565b612acc565b61252a565b9050919050565b6000612b0382612ad6565b9050919050565b6000612b1582612af8565b9050919050565b612b2581612b0a565b82525050565b60058110612b3c57612b3b612a9d565b5b50565b6000819050612b4d82612b2b565b919050565b6000612b5d82612b3f565b9050919050565b612b6d81612b52565b82525050565b600061012082019050612b89600083018c612693565b612b96602083018b612693565b612ba3604083018a6126fd565b612bb06060830189612693565b612bbd6080830188612b1c565b612bca60a0830187612693565b612bd760c0830186612693565b612be460e0830185612693565b612bf2610100830184612b64565b9a9950505050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612c3a826125b5565b9150612c45836125b5565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612c7e57612c7d612c00565b5b828202905092915050565b6000604082019050612c9e6000830185612693565b612cab6020830184612b64565b9392505050565b6000612cbd826125b5565b9150612cc8836125b5565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612cfd57612cfc612c00565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612d42826125b5565b9150612d4d836125b5565b925082612d5d57612d5c612d08565b5b828204905092915050565b7f496e76616c696400000000000000000000000000000000000000000000000000600082015250565b6000612d9e600783612769565b9150612da982612d68565b602082019050919050565b60006020820190508181036000830152612dcd81612d91565b9050919050565b6000612ddf826125b5565b9150612dea836125b5565b925082821015612dfd57612dfc612c00565b5b828203905092915050565b600060a082019050612e1d6000830188612693565b612e2a6020830187612693565b612e376040830186612693565b612e4460608301856126fd565b612e516080830184612693565b9695505050505050565b6000606082019050612e7060008301866126fd565b612e7d6020830185612b1c565b612e8a6040830184612693565b949350505050565b6000819050919050565b6000612eb7612eb2612ead84612e92565b612acc565b6125b5565b9050919050565b612ec781612e9c565b82525050565b600060a082019050612ee26000830188612693565b612eef6020830187612693565b612efc6040830186612693565b612f0960608301856126fd565b612f166080830184612ebe565b9695505050505050565b7f4c6f772062616c616e6365000000000000000000000000000000000000000000600082015250565b6000612f56600b83612769565b9150612f6182612f20565b602082019050919050565b60006020820190508181036000830152612f8581612f49565b9050919050565b7f696e73756666696369656e7420616c6c6f77616e636500000000000000000000600082015250565b6000612fc2601683612769565b9150612fcd82612f8c565b602082019050919050565b60006020820190508181036000830152612ff181612fb5565b9050919050565b600060408201905061300d60008301856126fd565b61301a6020830184612693565b9392505050565b600060e082019050613036600083018a612693565b6130436020830189612693565b6130506040830188612693565b61305d6060830187612693565b61306a6080830186612b64565b61307760a08301856126fd565b61308460c0830184612693565b98975050505050505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006130ec602683612769565b91506130f782613090565b604082019050919050565b6000602082019050818103600083015261311b816130df565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000613158602083612769565b915061316382613122565b602082019050919050565b600060208201905081810360008301526131878161314b565b9050919050565b7f436f756e7465723a2064656372656d656e74206f766572666c6f770000000000600082015250565b60006131c4601b83612769565b91506131cf8261318e565b602082019050919050565b600060208201905081810360008301526131f3816131b7565b905091905056fea2646970667358221220d1937be7a3af622b464520033f9ae9b28d0cda58b48878e31b623ffb12c5b3ec64736f6c63430008090033";

type REIMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: REIMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class REIMarket__factory extends ContractFactory {
  constructor(...args: REIMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "REIMarket";
  }

  deploy(
    fractionaliser: string,
    usdtAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<REIMarket> {
    return super.deploy(
      fractionaliser,
      usdtAddress,
      overrides || {}
    ) as Promise<REIMarket>;
  }
  getDeployTransaction(
    fractionaliser: string,
    usdtAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      fractionaliser,
      usdtAddress,
      overrides || {}
    );
  }
  attach(address: string): REIMarket {
    return super.attach(address) as REIMarket;
  }
  connect(signer: Signer): REIMarket__factory {
    return super.connect(signer) as REIMarket__factory;
  }
  static readonly contractName: "REIMarket";
  public readonly contractName: "REIMarket";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): REIMarketInterface {
    return new utils.Interface(_abi) as REIMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): REIMarket {
    return new Contract(address, _abi, signerOrProvider) as REIMarket;
  }
}
