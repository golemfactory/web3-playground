import { ethers, parseUnits, BigNumberish } from "ethers";
import days from "dayjs";
import quickSwapRouterContract from "../contracts/quickSwapRouter/contract";
import { Abi__factory } from "../types/ethers-contracts/factories/quickSwapRouter/Abi__factory";

export const handleSwap = async (
  signer: ethers.Signer,
  amountOutMin: number,
  path: string[],
  to: string,
  deadline: number,
  value: BigNumberish
): Promise<ethers.ContractTransactionResponse> => {
  const tokenContract = Abi__factory.connect(
    quickSwapRouterContract.address,
    signer
  );

  return await tokenContract.swapExactETHForTokens(
    amountOutMin,
    path,
    to,
    deadline,
    { value }
  );
};

export const handleMaticToGLM = async ({
  signer,
  amountOutMin,
  value,
  to,
}: {
  signer: ethers.Signer;
  amountOutMin: number;
  value: number;
  to: string;
}): Promise<ethers.ContractTransactionResponse> => {
  const path = [
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    "0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf",
  ];
  const deadline = days().add(1, "minute").unix();
  const v = parseUnits(value.toString(), 18);

  const swap = await handleSwap(signer, amountOutMin, path, to, deadline, v);

  return swap;
};
