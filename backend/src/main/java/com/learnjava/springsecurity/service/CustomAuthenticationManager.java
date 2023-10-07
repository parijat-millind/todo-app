package com.learnjava.springsecurity.service;

import com.learnjava.springsecurity.entity.User;
import com.learnjava.springsecurity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("authenticationManager")
public class CustomAuthenticationManager implements AuthenticationManager {

    @Autowired
    UserRepository repository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String username = authentication.getPrincipal() + "";
        String password = authentication.getCredentials() + "";
        try{
            Optional<User> user= Optional.ofNullable(repository.findByUsername(username));
            if(!user.isPresent() || !user.get().getPassword().equals(password)){
                throw new NoSuchElementException("User not found");
            }
            List<GrantedAuthority> grantedAuths = new ArrayList<>();
            grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
            return new UsernamePasswordAuthenticationToken(username, password, grantedAuths);
        }catch (Exception e){
            throw new NoSuchElementException("User not found");
        }


//        List<GrantedAuthority> grantedAuths= (List<SimpleGrantedAuthority>) Arrays.stream(user.get().getRoles().split(","));
//        grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));


    }
}
