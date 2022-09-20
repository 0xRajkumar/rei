import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Fractionalised } from "../generated/schema"
import { Fractionalised as FractionalisedEvent } from "../generated/Fractionaliser/Fractionaliser"
import { handleFractionalised } from "../src/fractionaliser"
import { createFractionalisedEvent } from "./fractionaliser-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let fractionalisedId = BigInt.fromI32(234)
    let fractionaliser = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let fractionalisedNftAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let fractionQuantity = BigInt.fromI32(234)
    let tokenId = BigInt.fromI32(234)
    let NFTContractAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newFractionalisedEvent = createFractionalisedEvent(
      fractionalisedId,
      fractionaliser,
      fractionalisedNftAddress,
      fractionQuantity,
      tokenId,
      NFTContractAddress
    )
    handleFractionalised(newFractionalisedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Fractionalised created and stored", () => {
    assert.entityCount("Fractionalised", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Fractionalised",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fractionalisedId",
      "234"
    )
    assert.fieldEquals(
      "Fractionalised",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fractionaliser",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Fractionalised",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fractionalisedNftAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Fractionalised",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fractionQuantity",
      "234"
    )
    assert.fieldEquals(
      "Fractionalised",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "Fractionalised",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "NFTContractAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
