import { FC } from "react";

import styles from "./Form.module.scss";
import { IssueDigitalPassword } from "../../features/IssueDigitalPassword";

export const Form: FC = () => {
  return (
    <div className={styles.wrapper}>
      <img src="/images/fish.png" alt="fish" className={styles.fish} />
      <div id="issueSection" className={styles.inner}>
        <h3 className={styles.title}>Jump into the digital world</h3>
        <p className={styles.paragraph}>
          To get your digital passport please fill the fields
        </p>

        <IssueDigitalPassword />
      </div>
    </div>
  );
};
