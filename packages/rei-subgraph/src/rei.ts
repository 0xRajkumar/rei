import {
  Transfer as TransferEvent,
  REI as REIContract,
} from '../generated/REI/REI';
import { Token, TokenUser } from '../generated/schema';

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString());
  if (!token) {
    token = new Token(event.params.tokenId.toString());
    token.tokenID = event.params.tokenId;
    let tokenContract = REIContract.bind(event.address);
    token.tokenURI = tokenContract.tokenURI(event.params.tokenId);
  }

  token.owner = event.params.to.toHexString();
  token.save();

  let user = TokenUser.load(event.params.to.toHexString());
  if (!user) {
    user = new TokenUser(event.params.to.toHexString());
    user.save();
  }
}
