import dotenv from 'dotenv';
import assert from 'assert';
import OraiwasmJs from '../src';

dotenv.config();

const cosmos = new OraiwasmJs('http://3.143.254.222:1317', 'Oraichain-testnet');
cosmos.setBech32MainPrefix('orai');

describe('simulate', () => {
  it('should execute correctly with automatic gas estimation', async () => {
    const childKey = cosmos.getChildKey(process.env.SEND_MNEMONIC);
    const contractAddr = "orai1ceelzytg6nuu5ajqaakf8h5mnv0le0qkz9vsk0";
    const rawInputs = [{
      contractAddr,
      message: Buffer.from(JSON.stringify({ ping: {} })),
    }]

    // try {
    //   const response = await cosmos.execute({ childKey, rawInputs, gasLimits: 'auto', fees: 0.0025 });
    //   console.log(response);
    // } catch (ex) {
    //   console.log(ex);
    // }
  });
});
