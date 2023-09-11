import { Formik, Form, Field } from "formik";
import "./TodoApp.css";
import { createUserApi } from "./api/TodoApiService";
import { useState } from "react";





export default function CreateUserComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(false);

    function onSubmit(values) {
        const user = {
            username: values.username,
            password: values.password
        }
        createUserApi(user)
            .then(
                response => {
                    setFlag(true);
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <div className="container">
            {flag && <div className="alert alert-success">User created successfully</div>}
            <div>
                <Formik
                    initialValues={{ username, password }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>username</label>
                                    <Field className="form-control" type="text" name="username" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>password</label>
                                    <Field className="form-control" type="password" name="password" />
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