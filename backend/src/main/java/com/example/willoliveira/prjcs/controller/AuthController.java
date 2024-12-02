package com.example.willoliveira.prjcs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.willoliveira.prjcs.model.Usuario;
import com.example.willoliveira.prjcs.service.UsuarioService;



@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000") // Permite requisições do React
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    
    
    @PostMapping
    public ResponseEntity<Usuario> login(@RequestBody Usuario param) {

        System.out.println(param.toString());

        if(usuarioService.buscarUsuarioPorEmail(param.getEmail()) == null) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);


        } 
        
        else {
            Usuario login = usuarioService.buscarUsuarioPorEmail(param.getEmail());
            
            if (login.getSenha().equals(param.getSenha())) {
                return new ResponseEntity<>(HttpStatus.ACCEPTED);
            }
            else
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

            
        }
        
        

    }
 

}