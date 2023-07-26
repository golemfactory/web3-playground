interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export interface MetaMaskEthereumProvider {
  isConnected: () => boolean;
  isMetaMask: boolean;
  request: <T>(args: RequestArguments) => Promise<T>;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  removeAllListeners(event?: string | symbol): this;
}
