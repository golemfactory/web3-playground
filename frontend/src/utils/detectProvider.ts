import { MetaMaskEthereumProvider } from "../types/ethereum";

const { ethereum } = window;

export function detectEthereumProvider({
  mustBeMetaMask = false,
  silent = false,
  timeout = 3000,
}: {
  mustBeMetaMask?: boolean;
  silent?: boolean;
  timeout?: number;
}): Promise<MetaMaskEthereumProvider | null> {
  let handled = false;

  return new Promise((resolve) => {
    if (ethereum) {
      handleEthereum();
    } else {
      self.addEventListener("ethereum#initialized", handleEthereum, {
        once: true,
      });

      setTimeout(() => {
        handleEthereum();
      }, timeout);
    }

    function handleEthereum() {
      if (handled) {
        return;
      }
      handled = true;

      self.removeEventListener("ethereum#initialized", handleEthereum);

      if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
        resolve(ethereum);
      } else {
        const message =
          mustBeMetaMask && ethereum
            ? "Non-MetaMask window.ethereum detected."
            : "Unable to detect window.ethereum.";

        !silent && console.error("@metamask/detect-provider:", message);
        resolve(null);
      }
    }
  });
}
