package com.learnjava.springsecurity.repository;

import com.learnjava.springsecurity.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer>{
    List<Todo> findByUsername(String username);
}
