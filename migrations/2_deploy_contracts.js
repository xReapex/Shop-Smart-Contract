const ShopManager = artifacts.require('./ShopManager');
const Shop = artifacts.require('./Shop');

module.exports = function (deployer) {
  deployer.deploy(ShopManager);
  deployer.deploy(Shop);
};