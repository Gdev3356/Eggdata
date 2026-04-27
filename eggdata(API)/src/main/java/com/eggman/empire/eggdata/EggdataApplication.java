package com.eggman.empire.eggdata;

import com.eggman.empire.eggdata.models.User;
import com.eggman.empire.eggdata.models.enums.UserRank;
import com.eggman.empire.eggdata.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class EggdataApplication {

	public static void main(String[] args) {
		SpringApplication.run(EggdataApplication.class, args);
	}

	@Bean
	public CommandLineRunner setupDatabase(UserRepository userRepository) {
		return args -> {
			if (userRepository.count() == 0) {
				User admin = new User();
				admin.setUserName("eggman");
				admin.setPassword("empire123");
				admin.setRank(UserRank.EGG_MASTER);
				admin.setCreationDate(LocalDate.now());
				userRepository.save(admin);
				System.out.println("LOG: Usuário mestre criado com sucesso!");
			}
		};
	}
}