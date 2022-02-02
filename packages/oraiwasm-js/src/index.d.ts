import Cosmos from '@oraichain/cosmosjs';
export type BroadCastMode = 'BROADCAST_MODE_UNSPECIFIED' | 'BROADCAST_MODE_BLOCK' | 'BROADCAST_MODE_SYNC' | 'BROADCAST_MODE_ASYNC';
declare class OraiwasmJs extends Cosmos {
  constructor(url: any, chainId: any);
  execute(params: { childKey: any, contractAddr: string, rawMessages: any[], fees?: number | any[], gasLimits?: number | string, gasMultiplier?: number, timeoutHeight?: number, timeoutIntervalCheck?: number, sentFunds?: any[], broadcastMode?: string }): Promise<any>;
}

declare namespace OraiwasmJs { }

export default OraiwasmJs;
