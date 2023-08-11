/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export type RouterParametersStruct = {
  permit2: AddressLike;
  weth9: AddressLike;
  seaportV1_5: AddressLike;
  seaportV1_4: AddressLike;
  openseaConduit: AddressLike;
  nftxZap: AddressLike;
  x2y2: AddressLike;
  foundation: AddressLike;
  sudoswap: AddressLike;
  elementMarket: AddressLike;
  nft20Zap: AddressLike;
  cryptopunks: AddressLike;
  looksRareV2: AddressLike;
  routerRewardsDistributor: AddressLike;
  looksRareRewardsDistributor: AddressLike;
  looksRareToken: AddressLike;
  v2Factory: AddressLike;
  v3Factory: AddressLike;
  pairInitCodeHash: BytesLike;
  poolInitCodeHash: BytesLike;
};

export type RouterParametersStructOutput = [
  permit2: string,
  weth9: string,
  seaportV1_5: string,
  seaportV1_4: string,
  openseaConduit: string,
  nftxZap: string,
  x2y2: string,
  foundation: string,
  sudoswap: string,
  elementMarket: string,
  nft20Zap: string,
  cryptopunks: string,
  looksRareV2: string,
  routerRewardsDistributor: string,
  looksRareRewardsDistributor: string,
  looksRareToken: string,
  v2Factory: string,
  v3Factory: string,
  pairInitCodeHash: string,
  poolInitCodeHash: string
] & {
  permit2: string;
  weth9: string;
  seaportV1_5: string;
  seaportV1_4: string;
  openseaConduit: string;
  nftxZap: string;
  x2y2: string;
  foundation: string;
  sudoswap: string;
  elementMarket: string;
  nft20Zap: string;
  cryptopunks: string;
  looksRareV2: string;
  routerRewardsDistributor: string;
  looksRareRewardsDistributor: string;
  looksRareToken: string;
  v2Factory: string;
  v3Factory: string;
  pairInitCodeHash: string;
  poolInitCodeHash: string;
};

export interface AbiInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "collectRewards"
      | "execute(bytes,bytes[])"
      | "execute(bytes,bytes[],uint256)"
      | "onERC1155BatchReceived"
      | "onERC1155Received"
      | "onERC721Received"
      | "supportsInterface"
      | "uniswapV3SwapCallback"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "RewardsSent"): EventFragment;

  encodeFunctionData(
    functionFragment: "collectRewards",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "execute(bytes,bytes[])",
    values: [BytesLike, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "execute(bytes,bytes[],uint256)",
    values: [BytesLike, BytesLike[], BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish[],
      BigNumberish[],
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "uniswapV3SwapCallback",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "collectRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "execute(bytes,bytes[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "execute(bytes,bytes[],uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniswapV3SwapCallback",
    data: BytesLike
  ): Result;
}

export namespace RewardsSentEvent {
  export type InputTuple = [amount: BigNumberish];
  export type OutputTuple = [amount: bigint];
  export interface OutputObject {
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Abi extends BaseContract {
  connect(runner?: ContractRunner | null): Abi;
  waitForDeployment(): Promise<this>;

  interface: AbiInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  collectRewards: TypedContractMethod<
    [looksRareClaim: BytesLike],
    [void],
    "nonpayable"
  >;

  "execute(bytes,bytes[])": TypedContractMethod<
    [commands: BytesLike, inputs: BytesLike[]],
    [void],
    "payable"
  >;

  "execute(bytes,bytes[],uint256)": TypedContractMethod<
    [commands: BytesLike, inputs: BytesLike[], deadline: BigNumberish],
    [void],
    "payable"
  >;

  onERC1155BatchReceived: TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike
    ],
    [string],
    "view"
  >;

  onERC1155Received: TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike
    ],
    [string],
    "view"
  >;

  onERC721Received: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish, arg3: BytesLike],
    [string],
    "view"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  uniswapV3SwapCallback: TypedContractMethod<
    [amount0Delta: BigNumberish, amount1Delta: BigNumberish, data: BytesLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "collectRewards"
  ): TypedContractMethod<[looksRareClaim: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "execute(bytes,bytes[])"
  ): TypedContractMethod<
    [commands: BytesLike, inputs: BytesLike[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "execute(bytes,bytes[],uint256)"
  ): TypedContractMethod<
    [commands: BytesLike, inputs: BytesLike[], deadline: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "onERC1155BatchReceived"
  ): TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "onERC1155Received"
  ): TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "onERC721Received"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish, arg3: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "uniswapV3SwapCallback"
  ): TypedContractMethod<
    [amount0Delta: BigNumberish, amount1Delta: BigNumberish, data: BytesLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "RewardsSent"
  ): TypedContractEvent<
    RewardsSentEvent.InputTuple,
    RewardsSentEvent.OutputTuple,
    RewardsSentEvent.OutputObject
  >;

  filters: {
    "RewardsSent(uint256)": TypedContractEvent<
      RewardsSentEvent.InputTuple,
      RewardsSentEvent.OutputTuple,
      RewardsSentEvent.OutputObject
    >;
    RewardsSent: TypedContractEvent<
      RewardsSentEvent.InputTuple,
      RewardsSentEvent.OutputTuple,
      RewardsSentEvent.OutputObject
    >;
  };
}
