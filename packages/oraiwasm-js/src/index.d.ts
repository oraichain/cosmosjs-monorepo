import Cosmos from '@oraichain/cosmosjs';
export type BroadCastMode = 'BROADCAST_MODE_UNSPECIFIED' | 'BROADCAST_MODE_BLOCK' | 'BROADCAST_MODE_SYNC' | 'BROADCAST_MODE_ASYNC';
export type RawInput = {
  contractAddr: string,
  message: Buffer,
}
declare class OraiwasmJs extends Cosmos {
  constructor(url: any, chainId: any);
  execute(params: { childKey: any, rawInputs: RawInput[], fees?: number | any[], gasLimits?: number | string, gasMultiplier?: number, timeoutHeight?: number, timeoutIntervalCheck?: number, sentFunds?: any[], broadcastMode?: string }): Promise<any>;
}

declare namespace OraiwasmJs { }

export default OraiwasmJs;
