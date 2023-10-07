package com.example.apiService.controller;


import com.example.apiService.entity.AuthReq;
import com.example.apiService.entity.User;
import com.example.apiService.jwt.JwtUtil;
import com.example.apiService.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {


    private JwtUtil jwtUtil;

    private UserRepository repository;
    private AuthenticationManager authenticationManager;

    WelcomeController(JwtUtil jwtUtil,AuthenticationManager authenticationManager, UserRepository repository){
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.repository=repository;
    }

    @GetMapping("/")
    public String welcome(){
        return "Welcome to Spring Security";
    }

    @PostMapping("/authenticate")
    public String generateToken(@RequestBody AuthReq authReq) throws Exception{
        try {
            authenticationManager.authenticate(
                    new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(authReq.getUsername(), authReq.getPassword())

            );
            return jwtUtil.generateToken(authReq.getUsername());
        }catch (Exception ex){
            throw new Exception("Invalid username/password");
        }

    }

    @PostMapping("/users")
    public String createUser(@RequestBody User user){
        user.setRoles("USER");
        repository.save(user);
        return "user created succesfully";
    }

}