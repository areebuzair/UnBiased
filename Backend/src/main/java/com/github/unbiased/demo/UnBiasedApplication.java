package com.github.unbiased.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class UnBiasedApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnBiasedApplication.class, args);
	}

}
