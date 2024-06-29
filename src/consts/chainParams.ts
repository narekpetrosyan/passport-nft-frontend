import { bahamut, sepolia } from "viem/chains";

export const CHAIN_PARAMS = {
  [bahamut.id]: {
    rpcUrls: ["https://bahamut-rpc.publicnode.com"],
    chainName: "Bahamut",
    nativeCurrency: { name: "FTN", decimals: 18, symbol: "FTN" },
    blockExplorerUrls: ["https://ftnscan.com"],
    iconUrls: [
      "https://s2.coinmarketcap.com/static/img/coins/200x200/22615.png",
    ],
  },
  [sepolia.id]: {
    rpcUrls: ["https://sepolia.drpc.org"],
    chainName: "Sepolia",
    nativeCurrency: { name: "Ethereum", decimals: 18, symbol: "ETH" },
    blockExplorerUrls: ["https://sepolia.etherscan.com"],
    iconUrls: [
      "https://s2.coinmarketcap.com/static/img/coins/200x200/22615.png",
    ],
  },
};
