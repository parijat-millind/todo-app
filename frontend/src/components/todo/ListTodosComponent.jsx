import { useEffect, useState } from "react";
import { deleteTodoForUserApi, retrieveTodosForUserApi } from "./api/TodoApiService";
import { useAuth } from './security/AuthComponent';
import { useNavigate } from 'react-router-dom';

export default function TodosComponent() {

    // const today = new Date();
    // const targetDate = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate() + 7);

    // const todos = [{ id: 1, description: 'Learn React', done: false, targetDate: targetDate },
    // { id: 2, description: 'Learn Spring', done: false, targetDate: targetDate },
    //     { id: 3, description: 'Learn Java', done: false, targetDate: targetDate }]

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);

    const authContext = useAuth();
    const navigate = useNavigate();


    function refreshTodos() {
        retrieveTodosForUserApi(authContext.username, authContext.token)
            .then(
                response => setTodos(response.data)
            )
            .catch(error => console.log(error))
    }

    useEffect(
        () => refreshTodos(), []
    )



    function deleteTodo(id) {
        deleteTodoForUserApi(id)
            .then(
                () => {
                    setMessage(`Todo deleted with id ${id}`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error)
            )
    }

    function createTodo() {
        navigate(`/todos/-1`);
    }

    function updateTodo(id) {
        navigate(`/todos/${id}`);
    }

    return (
        <div className="container">
            <h1>
                List of Todos :
            </h1>
            {
                message !== null && <div className="alert alert-warning">{message}</div>
            }
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>is done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                                    <td>{todo.targetDate}</td>
                                    <td><button type="button" className="btn btn-warning"
                                        onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button type="button" className="btn btn-success"
                                        onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-success m-3" onClick={() => createTodo()}>Add new Todo
                </button>
            </div>
        </div>
    )
}