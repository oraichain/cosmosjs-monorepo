import Cosmos from '@oraichain/cosmosjs';
import dotenv from 'dotenv';
import CosmosMessages from '../src';

dotenv.config();

const cosmos = new Cosmos('http://testnet-lcd.orai.io', 'Oraichain-testnet');
cosmos.setBech32MainPrefix('orai');

describe('send with cosmos-messages correctly', () => {
  it('should send correctly', async () => {
    const childKey = cosmos.getChildKey(process.env.SEND_MNEMONIC);
    const message = CosmosMessages.getMsgSend(cosmos.getAddress(childKey), "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt", [{ denom: cosmos.bech32MainPrefix, amount: "1" }]);
    const txBody = cosmos.constructTxBody({ messages: [message], memo: "foo bar" });

    try {
      const response = await cosmos.submit(childKey, txBody, 'BROADCAST_MODE_BLOCK');
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  });
});
