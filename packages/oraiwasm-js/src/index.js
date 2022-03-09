import Cosmos from '@oraichain/cosmosjs';

class OraiwasmJs extends Cosmos {
  constructor(url, chainId) {
    super(url, chainId);
    this.message = Cosmos.message;
  }

  getHandleMessage(contract, msg, sender, sentFunds) {
    const { message } = this;
    const sent_funds = sentFunds ? sentFunds : null;
    const msgExecute = new message.cosmwasm.wasm.v1beta1.MsgExecuteContract({
      contract,
      msg,
      sender,
      sent_funds
    });

    return new message.google.protobuf.Any({
      type_url: '/cosmwasm.wasm.v1beta1.MsgExecuteContract',
      value: message.cosmwasm.wasm.v1beta1.MsgExecuteContract.encode(msgExecute).finish()
    });
  };

  getHandleMessageSimulate(contract, msg, sender, sentFunds) {
    // because when broadcasting the transaction, the msg is a buffer, but when simulating, we need an object type.
    msg = JSON.parse(msg.toString());
    const sent_funds = sentFunds ? sentFunds : null;
    const msgExecute = new this.message.cosmwasm.wasm.v1beta1.MsgExecuteContract({
      contract,
      msg,
      sender,
      sent_funds
    });
    const msgAny = {
      "@type": '/cosmwasm.wasm.v1beta1.MsgExecuteContract',
    }
    return { ...msgAny, ...msgExecute };
  };

  getTxBody(messages, timeout_height, memo) {
    return new this.message.cosmos.tx.v1beta1.TxBody({
      messages,
      timeout_height,
      memo
    });
  }

  async execute({ childKey, rawInputs, fees, gasLimits, memo = undefined, gasMultiplier = 1.3, timeoutHeight, timeoutIntervalCheck, broadcastMode = 'BROADCAST_MODE_SYNC' }) {
    const address = this.getAddress(childKey);
    let msgs = [];
    for (let input of rawInputs) {
      msgs.push(this.getHandleMessage(input.contractAddr, input.message, address, input.sentFunds));
    }
    // if gas limit is auto, then we simulate to collect real gas limits
    if (gasLimits === 'auto') {
      let simulateMsgs = [];
      for (let input of rawInputs) {
        simulateMsgs.push(this.getHandleMessageSimulate(input.contractAddr, input.message, address, input.sentFunds));
      }
      let txBody = this.getTxBody(simulateMsgs, timeoutHeight, memo);
      try {
        let result = await this.simulate(childKey.publicKey, txBody);
        // if simulate returns ok => set new gas limit to gas used
        if (result && result.gas_info && result.gas_info.gas_used) gasLimits = Math.round(parseInt(result.gas_info.gas_used) * gasMultiplier);
        else {
          let resultStr = (result === 'string' || result instanceof String) ? result : JSON.stringify(result);
          // error case, should throw error because if forcing a specific gas limit, the tx could fail because not enough gas before getting the true error
          throw { status: 500, message: result.message ? result.message : resultStr }
        }
      } catch (error) {
        throw error;
      }
    }
    let txBody = this.getTxBody(msgs, timeoutHeight, memo);
    return this.submit(childKey, txBody, broadcastMode, fees, gasLimits, timeoutHeight, timeoutIntervalCheck);
  }
}

export default OraiwasmJs;