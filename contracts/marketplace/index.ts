const address = "0xEBa35233e4EF1DfC972ed2f35a80a4651F7fE0aD";
const abi = [
  {
    inputs: [
      { internalType: "address", name: "_nftgt_token", type: "address" },
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
        name: "nftContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: false, internalType: "bool", name: "sold", type: "bool" },
    ],
    name: "MarketItemCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "_itemsCancelled",
    outputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_itemsSold",
    outputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_itemtotal",
    outputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token_addr", type: "address" },
      { internalType: "address", name: "operator_addr", type: "address" },
    ],
    name: "approve_contract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "erc_addr", type: "address" },
      { internalType: "address", name: "approved_addr", type: "address" },
    ],
    name: "approve_erc20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "cancelMarketItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "createMarketItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "stable_coin_addr", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "createMarketSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchItemsCreated",
    outputs: [
      {
        components: [
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "bool", name: "sold", type: "bool" },
        ],
        internalType: "struct NFTGT_Market.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMyNFTs",
    outputs: [
      {
        components: [
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "bool", name: "sold", type: "bool" },
        ],
        internalType: "struct NFTGT_Market.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListingPercentage",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "idToMarketItem",
    outputs: [
      { internalType: "address", name: "nftContract", type: "address" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "bool", name: "sold", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listingPercentage",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftgt_token_addr",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payee",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_percent", type: "uint256" }],
    name: "setListingPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_addr", type: "address" },
      { internalType: "bool", name: "_bool", type: "bool" },
    ],
    name: "set_stablecoin_flag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stablecoin_address",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const makeContract = () => {
  return {
    address: address.toLowerCase(),
    abi: abi,
  };
};

export default makeContract();
