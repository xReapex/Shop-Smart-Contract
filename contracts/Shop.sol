// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./ShopManager.sol";

contract Shop is ShopManager {

    event ProductAdded(uint id, string name, uint price, uint quantity);

    struct Product {
        uint id;
        string name;
        uint price;
        uint quantity;
    }

    mapping(uint => Product) public products; 


}
