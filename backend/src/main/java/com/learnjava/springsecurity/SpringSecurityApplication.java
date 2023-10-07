package com.learnjava.springsecurity;

import com.learnjava.springsecurity.entity.User;
import com.learnjava.springsecurity.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class SpringSecurityApplication {

//	@Autowired
//	private UserRepository userRepository;
//
//	@PostConstruct
//	public void initUsers(){
//		List<User> user= Stream.of(
//				new User(101,"parijat","1203","parijat.millind@yahoo.com", "USER"),
//				new User(102,"richa","1234","richa.sinha1203@gmail.com", "USER")
//
//		).collect(Collectors.toList());
//		userRepository.saveAll(user);
//	}

	public static void main(String[] args) {
		SpringApplication.run(SpringSecurityApplication.class, args);
	}




}
