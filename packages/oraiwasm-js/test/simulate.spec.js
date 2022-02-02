import dotenv from 'dotenv';
import assert from 'assert';
import OraiwasmJs from '../src';

dotenv.config();

const cosmos = new OraiwasmJs('https://testnet.lcd.orai.io', 'Oraichain-testnet');
cosmos.setBech32MainPrefix('orai');

describe('simulate', () => {
  it('should return gas estimation correctly', async () => {
    const childKey = cosmos.getChildKey(process.env.SEND_MNEMONIC);
    const contractAddr = "orai1ceelzytg6nuu5ajqaakf8h5mnv0le0qkz9vsk0";

    try {
      const response = await cosmos.execute({ childKey, contractAddr, rawMessages: [Buffer.from(JSON.stringify({ ping: {} }))], gasLimits: 'auto', fees: 0.0025 });
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  });
});
