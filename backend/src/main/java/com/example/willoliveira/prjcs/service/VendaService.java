package com.example.willoliveira.prjcs.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.willoliveira.prjcs.model.Cliente;
import com.example.willoliveira.prjcs.model.Venda;
import com.example.willoliveira.prjcs.repository.ClienteRepository;
import com.example.willoliveira.prjcs.repository.VendaRepository;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public Venda cadastrarVenda(Venda venda) {
        // Verifica se o cliente já existe pelo e-mail
        Cliente clienteExistente = clienteRepository.findByEmail(venda.getCliente().getEmail());

        if (clienteExistente == null) {
            // Caso o cliente não exista, salva-o no banco de dados
            clienteExistente = clienteRepository.save(venda.getCliente());
        }

        // Atualiza a referência do cliente na venda
        venda.setCliente(clienteExistente);

        // Define a data da venda como a data atual
        venda.setData(LocalDate.now());

        // Salva a venda no banco de dados
        return vendaRepository.save(venda);
    }
}
