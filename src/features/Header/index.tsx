import { FC } from "react";

import styles from "./Header.module.scss";
import { Button } from "../../components/Button";
import { useSwitchNetwork } from "../../hooks/useSwitchNetwork";
import { useWeb3React } from "../../hooks/useWeb3React";
import { useBalance } from "wagmi";
import { formatEther } from "viem";
import { useUserData } from "../../hooks/useUserData";
import { beautifyAddress } from "../../helpers/beautifyAddress";

export const Header: FC = () => {
  const switchNetwork = useSwitchNetwork();

  const { error, address, connectAsync, connectors, isConnected } =
    useWeb3React();

  const { data } = useBalance({ address });

  const { isLoading, owner } = useUserData();

  const handleConnectWallet = () => {
    const mmConnector = connectors.find((el) => el.id === "io.metamask");
    if (!mmConnector) {
      return;
    }
    connectAsync({ connector: mmConnector });
  };

  if (!isConnected) {
    return (
      <div className={styles.header}>
        <div style={{ color: "#fff" }}>Logo</div>
        <div>
          <Button onClick={handleConnectWallet}>Connect Wallet</Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.header}>
        <div style={{ color: "#fff" }}>Logo</div>
        <div>
          <Button onClick={switchNetwork}>Wrong Chain</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <div style={{ color: "#fff" }}>Logo</div>
      <div className={styles.accInfo}>
        <div className={styles.circle} />
        <div className={styles.nameBalance}>
          {isLoading ? (
            <p className={styles.name}>loading...</p>
          ) : !owner ? (
            <p className={styles.name}>{beautifyAddress(address as string)}</p>
          ) : (
            <p className={styles.name}>
              {`${owner.firstName} ${owner.lastName}`}
            </p>
          )}

          {data && (
            <p className={styles.balance}>
              {Number(formatEther(data.value)).toFixed(3)} {data.symbol}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
