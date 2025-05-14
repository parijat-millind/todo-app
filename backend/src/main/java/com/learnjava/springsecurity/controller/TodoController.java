package com.learnjava.springsecurity.controller;


import com.learnjava.springsecurity.entity.Todo;
import com.learnjava.springsecurity.repository.TodoRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    private TodoRepository todoRepository;


    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username) {
        List<Todo> todos = todoRepository.findByUsername(username);
        return todos;
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable int id) {
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();

    }


    @GetMapping("/todos/{id}")
    public Todo getTodoById(@PathVariable int id){
        return todoRepository.findById(id).get();
    }

    @PostMapping("/users/{username}/todos")
    public Todo addTodo(@PathVariable String username, @RequestBody Todo todo){
        todo.setUsername(username);
        todo.setId(null);
        return todoRepository.save(todo);
    }

    @PutMapping("/users/{username}/todos/{id}")
    public Todo updateTodoById(@PathVariable String username,@PathVariable Integer id, @RequestBody Todo todo){
        todo.setUsername(username);
        todo.setId(id);
        return todoRepository.save(todo);
    }

    @GetMapping("/test")
    public String test(){
        return "everything is working good";
    }
}
