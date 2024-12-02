package com.example.willoliveira.prjcs.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.willoliveira.prjcs.model.Usuario;




public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    
     Optional<Usuario> findByEmail(String email);

 


    
}