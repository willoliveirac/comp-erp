package com.example.willoliveira.prjcs.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vendas") // Define a coleção no MongoDB
public class Venda {

    @Id
    private String id; // No MongoDB, o ID é geralmente uma String

    private Cliente cliente; // Cliente que fez a compra
    private double valorTotal; // Valor total da venda
    private LocalDate data; // Data da venda

    // Construtores
    public Venda() {}

    public Venda(Cliente cliente, double valorTotal, LocalDate data) {
        if (cliente == null) {
            throw new IllegalArgumentException("Cliente não pode ser nulo.");
        }
        if (valorTotal < 0) {
            throw new IllegalArgumentException("O valor total não pode ser negativo.");
        }
        if (data == null) {
            throw new IllegalArgumentException("A data não pode ser nula.");
        }

        this.cliente = cliente;
        this.valorTotal = valorTotal;
        this.data = data;
    }

    // Getters e Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        if (cliente == null) {
            throw new IllegalArgumentException("Cliente não pode ser nulo.");
        }
        this.cliente = cliente;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        if (valorTotal < 0) {
            throw new IllegalArgumentException("O valor total não pode ser negativo.");
        }
        this.valorTotal = valorTotal;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        if (data == null) {
            throw new IllegalArgumentException("A data não pode ser nula.");
        }
        this.data = data;
    }
}
