const ManagerFactory = artifacts.require("ManagerFactory");

contract("ManagerFactory", function (accounts) {

  let managerFactory;
  const owner = accounts[0];
  const addr1 = accounts[1];
  const addr2 = accounts[2];

  // Create new ManagerFactory
  beforeEach(async () => {
      managerFactory = await ManagerFactory.new();
  });

  it("Should set the right owner", async () => {
    const contractOwner = await managerFactory.owner();
    assert.equal(contractOwner, owner, "Owner is not set correctly");
  });

  it("Should allow owner to add a manager", async () => {
    await managerFactory.addManager(addr1, {from: owner});
    const isManager = await managerFactory.isManager(addr1);
    assert.isTrue(isManager, "Manager was not added");
  });

  it("Should not allow non-owner to add a manager", async () => {
    try {
      await managerFactory.addManager(addr2, {from: addr1})
      assert.fail("Non-owner was able to add a manager");
    } catch (error) {
      assert.include(error.message, "Only owner can call this function")
    }
  });

  it("Should allow owner to remove a manager", async () => {
    await managerFactory.addManager(addr1, {from: owner});
    await managerFactory.removeManager(addr1, {from: owner});
    const isManager = await managerFactory.isManager(addr1);
    assert.isFalse(isManager, "Manager was not removed");
});

  it("Should not allow non-owner to remove a manager", async () => {
    try {
      await managerFactory.removeManager(addr2, {from: addr1});
      assert.fail("Non-owner was able to remove a manager");
    } catch (error) {
      assert.include(error.message, "Only owner can call this function")
    }
  });
  
  it("Should not add the same manager twice", async () => {
    await managerFactory.addManager(addr1, {from: owner});
    try {
      await managerFactory.addManager(addr1, {from: owner});
      assert.fail('Owner was able to add a manager twice')
    } catch (error) {
      assert.include(error.message, "Already a manager")
    }
  });

  it("Should not allow removing a non-existent manager", async () => {
    try {
      await managerFactory.removeManager(addr1, {from: owner});
      assert.fail("Should not remove a non-existent manager");
    } catch (error) {
      assert.include(error.message, "Not a manager");
    }
  });
});
