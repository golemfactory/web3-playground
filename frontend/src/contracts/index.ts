export interface IContractDescription {
  name: string;
  address: string;
  abi: any[];
}

import quickSwapRouter from "./quickSwapRouter/contract";

export const contracts: IContractDescription[] = [quickSwapRouter];
