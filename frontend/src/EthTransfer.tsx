import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useMetaMask } from "./MetaMaskProvider";
import { ethers } from "ethers";
import golemAbi from "./contracts/golem/abi.json";
const { ethereum } = window;

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
      "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      golemAbi,
      signer
    );

    for (const data of transferData) {
      if (data.mode === "meta") {
        const types = {
          transaction: [
            { name: "nonce", type: "uint256" },
            { name: "from", type: "address" },
            { name: "functionSignature", type: "bytes" },
          ],
        };

        //Sieciech guessed this ?!
        const domain = {
          name: "Golem Network Token (PoS)",
          version: "1",
          verifyingContract: "0x0b220b82f3ea3b7f6d9a1d8ab58930c064a2b5bf",
          salt: "0x0000000000000000000000000000000000000000000000000000000000000089",
        };

        const transaction = await tokenContract.approve.populateTransaction(
          data.address,
          1000
        );

        const functionSignature = transaction.data;

        //get contract nonce
        const nonce = await tokenContract.getNonce(selectedAccount);

        const message = {
          nonce: nonce,
          from: selectedAccount,
          functionSignature: functionSignature,
        };

        const signature = await signer.signTypedData(domain, types, message);

        const { r, s, v } = ethers.Signature.from(signature);

        tokenContract.executeMetaTransaction(
          selectedAccount,
          message.functionSignature,
          r,
          s,
          v
        );
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
