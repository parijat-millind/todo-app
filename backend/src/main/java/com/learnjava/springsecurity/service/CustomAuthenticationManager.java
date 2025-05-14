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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service("authenticationManager")
public class CustomAuthenticationManager implements AuthenticationManager {

    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationManager.class);

    @Autowired
    UserRepository repository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String email = authentication.getPrincipal() + "";
        String password = authentication.getCredentials() + "";
        logger.info("Authenticating user: {}", email);

        try {
            Optional<User> user = Optional.ofNullable(repository.findByEmail(email));
            if (user.isEmpty() || !passwordEncoder.matches(password,user.get().getPassword()) ) {
                logger.error("Invalid username or password for user: {}", email);
                throw new NoSuchElementException("User not found");
            }
            List<GrantedAuthority> grantedAuths = new ArrayList<>();
            grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
            return new UsernamePasswordAuthenticationToken(email, password, grantedAuths);
        } catch (Exception e) {
            logger.error("Authentication failed for user: {}", email, e);
            throw new NoSuchElementException("User not found");
        }
    }
}