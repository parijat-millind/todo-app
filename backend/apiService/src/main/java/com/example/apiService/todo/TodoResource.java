package com.example.apiService.todo;


import com.example.apiService.repository.TodoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoResource {


    private TodoRepository todoRepository;


    public TodoResource(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username) {

//        if(user.isEmpty()){
//            throw new UserNotFoundException("username: "+username);
//        }
        List<Todo> todos = todoRepository.findByUsername(username);
        return todos;
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable int id) {
        todoRepository.deleteById(id);
        //returns 204 status code
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
}

