export const getOwnerDataAbi = {
  inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
  name: "getOwnerData",
  outputs: [
    {
      components: [
        { internalType: "string", name: "firstName", type: "string" },
        { internalType: "string", name: "lastName", type: "string" },
        { internalType: "string", name: "citizenship", type: "string" },
        { internalType: "string", name: "gender", type: "string" },
        { internalType: "uint256", name: "age", type: "uint256" },
      ],
      internalType: "struct PassportNFT.OwnerData",
      name: "",
      type: "tuple",
    },
  ],
  stateMutability: "view",
  type: "function",
} as const;

export const safeMintAbi = {
  inputs: [
    { internalType: "address", name: "_to", type: "address" },
    {
      components: [
        { internalType: "string", name: "firstName", type: "string" },
        { internalType: "string", name: "lastName", type: "string" },
        { internalType: "string", name: "citizenship", type: "string" },
        { internalType: "string", name: "gender", type: "string" },
        { internalType: "uint256", name: "age", type: "uint256" },
      ],
      internalType: "struct PassportNFT.OwnerData",
      name: "_ownerData",
      type: "tuple",
    },
  ],
  name: "safeMint",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
} as const;

export const getOwnerNftsAbi = {
  inputs: [{ internalType: "address", name: "_owner", type: "address" }],
  name: "getOwnerNfts",
  outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
  stateMutability: "view",
  type: "function",
} as const;
