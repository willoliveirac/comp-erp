package com.example.willoliveira.prjcs.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.willoliveira.prjcs.model.Produto;
import com.example.willoliveira.prjcs.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

   
    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto buscarProdutoPorId(String id) {
        return produtoRepository.findById(id).orElse(null);
    }

    public void excluirProduto(String id) {
        produtoRepository.deleteById(id);
    }

       public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }
}
