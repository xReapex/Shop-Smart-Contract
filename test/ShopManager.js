const ShopManager = artifacts.require("ShopManager");

contract("ShopManager", function (accounts) {

  let manager;
  const owner = accounts[0];
  const addr1 = accounts[1];
  const addr2 = accounts[2];

  // Create new ShopManager
  beforeEach(async () => {
      manager = await ShopManager.new();
  });

  it("Should set the right owner", async () => {
    const contractOwner = await manager.owner();
    assert.equal(contractOwner, owner, "Owner is not set correctly");
  });

  it("Should allow owner to add a manager", async () => {
    await manager.addManager(addr1, {from: owner});
    const isManager = await manager.isManager(addr1);
    assert.isTrue(isManager, "Manager was not added");
  });

  it("Should not allow non-owner to add a manager", async () => {
    try {
      await manager.addManager(addr2, {from: addr1})
      assert.fail("Non-owner was able to add a manager");
    } catch (error) {
      assert.include(error.message, "Only owner can call this function")
    }
  })

  // Should allow owner to remove a manager
  // Should not allow non-owner to remove a manager
  // Should not add the same manager twice
  // Should not remove a non-existing manager

});
