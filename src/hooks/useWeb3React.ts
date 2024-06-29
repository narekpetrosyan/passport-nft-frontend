import { useEffect, useState } from "react";
import {
  ChainNotConfiguredError,
  Config,
  Connector,
  useAccount,
  useConnect,
} from "wagmi";
import { selectedChain } from "../config/wagmiConfig";
import { ConnectMutateAsync } from "wagmi/query";

interface ReturnValues {
  error?: ChainNotConfiguredError;
  address?: `0x${string}`;
  isConnected: boolean;
  connectAsync: ConnectMutateAsync<Config, unknown>;
  connectors: readonly Connector[];
}

export const useWeb3React = (): ReturnValues => {
  const { address, chainId, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const [error, setError] = useState<ChainNotConfiguredError>();

  useEffect(() => {
    if (chainId && chainId !== selectedChain.id) {
      const err = new ChainNotConfiguredError();
      setError(err);
    } else {
      setError(undefined);
    }
  }, [chainId]);

  return {
    error,
    address,
    isConnected,
    connectAsync,
    connectors,
  };
};
