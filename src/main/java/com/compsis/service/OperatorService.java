package com.compsis.service;

import com.compsis.service.dto.OperatorDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Operator.
 */
public interface OperatorService {

    /**
     * Save a operator.
     *
     * @param operatorDTO the entity to save
     * @return the persisted entity
     */
    OperatorDTO save(OperatorDTO operatorDTO);

    /**
     * Get all the operators.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OperatorDTO> findAll(Pageable pageable);


    /**
     * Get the "id" operator.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<OperatorDTO> findOne(Long id);

    /**
     * Delete the "id" operator.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
