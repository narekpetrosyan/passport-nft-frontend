import { http, createConfig, Config } from "wagmi";
import { Chain, bahamut, sepolia } from "wagmi/chains";

export const selectedChain: Chain =
  import.meta.env.APP_ENVIRONMENT !== "production" ? sepolia : bahamut;

export const wagmiConfig: Config = createConfig({
  chains: [selectedChain],
  transports: {
    [selectedChain.id]: http(),
  },
});
