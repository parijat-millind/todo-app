package com.example.apiService.user;

import com.example.apiService.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class UserResource {

    private UserRepository userRepository;

    public UserResource(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/basicAuth")
    public String basicAuthenticateUser(){
        return "success";
    }

    @PostMapping("/authenticate")
    public String authenticateUser(@RequestBody User user){
        Optional<User> temp = Optional.ofNullable(userRepository.findByUsername(user.getUsername()));
        if(temp.isPresent()){
            User user1 = temp.get();
            if(user1.getPassword().equals(user.getPassword())){
                return "success";
            }else{
                return "failure";
            }
        }
        return "failure";
    }


    @GetMapping("/users")
    public List<User> retrieveAllUsers(){
        return userRepository.findAll();
    }


    @PostMapping("/users")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        User savedUser= userRepository.save(user);
        URI location= ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
    }


}
