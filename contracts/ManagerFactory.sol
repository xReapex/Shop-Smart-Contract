// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract ManagerFactory {
    address public owner;
    mapping(address => bool) public managers;

    event ManagerAdded(address indexed manager);
    event ManagerRemoved(address indexed manager);

    // Constructeur pour définir le propriétaire initial
    constructor() {
        owner = msg.sender;
    }

    // Modificateur pour restreindre l'accès au propriétaire
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Modificateur pour restreindre l'accès aux managers
    modifier onlyManager() {
        require(managers[msg.sender], "Only manager can call this function");
        _;
    }

    function addManager(address _manager) public onlyOwner {
        require(!managers[_manager], "Already a manager");
        managers[_manager] = true;
        emit ManagerAdded(_manager);
    }

    function removeManager(address _manager) public onlyOwner {
        require(managers[_manager], "Not a manager");
        delete managers[_manager];
        emit ManagerRemoved(_manager);
    }

    function isManager(address _manager) public view returns (bool) {
        return managers[_manager];
    }
}
