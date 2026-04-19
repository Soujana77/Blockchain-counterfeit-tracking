// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Medicine {

    struct Med {
        string id;
        string name;
        address currentOwner;
        bool exists;
    }

    mapping(string => Med) public medicines;

    // Add new medicine
    function addMedicine(string memory _id, string memory _name) public {
        require(!medicines[_id].exists, "Medicine already exists");

        medicines[_id] = Med({
            id: _id,
            name: _name,
            currentOwner: msg.sender,
            exists: true
        });
    }

    // Transfer ownership
    function transferOwnership(string memory _id, address _newOwner) public {
        require(medicines[_id].exists, "Medicine not found");
        require(medicines[_id].currentOwner == msg.sender, "Not owner");

        medicines[_id].currentOwner = _newOwner;
    }

    // Verify medicine
    function verifyMedicine(string memory _id) public view returns (string memory, string memory, address) {
        require(medicines[_id].exists, "Medicine not found");

        Med memory m = medicines[_id];
        return (m.id, m.name, m.currentOwner);
    }
}