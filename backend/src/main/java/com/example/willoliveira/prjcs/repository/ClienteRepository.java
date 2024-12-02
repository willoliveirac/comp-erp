package com.example.willoliveira.prjcs.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.willoliveira.prjcs.model.Cliente;

public interface ClienteRepository extends MongoRepository<Cliente, String> {
    Cliente findByEmail(String email); // Busca cliente pelo e-mail
}
