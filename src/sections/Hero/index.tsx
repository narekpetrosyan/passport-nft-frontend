import { FC } from "react";
import { Header } from "../../features/Header";
import { Button } from "../../components/Button";

import styles from "./Hero.module.scss";

export const Hero: FC = () => {
  const handleCreate = () => {
    document
      .getElementById("issueSection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.infoSection}>
        <div className={styles.textsSection}>
          <h1 className={styles.passport}>DIGITAL PASSPORT</h1>
          <h1 className={styles.nft}>AS AN NFT</h1>
          <p>
            We encompass the best of local traditions in all the components of
            our network and take inspiration from
          </p>
          <Button onClick={handleCreate}>Create Passport</Button>
        </div>
        <div className={styles.imageSection}>
          <img src="/images/hero.png" alt="hero" />
        </div>
      </div>
    </div>
  );
};
