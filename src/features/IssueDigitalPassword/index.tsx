import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import formSchema from "./formSchema";
import { safeMintAbi } from "../../consts/abi";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import Modal from "../../components/Modal";
import { queryClient } from "../../App";
import { useWeb3React } from "../../hooks/useWeb3React";

import styles from "./IssueDigitalPassword.module.scss";

export const IssueDigitalPassword: FC = () => {
  const { address, isConnected, connectAsync, connectors } = useWeb3React();
  const { writeContractAsync, isPending, data } = useWriteContract();
  const { isSuccess, isFetching } = useWaitForTransactionReceipt({
    hash: data,
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setIsOpenModal(isSuccess);

    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["getOwnerNfts", "getOwnerData"],
      });
    }
  }, [isSuccess]);

  const hookForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: "",
      nationality: "",
      gender: "",
    },
  });

  const { handleSubmit } = hookForm;

  const handleIssue = handleSubmit(async (data) => {
    try {
      if (!address && !isConnected) {
        const mmConnector = connectors.find((el) => el.id === "io.metamask");
        if (!mmConnector) {
          return;
        }
        const { accounts } = await connectAsync({ connector: mmConnector });

        await writeContractAsync({
          address: import.meta.env
            .APP_PASSPORT_CONTRACT_ADDRESS as `0x${string}`,
          abi: [safeMintAbi],
          functionName: "safeMint",
          args: [
            accounts[0]!,
            {
              firstName: data.name,
              lastName: data.surname,
              citizenship: data.nationality,
              age: BigInt(data.age),
              gender: data.gender,
            },
          ],
        });
      } else {
        await writeContractAsync({
          address: import.meta.env
            .APP_PASSPORT_CONTRACT_ADDRESS as `0x${string}`,
          abi: [safeMintAbi],
          functionName: "safeMint",
          args: [
            address!,
            {
              firstName: data.name,
              lastName: data.surname,
              citizenship: data.nationality,
              age: BigInt(data.age),
              gender: data.gender,
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div className={styles.wrapper}>
        <FormProvider {...hookForm}>
          <Input title="Name" placeholder="Please fill your Name" name="name" />
          <Input
            title="Surname"
            placeholder="Please fill your Surname"
            name="surname"
          />
          <Input
            type="number"
            title="Age"
            placeholder="Please fill your Age"
            name="age"
          />
          <Input
            title="Nationality"
            placeholder="Please fill your Nationality"
            name="nationality"
          />
          <Input
            title="Gender"
            placeholder="Please fill your Gender"
            name="gender"
          />
          <Button onClick={handleIssue} disabled={isPending || isFetching}>
            Issue my digital passport
          </Button>
        </FormProvider>
      </div>

      <Modal
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        maxWidth={420}
        classes={{ content: styles.modal }}
      >
        <div className={styles.inner}>
          <h6>Congratulations</h6>
          <p>Check your wallet</p>
        </div>
      </Modal>
    </>
  );
};
