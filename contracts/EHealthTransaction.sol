// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract EHealthTransaction {
    struct Demand {
        string hospitalName;
        string patientName;
        string dateofbirth;
        string age;
        string pharmacyUsername;
        string pathologyLabUsername;
        string prescribedMedicines;
        string labTests;
        bool isPharmacyApproved;
        bool isLabApproved;
        string pharmacyReportHash;
        string pathologyReportHash;
        bool exists; // Flag to check if demand exists
    }

    mapping(uint => Demand) public demands;
    uint public demandCount;

    event DemandCreated(uint demandId, string hospitalName, string patientName);
    event PharmacyApproved(uint demandId, string pharmacyReportHash);
    event LabApproved(uint demandId, string pathologyReportHash);
    event DemandDeleted(uint demandId);

    function createDemand(
        string memory _hospitalName,
        string memory _patientName,
        string memory _dateofbirth,
        string memory _age,
        string memory _pharmacyUsername,
        string memory _pathologyLabUsername,
        string memory _prescribedMedicines,
        string memory _labTests
    ) public {
        demandCount++;
        demands[demandCount] = Demand(
            _hospitalName,
            _patientName,
            _dateofbirth,
            _age,
            _pharmacyUsername,
            _pathologyLabUsername,
            _prescribedMedicines,
            _labTests,
            false,
            false,
            "",
            "",
            true // Set demand as existing
        );
        emit DemandCreated(demandCount, _hospitalName, _patientName);
    }

    function approvePharmacy(uint _demandId, string memory _fileHash) public {
        require(demands[_demandId].exists, "Demand does not exist!");
        demands[_demandId].isPharmacyApproved = true;
        demands[_demandId].pharmacyReportHash = _fileHash;
        emit PharmacyApproved(_demandId, _fileHash);
    }

    function approveLab(uint _demandId, string memory _fileHash) public {
        require(demands[_demandId].exists, "Demand does not exist!");
        demands[_demandId].isLabApproved = true;
        demands[_demandId].pathologyReportHash = _fileHash;
        emit LabApproved(_demandId, _fileHash);
    }

    function deleteDemand(uint _demandId) public {
        require(demands[_demandId].exists, "Demand does not exist!");
        delete demands[_demandId]; // Deletes demand from mapping
        emit DemandDeleted(_demandId);
    }
}
