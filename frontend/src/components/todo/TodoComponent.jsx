import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { retrieveTodoByIdApi, updateTodoByIdApi, createTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthComponent";


export default function TodoComponent() {
    const id = useParams().id;
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    function refreshTodos() {
        if (id !== '-1')
            retrieveTodoByIdApi(id)
                .then(
                    response => {
                        setTargetDate(response.data.targetDate)
                        setDescription(response.data.description)
                    }
                )
                .catch(error => console.log(error))
    }

    function onSubmit(values) {
        const todo = {
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id === '-1') {
            createTodoApi(username, todo)
                .then(
                    response => {
                        navigate(`/todos`);
                    }
                )
                .catch(error => console.log(error))
        } else {
            updateTodoByIdApi(username, id, todo)
                .then(
                    response => {
                        navigate(`/todos`);
                    }
                )
                .catch(error => console.log(error))
        }

    }

    function validate(values) {
        let errors = {

        }
        if (values.targetDate === null || values.targetDate === '') {
            errors.description = 'Enter a valid target date'
        }
        if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters in description'
        }

        return errors;
    }

    useEffect(
        () => {
            refreshTodos()
        }, [id]
    )

    return (
        <div className="container">
            <h1>Add Todo Details</h1>
            <div>
                <Formik initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate" />
                                </fieldset>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>

        </div>
    )
}