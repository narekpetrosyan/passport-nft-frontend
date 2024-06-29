import { useAccount, useReadContract } from "wagmi";
import { getOwnerDataAbi, getOwnerNftsAbi } from "../consts/abi";

export const useUserData = () => {
  const { address } = useAccount();
  const { data: ownerNftsResult, isFetching: isOwnerNftsFetching } =
    useReadContract({
      abi: [getOwnerNftsAbi],
      args: [address!],
      address: import.meta.env.APP_PASSPORT_CONTRACT_ADDRESS as `0x${string}`,
      functionName: "getOwnerNfts",
      scopeKey: "getOwnerNfts",
      query: { enabled: !!address },
    });

  const { data: ownerDataResult, isFetching: isOwnerDataFetching } =
    useReadContract({
      abi: [getOwnerDataAbi],
      ...(ownerNftsResult?.length && { args: [ownerNftsResult[0]] }),
      address: import.meta.env.APP_PASSPORT_CONTRACT_ADDRESS as `0x${string}`,
      functionName: "getOwnerData",
      scopeKey: "getOwnerData",
    });

  return {
    isLoading: isOwnerNftsFetching || isOwnerDataFetching,
    owner: ownerDataResult,
  };
};
