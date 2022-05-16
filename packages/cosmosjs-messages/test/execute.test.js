import Cosmos from '@oraichain/cosmosjs';
import dotenv from 'dotenv';
import CosmosMessages from '../src';

dotenv.config();

const cosmos = new Cosmos('http://18.223.242.70:1317', 'Oraichain');
cosmos.setBech32MainPrefix('orai');

describe('execute', () => {
  it('should execute correctly with automatic gas estimation', async () => {
    const childKey = cosmos.getChildKey(process.env.SEND_MNEMONIC);
    const contractAddr = "orai1w8wzrypwduu9th3kkljxe24k3vv82yzr6xyed8";
    const rawInputs = [{
      contractAddr,
      message: Buffer.from(JSON.stringify({ ping: {} })),
    }]
    const block = await cosmos.get('/blocks/latest');
    const timeoutHeight = parseInt(block.block.header.height) + 100;

    const msgExecute = CosmosMessages.getMsgExecuteContract(contractAddr, JSON.stringify({ ping: {} }), cosmos.getAddress(childKey));

    const txBody = cosmos.constructTxBody({ messages: [msgExecute], timeout_height: timeoutHeight });

    try {
      const response = await cosmos.submit(childKey, txBody, 'BROADCAST_MODE_BLOCK');
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  });
});
