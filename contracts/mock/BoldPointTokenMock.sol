// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "../BoldPointToken.sol";

// mock class using ERC20
contract BoldPointTokenMock is BoldPointToken{

    constructor() BoldPointToken() {}

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function transferInternal(address from, address to, uint256 value) public {
        _transfer(from, to, value);
    }

    function approveInternal(address owner, address spender, uint256 value) public {
        _approve(owner, spender, value);
    }
}
