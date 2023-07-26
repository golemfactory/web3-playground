import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useMetaMask } from "./MetaMaskProvider";
import golemAbi from "./tokens/golem/abi.json";
import { randomBytes, ethers } from "ethers";
import { withAll } from "./flows";
const { ethereum } = window;

//@ts-ignore
window.ethers = ethers;
export const EthTransfer = () => {
  const [transferData, setTransferData] = useState([
    {
      address: "",
      amount: 0,
      type: "transfer" as "transfer" | "allowance",
      mode: "instant" as "instant" | "meta",
    },
  ]);

  const { connectMetaMask, wallet } = useMetaMask();

  const hasAccounts = wallet.accounts.length > 0;
  const [selectedAccount, setSelectedAccount] = useState(
    hasAccounts ? wallet.accounts[0] : ""
  );

  useEffect(() => {
    if (wallet.accounts.length > 0) {
      setSelectedAccount(wallet.accounts[0]);
    }
  }, [wallet.accounts]);

  const handleAddTransfer = () => {
    setTransferData([
      ...transferData,
      {
        address: "",
        amount: 0,
        type: "transfer" as "transfer" | "allowance",
        mode: "instant" as "instant" | "meta",
      },
    ]);
  };

  const handleAddressChange = (index: number, value: string) => {
    const updatedData = [...transferData];
    updatedData[index].address = value;
    setTransferData(updatedData);
  };

  const handleTransactionTypeChange = (
    index: number,
    value: "transfer" | "allowance"
  ) => {
    const updatedData = [...transferData];
    updatedData[index].type = value;
    setTransferData(updatedData);
  };

  const handleTransactionModeChange = (
    index: number,
    value: "instant" | "meta"
  ) => {
    const updatedData = [...transferData];
    updatedData[index].mode = value;
    setTransferData(updatedData);
  };

  const handleAmountChange = (index: number, value: number) => {
    const updatedData = [...transferData];
    updatedData[index].amount = value;
    setTransferData(updatedData);
  };

  const handleTransaction = async () => {
    const provider = new ethers.BrowserProvider(ethereum);

    const signer = await provider.getSigner(selectedAccount as string);

    const tokenContract = new ethers.Contract(
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      golemAbi,
      signer
    );

    console.log("tokenContract", tokenContract);

    // return;
    for (const data of transferData) {
      if (data.mode === "meta") {
        const types = {
          MetaTransaction: [
            { name: "nonce", type: "uint256" },
            { name: "from", type: "address" },
            { name: "functionSignature", type: "bytes" },
          ],
        };

        const domain = {
          name: "(PoS) Tether USD",
          version: "1",
          verifyingContract: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
          salt: "0x0000000000000000000000000000000000000000000000000000000000000089",
        };

        const transaction = await tokenContract.approve.populateTransaction(
          "0xf315467a9460c1b3d8b92d419177fd9130c563e5",
          1000
        );

        const functionSignature = transaction.data;
        const functionSignature2 = tokenContract.interface.encodeFunctionData(
          "approve",
          ["0xf315467a9460c1b3d8b92d419177fd9130c563e5", 1000]
        );

        console.log("functionSignature", functionSignature);
        console.log("functionSignature2", functionSignature2);
        const nonce = await tokenContract.getNonce(selectedAccount);
        console.log("nonce", nonce);
        const message = {
          nonce: nonce,
          from: selectedAccount,
          functionSignature: functionSignature,
        };

        console.log("message", message);

        withAll({
          domain,
          types,
          message,
          signer,
          selectedAccount,
          tokenContract,
        });
      }
      if (data.mode === "instant") {
        if (data.type === "allowance") {
          tokenContract.approve(data.address, data.amount);
        }
        if (data.type === "transfer") {
          tokenContract.transfer(data.address, data.amount);
        }
      }
    }
  };

  return (
    <div className="grid py-8 grid-cols-4 ">
      <div className="col-span-1"></div>
      <div className="col-span-2">
        {hasAccounts ? (
          <div>
            {wallet.accounts.length === 1 ? (
              <div>
                <label htmlFor="accountSelect" className="block mb-2">
                  Account:
                </label>
                <p
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  id="accountSelect"
                >
                  {wallet.accounts[0]}
                </p>
              </div>
            ) : (
              <div>
                <label htmlFor="accountSelect" className="block mb-2">
                  Choose Account:
                </label>
                <select
                  id="accountSelect"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.currentTarget.value)}
                >
                  {wallet.accounts.map((account: any) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {transferData.map((data, index) => (
              <Fragment key={index}>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    value={data.address}
                    onInput={(e) =>
                      handleAddressChange(index, e.currentTarget.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="ETH Amount"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    value={data.amount}
                    onInput={(e) =>
                      handleAmountChange(index, parseInt(e.currentTarget.value))
                    }
                  />
                  <select
                    className="p-2 border border-gray-300 rounded"
                    value={data.type}
                    onChange={(e) =>
                      handleTransactionTypeChange(
                        index,
                        e.currentTarget.value as "transfer" | "allowance"
                      )
                    }
                  >
                    <option value="transfer">Transfer</option>
                    <option value="allowance">Allowance</option>
                  </select>

                  <select
                    className="p-2 border border-gray-300 rounded"
                    value={data.mode}
                    onChange={(e) =>
                      handleTransactionModeChange(
                        index,
                        e.currentTarget.value as "instant" | "meta"
                      )
                    }
                  >
                    <option value="instant">Instant</option>
                    <option value="meta">Meta</option>
                  </select>
                </div>
                <br />
              </Fragment>
            ))}
            <button
              className="px-4 py-2 mt-2 text-white bg-primary hover:bg-opacity-80"
              onClick={handleAddTransfer}
            >
              Add Transaction
            </button>
            <button
              className="px-4 py-2 mt-2 ml-4 text-white bg-green-500 hover:bg-opacity-80"
              onClick={handleTransaction}
            >
              Send Transactions
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                connectMetaMask();
              }}
              className="px-4 py-2 px-4 py-2 mt-2 ml-4 text-white bg-green-500 hover:bg-opacity-80"
            >
              Connect MetaMask
            </button>
          </div>
        )}
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};
