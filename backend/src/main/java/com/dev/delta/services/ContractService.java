package com.dev.delta.services;

import com.dev.delta.entities.Contract;
import com.dev.delta.repositories.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    /**
     * Retrieve all contracts from the repository.
     *
     * @return a list of all contracts
     */
    public List<Contract> findAll() {
        return contractRepository.findAll();
    }

    /**
     * Retrieve a contract by its ID.
     *
     * @param id the ID of the contract
     * @return an Optional containing the contract if found, otherwise empty
     */
    public Optional<Contract> findById(Long id) {
        return contractRepository.findById(id);
    }

    /**
     * Save a new or existing contract to the repository.
     *
     * @param contract the contract to save
     * @return the saved contract
     */
    public Contract save(Contract contract) {
        return contractRepository.save(contract);
    }

    /**
     * Delete a contract by its ID.
     *
     * @param id the ID of the contract to delete
     */
    public void deleteById(Long id) {
        contractRepository.deleteById(id);
    }

    /**
     * Retrieve all contracts associated with a specific vendor.
     *
     * @param vendorId the ID of the vendor
     * @return a list of contracts associated with the vendor
     */
    public List<Contract> findContractsByVendorId(Long vendorId) {
        return contractRepository.findAll();
    }

    /**
     * Calculate the duration of a contract in days.
     *
     * @param contractId the ID of the contract
     * @return the duration of the contract in days
     */
    public Long calculateContractDuration(Long contractId) {
        Optional<Contract> contractOpt = findById(contractId);
        if (contractOpt.isPresent()) {
            Contract contract = contractOpt.get();
            return java.time.temporal.ChronoUnit.DAYS.between(contract.getStartDate(), contract.getEndDate());
        }
        return 0L;
    }
}
