import Cosmos from '@oraichain/cosmosjs';
import Long from 'long';

class CosmosMessages {

  static getMsgSend = (from_address, to_address, amount) => {
    const msgSend = new Cosmos.message.cosmos.bank.v1beta1.MsgSend({
      from_address,
      to_address,
      amount,
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.bank.v1beta1.MsgSend",
      value: Cosmos.message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish(),
    });
  };

  static getMsgMultiSend = (sender, inputCoins, outputs) => {
    const msgSend = new Cosmos.message.cosmos.bank.v1beta1.MsgMultiSend({
      inputs: [
        {
          address: sender,
          coins: inputCoins,
        },
      ],
      outputs,
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.bank.v1beta1.MsgMultiSend",
      value: Cosmos.message.cosmos.bank.v1beta1.MsgMultiSend.encode(msgSend).finish(),
    });
  };

  static getMsgDelegate = (delegator_address, validator_address, amount) => {
    const msgSend = new Cosmos.message.cosmos.staking.v1beta1.MsgDelegate({
      delegator_address,
      validator_address,
      amount
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.staking.v1beta1.MsgDelegate",
      value: Cosmos.message.cosmos.staking.v1beta1.MsgDelegate.encode(msgSend).finish(),
    });
  };

  static getMsgReDelegate = (delegator_address, validator_src_address, validator_dst_address, amount) => {
    const msgSend = new Cosmos.message.cosmos.staking.v1beta1.MsgBeginRedelegate({
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
      value: Cosmos.message.cosmos.staking.v1beta1.MsgBeginRedelegate.encode(msgSend).finish(),
    });

  };

  static getMsgUndelegate = (delegator_address, validator_address, amount) => {
    const msgSend = new Cosmos.message.cosmos.staking.v1beta1.MsgUndelegate({
      delegator_address,
      validator_address,
      amount
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.staking.v1beta1.MsgUndelegate",
      value: Cosmos.message.cosmos.staking.v1beta1.MsgUndelegate.encode(msgSend).finish(),
    });

  };

  static getMsgWithdrawDelegatorReward = (delegator_address, validator_address) => {
    const msgSend = new Cosmos.message.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward({
      delegator_address,
      validator_address,
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: Cosmos.message.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.encode(msgSend).finish(),
    });
  };

  static getMsgWithdrawValidatorCommission = (validator_address) => {
    const msgSend = new Cosmos.message.cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission({ validator_address });

    return new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
      value: Cosmos.message.cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission.encode(msgSend).finish(),
    });
  };

  static getMsgExecuteContract = (contract, msg, sender, sent_funds) => {
    const msgSend = new Cosmos.message.cosmwasm.wasm.v1beta1.MsgExecuteContract({
      contract,
      msg: Buffer.from(msg), // has to use buffer here because the browser shall not send buffer as string through object json
      sender,
      sent_funds,
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: '/cosmwasm.wasm.v1beta1.MsgExecuteContract',
      value: Cosmos.message.cosmwasm.wasm.v1beta1.MsgExecuteContract.encode(msgSend).finish(),
    });
  };

  static getMsgCreateValidator = (description, commission, delegator_address, min_self_delegation, pubkey, validator_address, value) => {
    const msgCreateValidator = new Cosmos.message.cosmos.staking.v1beta1.MsgCreateValidator({
      description,
      commission,
      delegator_address,
      min_self_delegation,
      pubkey,
      validator_address,
      value,
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: '/cosmos.staking.v1beta1.MsgCreateValidator',
      value: Cosmos.message.cosmos.staking.v1beta1.MsgCreateValidator.encode(msgCreateValidator).finish(),
    });
  };

  static getMsgParameterChangeProposal = (proposer, initial_deposit, { title, description, changes }) => {
    const msgChangeProposal = new Cosmos.message.cosmos.params.v1beta1.ParameterChangeProposal({ title, description, changes });

    const msgChangeProposalAny = new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.params.v1beta1.ParameterChangeProposal",
      value: Cosmos.message.cosmos.params.v1beta1.ParameterChangeProposal.encode(msgChangeProposal).finish(),
    });

    const msgGov = new Cosmos.message.cosmos.gov.v1beta1.MsgSubmitProposal({
      content: msgChangeProposalAny,
      proposer: proposer,
      initial_deposit,
    });

    return new Cosmos.message.google.protobuf.Any({
      type_url: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: Cosmos.message.cosmos.gov.v1beta1.MsgSubmitProposal.encode(msgGov).finish(),
    });
  };

  static getMsgDepositProposal = (proposal_id, depositor, amount) => {
    const msgDeposit = new Cosmos.message.cosmos.gov.v1beta1.MsgDeposit({ proposal_id: new Long(proposal_id), depositor, amount })

    return new Cosmos.message.google.protobuf.Any({
      type_url: '/cosmos.gov.v1beta1.MsgDeposit',
      value: Cosmos.message.cosmos.gov.v1beta1.MsgDeposit.encode(msgDeposit).finish()
    });

  };

  static getMsgVoteProposal = (proposal_id, voter, option) => {
    const checkVoteOption = (option) => {
      switch (option) {
        case "Yes":
          return Cosmos.message.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_YES
        case "Abstain":
          return Cosmos.message.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_ABSTAIN
        case "No":
          return Cosmos.message.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO
        case "No with veto":
          return Cosmos.message.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO_WITH_VETO
        default:
          return Cosmos.message.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_YES
      }
    }

    const msgVote = new Cosmos.message.cosmos.gov.v1beta1.MsgVote({
      proposal_id: new Long(proposal_id),
      voter: voter,
      option: checkVoteOption(option)
    })

    return new Cosmos.message.google.protobuf.Any({
      type_url: '/cosmos.gov.v1beta1.MsgVote',
      value: Cosmos.message.cosmos.gov.v1beta1.MsgVote.encode(msgVote).finish()
    });
  };

}

export default CosmosMessages;