import { ethers, toBeHex } from "ethers";
import {
  // ethers,
  AbiCoder,
  keccak256,
  recoverAddress,
  toUtf8Bytes,
} from "ethers";

const META_TRANSACTION_TYPEHASH = keccak256(
  toUtf8Bytes(
    "MetaTransaction(uint256 nonce,address from,bytes functionSignature)"
  )
);

// const MAGIC: Uint8Array = Uint8Array.from([0x19, 0x01]);

const EIP712_DOMAIN_TYPEHASH = keccak256(
  toUtf8Bytes(
    "EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)"
  )
);

let domainSeparator = "";

function setDomainSeparator(name: string, version: string) {
  const domainData = AbiCoder.defaultAbiCoder().encode(
    ["bytes32", "bytes32", "bytes32", "address", "bytes32"],
    [
      EIP712_DOMAIN_TYPEHASH,
      keccak256(toUtf8Bytes(name)),
      keccak256(toUtf8Bytes(version)),
      "0xe141e7b83a0ae8da88f89c3b8c2ac7a06439e0da", // Replace with the actual contract address if needed
      ethers.zeroPadValue(toBeHex(137), 32),
    ]
  );
  domainSeparator = keccak256(domainData);
}

setDomainSeparator("Golem", "1");

function toTypedMessageHash(messageHash: string) {
  const prefix = "\x19\x01";
  const encodedData = ethers.solidityPacked(
    ["string", "bytes32", "bytes32"],
    [prefix, domainSeparator, messageHash]
  );
  return keccak256(encodedData);
}
function hashMetaTransaction(metaTx: {
  nonce: any;
  from: any;
  functionSignature: any;
}) {
  const hashFunctionSignature = keccak256(
    toUtf8Bytes(metaTx.functionSignature)
  );
  // Encode the MetaTransaction struct fields
  const encodedMetaTx = AbiCoder.defaultAbiCoder().encode(
    ["bytes32", "uint256", "address", "bytes32"],
    [
      META_TRANSACTION_TYPEHASH,
      metaTx.nonce,
      metaTx.from,
      hashFunctionSignature,
    ]
  );

  return keccak256(encodedMetaTx);
}

export function verify(
  signer: string,
  metaTx: { nonce: any; from: any; functionSignature: any },
  sigR: any,
  sigS: any,
  sigV: any
) {
  // console.log("..........");
  // console.log("r", sigR);
  // console.log("s", sigS);
  // console.log("v", sigV);
  // console.log("..........");
  // console.log("vvv", toTypedMessageHash(hashMetaTransaction(metaTx)));
  // console.log("..........");
  const recoveredAddress = recoverAddress(
    toTypedMessageHash(hashMetaTransaction(metaTx)),
    {
      r: sigR,
      s: sigS,
      v: sigV,
    }
  );
  return recoveredAddress;
}

// const { ethers } = require("ethers");

// const META_TRANSACTION_TYPEHASH = "<YOUR_META_TRANSACTION_TYPEHASH>"; // Replace this with the actual value

// function hashMetaTransaction(metaTx) {
//   const hashFunctionSignature = ethers.utils.keccak256(
//     ethers.utils.toUtf8Bytes(metaTx.functionSignature)
//   );

//   const encodedMetaTransaction = ethers.utils.defaultAbiCoder.encode(
//     ["bytes32", "uint256", "address", "bytes32"],
//     [
//       META_TRANSACTION_TYPEHASH,
//       metaTx.nonce,
//       metaTx.from,
//       hashFunctionSignature,
//     ]
//   );

//   const metaTransactionHash = ethers.utils.keccak256(encodedMetaTransaction);
//   return metaTransactionHash;
// }
