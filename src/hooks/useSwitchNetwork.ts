import { useCallback } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { selectedChain } from "../config/wagmiConfig";
import { CHAIN_PARAMS } from "../consts/chainParams";

export const useSwitchNetwork = () => {
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  return useCallback(async () => {
    try {
      if (chainId && chainId !== selectedChain.id) {
        await switchChainAsync({
          chainId: selectedChain.id,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          addEthereumChainParameter: CHAIN_PARAMS[chainId],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [chainId, switchChainAsync]);
};
