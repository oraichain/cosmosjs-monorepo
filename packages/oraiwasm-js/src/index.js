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
    // when broadcasting the transaction, the msg is a buffer, but when simulating, we need an object type => from message buffer to json string then parse to object.
    return { "@type": '/cosmwasm.wasm.v1beta1.MsgExecuteContract', contract, msg: JSON.parse(msg.toString()), sender, sent_funds: sentFunds ? sentFunds : null };
  };

  getTxBody(messages, timeout_height, memo) {
    return new this.message.cosmos.tx.v1beta1.TxBody({
      messages,
      timeout_height,
      memo
    });
  }

  async handleMeasureGas(gasLimits, rawInputs, sender, publicKey, gasMultiplier) {
    let finalGas = gasLimits;
    if (finalGas === 'auto') {
      let simulateMsgs = [];
      rawInputs.map(input => simulateMsgs.push(this.getHandleMessageSimulate(input.contractAddr, input.message, sender, input.sentFunds)))
      let txBody = this.getTxBody(simulateMsgs);
      try {
        let result = await this.simulate(publicKey, txBody);
        // if simulate returns ok => set new gas limit to gas used
        if (result && result.gas_info && result.gas_info.gas_used) finalGas = Math.round(parseInt(result.gas_info.gas_used) * gasMultiplier);
        else {
          let resultStr = (result === 'string' || result instanceof String) ? result : JSON.stringify(result);
          // error case, should throw error because if forcing a specific gas limit, the tx could fail because not enough gas before getting the true error
          throw { status: 500, message: result.message ? result.message : resultStr }
        }
      } catch (error) {
        throw error;
      }
    }
    return finalGas;
  }

  async execute({ signerOrChild, rawInputs, fees, gasLimits, memo = undefined, gasMultiplier = 1.3, timeoutHeight, timeoutIntervalCheck, broadcastMode = 'BROADCAST_MODE_SYNC' }) {
    const { address, pubkey } = await this.walletFactory(signerOrChild);
    let msgs = [];
    rawInputs.map(input => msgs.push(this.getHandleMessage(input.contractAddr, input.message, address, input.sentFunds)))
    // if gas limit is auto, then we simulate to collect real gas limits
    const finalGas = await this.handleMeasureGas(gasLimits, rawInputs, address, pubkey, gasMultiplier);
    let txBody = this.getTxBody(msgs, timeoutHeight, memo);
    return this.submit(signerOrChild, txBody, broadcastMode, fees, finalGas, gasMultiplier, timeoutHeight, timeoutIntervalCheck);
  }

}

export default OraiwasmJs;