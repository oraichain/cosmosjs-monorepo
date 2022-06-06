import Cosmos from '@oraichain/cosmosjs';
import dotenv from 'dotenv';
import CosmosMessages from '../src';

dotenv.config();

const cosmos = new Cosmos('http://testnet-lcd.orai.io', 'Oraichain-testnet');
cosmos.setBech32MainPrefix('orai');

describe('multisend with cosmos-messages correctly', () => {
  it('should multisend correctly', async () => {
    const childKey = cosmos.getChildKey(process.env.SEND_MNEMONIC);
    const message = CosmosMessages.getMsgMultiSend(cosmos.getAddress(childKey), [{ denom: cosmos.bech32MainPrefix, amount: "2" }], [{ address: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt", coins: [{ denom: "orai", amount: "1" }] }, { address: "orai14n3tx8s5ftzhlxvq0w5962v60vd82h30rha573", coins: [{ denom: "orai", amount: "1" }] }]);
    const txBody = cosmos.constructTxBody({ messages: [message] });

    try {
      const response = await cosmos.submit(childKey, txBody, 'BROADCAST_MODE_BLOCK');
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  });
});
