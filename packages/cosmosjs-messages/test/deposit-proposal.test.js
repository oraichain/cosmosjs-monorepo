import Cosmos from '@oraichain/cosmosjs';
import dotenv from 'dotenv';
import CosmosMessages from '../src';

dotenv.config();

const cosmos = new Cosmos('http://testnet-lcd.orai.io', 'Oraichain-testnet');
cosmos.setBech32MainPrefix('orai');

describe('vote proposal with cosmos-messages correctly', () => {
  it('should vote proposal correctly', async () => {
    const childKey = cosmos.getChildKey(process.env.SEND_MNEMONIC);
    const message = CosmosMessages.getMsgVoteProposal(1, cosmos.getAddress(childKey), 'Yes');
    const txBody = cosmos.constructTxBody({ messages: [message], memo: "foo bar" });

    try {
      const response = await cosmos.submit(childKey, txBody, 'BROADCAST_MODE_BLOCK');
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  });
});
