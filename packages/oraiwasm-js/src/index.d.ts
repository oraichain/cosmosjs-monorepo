import { Coin, OfflineDirectSigner } from '@cosmjs/proto-signing';
import Cosmos from '@oraichain/cosmosjs';
import * as bip32 from 'bip32';
export type BroadCastMode = 'BROADCAST_MODE_UNSPECIFIED' | 'BROADCAST_MODE_BLOCK' | 'BROADCAST_MODE_SYNC' | 'BROADCAST_MODE_ASYNC';
export type RawInput = {
  contractAddr: string,
  message: Buffer,
  sentFunds?: Coin[],
}
declare class OraiwasmJs extends Cosmos {
  constructor(url: string, chainId: string);
  execute(params: { signerOrChild: bip32.BIP32Interface | OfflineDirectSigner, rawInputs: RawInput[], fees?: number | Coin[], gasLimits?: number | string, memo?: string | undefined, gasMultiplier?: number, timeoutHeight?: number, timeoutIntervalCheck?: number, broadcastMode?: BroadCastMode }): Promise<any>;
  getHandleMessage(contract: string, msg: any, sender: string, sentFunds: Coin[]): Cosmos.message.google.protobuf.Any;
  getHandleMessageSimulate(contract: string, msg: any, sender: string, sentFunds: Coin[]): Cosmos.message.google.protobuf.Any;
}

declare namespace OraiwasmJs { }

export default OraiwasmJs;
