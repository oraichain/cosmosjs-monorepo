import dotenv from 'dotenv';
import assert from 'assert';
import OraiwasmJs from '../src';

dotenv.config();

const cosmos = new OraiwasmJs('http://3.143.254.222:1317', 'Oraichain-testnet');
cosmos.setBech32MainPrefix('orai');

describe('simulate', () => {
  it('should return gas estimation correctly', async () => {
    const childKey = cosmos.getChildKey(process.env.SEND_MNEMONIC);
    const contractAddr = "orai1ceelzytg6nuu5ajqaakf8h5mnv0le0qkz9vsk0";
    const rawInput = {
      contractAddr,
      message: Buffer.from(JSON.stringify({ ping: {} })),
    }

    let simulateMsgs = [];
    simulateMsgs.push(cosmos.getHandleMessageSimulate(rawInput.contractAddr, rawInput.message, cosmos.getAddress(childKey), null));

    try {
      const response = await cosmos.simulate(childKey.publicKey, cosmos.getTxBody(simulateMsgs, undefined, undefined));
      console.log("simulate response: ", response);
    } catch (ex) {
      console.log(ex);
    }
  });
});
