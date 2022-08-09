import Cosmos from '@oraichain/cosmosjs';
import { cosmos } from '@oraichain/cosmosjs/dist/messages/proto';
export type VoteOption = 'Yes' | 'Abstain' | 'No' | 'No with veto';

declare class CosmosMessages {
  constructor();
  static getMsgSend(from_address: string, to_address: string, amount: cosmos.base.v1beta1.ICoin[]): Cosmos.message.google.protobuf.Any;
  static getMsgMultiSend(sender: string, inputCoins: cosmos.base.v1beta1.ICoin[], outputs: cosmos.bank.v1beta1.IOutput[]): Cosmos.message.google.protobuf.Any;
  static getMsgDelegate(delegator_address: string, validator_address: string, amount: cosmos.base.v1beta1.ICoin): Cosmos.message.google.protobuf.Any;
  static getMsgReDelegate(delegator_address: string, validator_src_address: string, validator_dst_address: string, amount: cosmos.base.v1beta1.ICoin): Cosmos.message.google.protobuf.Any;
  static getMsgUndelegate(delegator_address: string, validator_address: string, amount: cosmos.base.v1beta1.ICoin): Cosmos.message.google.protobuf.Any;
  static getMsgWithdrawDelegatorReward(delegator_address: string, validator_address: string): Cosmos.message.google.protobuf.Any;
  static getMsgWithdrawValidatorCommission(validator_address: string): Cosmos.message.google.protobuf.Any;
  static getMsgExecuteContract(contract: string, msg: string, sender: string, sentFunds: cosmos.base.v1beta1.ICoin[]): Cosmos.message.google.protobuf.Any;
  static getMsgParameterChangeProposal(proposer: string, initial_deposit: cosmos.base.v1beta1.ICoin[], change_info: { title: string, description: string, changes: cosmos.params.v1beta1.IParamChange[] }): Cosmos.message.google.protobuf.Any;
  static getMsgTextProposal(proposer: string, initial_deposit: cosmos.base.v1beta1.ICoin[], change_info: { title: string, description: string }): Cosmos.message.google.protobuf.Any;
  static getMsgDepositProposal(proposal_id: number, depositor: string, amount: cosmos.base.v1beta1.ICoin[]): Cosmos.message.google.protobuf.Any;
  static getMsgVoteProposal(proposal_id: number, voter: string, option: VoteOption): Cosmos.message.google.protobuf.Any;
  static getMsgCreateValidator(description: cosmos.staking.v1beta1.IDescription, commission: cosmos.staking.v1beta1.ICommissionRates, min_self_delegation: string, delegator_address: string, validator_address: string, pubkey: Cosmos.message.google.protobuf.IAny, value: cosmos.base.v1beta1.ICoin): Cosmos.message.google.protobuf.Any;
}

declare namespace CosmosMessages { }

export default CosmosMessages;
