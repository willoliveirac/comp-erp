package com.example.willoliveira.prjcs.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.willoliveira.prjcs.model.Venda;

public interface VendaRepository extends MongoRepository<Venda, String> {
    
}