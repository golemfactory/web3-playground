import { ethers, verifyTypedData } from "ethers";
import { verify } from "./validate";

export const withEthers = async ({
  signer,
  selectedAccount,
  domain,
  types,
  message,
}: {
  signer: any;
  selectedAccount: any;
  domain: any;
  types: any;
  message: any;
}) => {
  const signature = await signer.signTypedData(domain, types, message);
  // console.log("signature", signature);
  const signerAddress = verifyTypedData(domain, types, message, signature);
  console.log("verification", signerAddress, selectedAccount);
};

export const withOwnVerification = async ({
  signer,
  selectedAccount,
  domain,
  types,
  message,
}: {
  signer: any;
  selectedAccount: any;
  domain: any;
  types: any;
  message: any;
}) => {
  const signature = await signer.signTypedData(domain, types, message);
  // console.log("signature", signature);
  const { r, s, v } = ethers.Signature.from(signature);
  console.log(verify(selectedAccount, message, r, s, v));
};

export const withContractVerification = async ({
  signer,
  selectedAccount,
  domain,
  types,
  message,
  tokenContract,
}: {
  signer: any;
  selectedAccount: any;
  domain: any;
  types: any;
  message: any;
  tokenContract: any;
}) => {
  const signature = await signer.signTypedData(domain, types, message);
  // console.log("signature", signature);
  const { r, s, v } = ethers.Signature.from(signature);
  tokenContract.executeMetaTransaction(
    selectedAccount,
    message.functionSignature,
    r,
    s,
    v
  );
};

export const withAll = async ({
  signer,
  selectedAccount,
  domain,
  types,
  message,
  tokenContract,
}: {
  signer: any;
  selectedAccount: any;
  domain: any;
  types: any;
  message: any;
  tokenContract: any;
}) => {
  const signature = await signer.signTypedData(domain, types, message);
  console.log("signature", signature);
  const signerAddressEthers = verifyTypedData(
    domain,
    types,
    message,
    signature
  );
  console.log("**************");
  console.log("verification ethers.js", signerAddressEthers, selectedAccount);
  console.log("**************");

  const { r, s, v } = ethers.Signature.from(signature);
  const ownVerification = verify(selectedAccount, message, r, s, v);

  console.log("**************");
  console.log("verification own", ownVerification, selectedAccount);
  console.log("**************");

  console.log("r", r);
  console.log("s", s);
  console.log("v", v);
  tokenContract.executeMetaTransaction(
    selectedAccount,
    message.functionSignature,
    r,
    s,
    v
  );
};
