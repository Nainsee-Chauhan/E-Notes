package com.cts.eNotes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAware")
public class ENotesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ENotesApplication.class, args);
	}

}
