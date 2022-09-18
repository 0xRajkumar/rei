import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AccessSet } from "../generated/schema"
import { AccessSet as AccessSetEvent } from "../generated/Approver/Approver"
import { handleAccessSet } from "../src/approver"
import { createAccessSetEvent } from "./approver-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _user = Address.fromString("0x0000000000000000000000000000000000000001")
    let _access = "Example string value"
    let _enabled = "boolean Not implemented"
    let newAccessSetEvent = createAccessSetEvent(_user, _access, _enabled)
    handleAccessSet(newAccessSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AccessSet created and stored", () => {
    assert.entityCount("AccessSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AccessSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AccessSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_access",
      "Example string value"
    )
    assert.fieldEquals(
      "AccessSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_enabled",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
