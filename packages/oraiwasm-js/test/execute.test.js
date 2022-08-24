import dotenv from 'dotenv';
import assert from 'assert';
import OraiwasmJs from '../src';

dotenv.config();

const cosmos = new OraiwasmJs('http://18.223.242.70:1317', 'Oraichain', 'orai');

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

    try {
      const response = await cosmos.execute({ signerOrChild: childKey, rawInputs, gasLimits: 'auto', fees: 0, timeoutHeight: timeoutHeight, timeoutIntervalCheck: 5000 });
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  });
});
