import { Fractionalised as FractionalisedEvent } from "../generated/Fractionaliser/Fractionaliser";
import { Fractionalised, UserFractionalised } from "../generated/schema";
// const {
//   image,
//   tokenId,
//   description,
//   attributes: { SurfaceArea, GPSCoordinates, City, Country },
// } = data;
import {
  Transfer as TransferEvent,
  REI as REIContract,
} from "../generated/REI/REI";
export function handleFractionalised(event: FractionalisedEvent): void {
  let fractionalised = new Fractionalised(
    event.params.fractionalisedId.toString()
  );
  fractionalised.fractionalisedId = event.params.fractionalisedId;
  fractionalised.NFTContractAddress = event.params.NFTContractAddress;
  fractionalised.fractionalisedNftAddress =
    event.params.fractionalisedNftAddress;
  fractionalised.fractionQuantity = event.params.fractionQuantity;
  fractionalised.tokenId = event.params.tokenId;
  fractionalised.fractionaliser = event.params.fractionaliser.toHexString();
  let tokenContract = REIContract.bind(event.params.NFTContractAddress);
  fractionalised.tokenURI = tokenContract.tokenURI(event.params.tokenId);
  fractionalised.save();
  const userFractionalised = new UserFractionalised(
    event.params.fractionaliser.toHexString()
  );
  userFractionalised.save();
}
