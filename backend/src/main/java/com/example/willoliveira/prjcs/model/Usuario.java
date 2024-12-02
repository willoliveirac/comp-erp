package com.example.willoliveira.prjcs.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "usuarios")
public class Usuario{

    @Id
    private String id;

    private String nome;
    private String email;
    private String senha;

    public Usuario(String id, String nome, String email, String senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }



    public String getId() {
        return id;
    }

    
    public String getNome(){
        return nome;
    }
   
    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public void setId(String id){
        this.id = id;

    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }


    
    @Override
    public String toString() {
        return "Usuario{" +
                "id='" + id + '\'' +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", senha='[PROTEGIDO]'" + // Senha mascarada por segurança
                '}';
    }


    



}