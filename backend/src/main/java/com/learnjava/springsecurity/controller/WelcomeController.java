package com.learnjava.springsecurity.controller;


import com.learnjava.springsecurity.entity.AuthReq;
import com.learnjava.springsecurity.entity.User;
import com.learnjava.springsecurity.repository.UserRepository;
import com.learnjava.springsecurity.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
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
