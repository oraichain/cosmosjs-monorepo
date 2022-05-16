import Cosmos from '@oraichain/cosmosjs';
import dotenv from 'dotenv';
import CosmosMessages from '../src';

dotenv.config();

const cosmos = new Cosmos('http://testnet-lcd.orai.io', 'Oraichain-testnet');
cosmos.setBech32MainPrefix('orai');

describe('change param proposal with cosmos-messages correctly', () => {
  it('should change param proposal correctly', async () => {
    const childKey = cosmos.getChildKey(process.env.SEND_MNEMONIC);
    const message = CosmosMessages.getMsgParameterChangeProposal(cosmos.getAddress(childKey), [{ denom: "orai", amount: "1" }], { title: "foo", description: "bar", changes: [{ subspace: "foo", key: "bar", value: "hello world" }] });
    const txBody = cosmos.constructTxBody({ messages: [message], memo: "foo bar" });

    try {
      const response = await cosmos.submit(childKey, txBody, 'BROADCAST_MODE_BLOCK');
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  });
});
