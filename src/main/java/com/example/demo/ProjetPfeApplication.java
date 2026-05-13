package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.core.env.Environment;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjetPfeApplication {

	public static void main(String[] args) {
		var context = SpringApplication.run(ProjetPfeApplication.class, args);
        Environment env = context.getEnvironment();

        System.out.println("PORT = " + env.getProperty("server.port"));
        System.out.println("DB URL = " + env.getProperty("spring.datasource.url"));
	}

}
