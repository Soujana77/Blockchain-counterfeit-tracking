// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Medicine {

    struct Med {
        string id;
        string name;
        string manufacturer;
        bool exists;

        address currentOwner;

        address[] ownershipHistory;
    }

    mapping(string => Med) public medicines;

    // ➕ Add new medicine
    function addMedicine(
        string memory _id,
        string memory _name,
        string memory _manufacturer
    ) public {

        require(
            !medicines[_id].exists,
            "Medicine already exists"
        );

        Med storage newMedicine = medicines[_id];

        newMedicine.id = _id;
        newMedicine.name = _name;
        newMedicine.manufacturer = _manufacturer;
        newMedicine.exists = true;

        // First owner = creator
        newMedicine.currentOwner = msg.sender;

        // Add first ownership record
        newMedicine.ownershipHistory.push(msg.sender);
    }

    // 🔄 Transfer ownership
    function transferOwnership(
        string memory _id,
        address _newOwner
    ) public {

        require(
            medicines[_id].exists,
            "Medicine not found"
        );

        require(
            medicines[_id].currentOwner == msg.sender,
            "Only current owner can transfer"
        );

        medicines[_id].currentOwner = _newOwner;

        medicines[_id].ownershipHistory.push(_newOwner);
    }

    // 🔍 Verify medicine
    function verifyMedicine(
        string memory _id
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            address
        )
    {

        require(
            medicines[_id].exists,
            "Medicine not found"
        );

        Med storage m = medicines[_id];

        return (
            m.id,
            m.name,
            m.manufacturer,
            m.currentOwner
        );
    }

    // 📜 Get ownership history
    function getOwnershipHistory(
        string memory _id
    )
        public
        view
        returns (address[] memory)
    {

        require(
            medicines[_id].exists,
            "Medicine not found"
        );

        return medicines[_id].ownershipHistory;
    }
}