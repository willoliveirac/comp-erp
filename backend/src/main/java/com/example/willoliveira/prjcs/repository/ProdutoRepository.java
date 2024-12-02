package com.example.willoliveira.prjcs.repository;




import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.willoliveira.prjcs.model.Produto;

@Repository
public interface ProdutoRepository extends MongoRepository<Produto, String> {
    
}
