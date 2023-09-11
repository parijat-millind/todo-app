package com.example.apiService.repository;

import com.example.apiService.todo.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

    public List<Todo> findByUsername(String username);
}
