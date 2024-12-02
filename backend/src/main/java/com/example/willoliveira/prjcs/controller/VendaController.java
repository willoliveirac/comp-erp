package com.example.willoliveira.prjcs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.willoliveira.prjcs.model.Venda;
import com.example.willoliveira.prjcs.service.VendaService;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "http://localhost:3000")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @PostMapping
    public ResponseEntity<Venda> cadastrarVenda(@RequestBody Venda venda) {
        try {
            Venda novaVenda = vendaService.cadastrarVenda(venda);
            return new ResponseEntity<>(novaVenda, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
