import Cosmos from '@oraichain/cosmosjs';
export type BroadCastMode = 'BROADCAST_MODE_UNSPECIFIED' | 'BROADCAST_MODE_BLOCK' | 'BROADCAST_MODE_SYNC' | 'BROADCAST_MODE_ASYNC';
export type RawInput = {
  contractAddr: string,
  message: Buffer,
  sentFunds?: any[],
}
declare class OraiwasmJs extends Cosmos {
  constructor(url: any, chainId: any);
  execute(params: { childKey: any, rawInputs: RawInput[], fees?: number | any[], gasLimits?: number | string, memo?: string | undefined, gasMultiplier?: number, timeoutHeight?: number, timeoutIntervalCheck?: number, broadcastMode?: string }): Promise<any>;
  getTxBody(messages: any[], timeout_height: number | undefined, memo: string | undefined): any;
  getHandleMessage(contract: string, msg: any, sender: string, sentFunds: any[]): any;
  getHandleMessageSimulate(contract: string, msg: any, sender: string, sentFunds: any[]): any;
}

declare namespace OraiwasmJs { }

export default OraiwasmJs;
