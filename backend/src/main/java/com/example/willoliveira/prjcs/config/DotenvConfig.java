package com.example.willoliveira.prjcs.config;

import io.github.cdimascio.dotenv.Dotenv;


public class DotenvConfig {

    // Instância única do Dotenv para carregar o arquivo .env
    private static final Dotenv dotenv = Dotenv.configure().load();

    /**
     * Método para obter o valor de uma variável do arquivo .env.
     *
     * @param key Nome da variável.
     * @return Valor da variável ou null se não estiver definida.
     */
    public static String get(String key) {
        return dotenv.get(key);
    }
}