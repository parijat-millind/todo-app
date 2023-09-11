import { apiCLient } from "./apiClient";

export const retrieveTodosForUserApi =
    (username, token) => apiCLient.get(`/users/${username}/todos`, {
        headers: {
            Authorization: token
        }
    });

export const deleteTodoForUserApi =
    (id) => apiCLient.delete(`/todos/${id}`);


export const retrieveTodoByIdApi =
    (id) => apiCLient.get(`/todos/${id}`);

export const updateTodoByIdApi =
    (username, id, todo) => apiCLient.put(`/users/${username}/todos/${id}`, todo);

export const createTodoApi =
    (username, todo) => apiCLient.post(`/users/${username}/todos`, todo);

export const createUserApi =
    (user) => apiCLient.post(`/users`, user);

export const executeBasicAuth =
    (token) => apiCLient.get(`/basicAuth`, {
        headers: {
            Authorization: token
        }
    });

export const authenticateUserApi =
    (user) => apiCLient.post(`/authenticate`, user);