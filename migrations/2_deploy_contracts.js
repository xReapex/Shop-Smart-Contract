const ShopManager = artifacts.require('./ShopManager');
const Manager = artifacts.require('./Manager');

module.exports = function (deployer) {
  deployer
    .deploy(Manager)
    .deploy(ShopManager);
};