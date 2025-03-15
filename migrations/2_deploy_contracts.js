const ManagerFactory = artifacts.require('./ManagerFactory');
const Shop = artifacts.require('./Shop');

module.exports = function (deployer) {
  deployer.deploy(ManagerFactory);
  deployer.deploy(Shop);
};