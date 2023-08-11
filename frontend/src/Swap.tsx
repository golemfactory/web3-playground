import React, { useEffect, useState } from "react";
import { handleMaticToGLM } from "./handlers/handleSwap";
import { ethers } from "ethers";
import { useMetaMask } from "./MetaMaskProvider";
const { ethereum } = window;

const SwapGLMs = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [value, setValue] = useState(0);
  const [amountOutMin, setAmountOutMin] = useState(0);

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

  const handleSwap = async () => {
    const provider = new ethers.BrowserProvider(ethereum);

    const signer = await provider.getSigner(selectedAccount as string);

    handleMaticToGLM({
      signer,
      amountOutMin,
      value,
      to: walletAddress,
    });
  };

  return hasAccounts ? (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Swap</h2>
      <div className="mb-4">
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
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Target <address></address>
        </label>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Value</label>
        <input
          type="text"
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount Out Min</label>
        <input
          type="text"
          onChange={(e) => setAmountOutMin(parseFloat(e.target.value))}
          className="w-full border rounded-md p-2"
        />
      </div>
      <button
        onClick={handleSwap}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Execute Transaction
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
  );
};

export default SwapGLMs;
