import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "../common/Alert";
import { v4 as uuid } from 'uuid';
import "./LoginForm.css";

const INITIAL_STATE = {
    username: '',
    password: ''
};

/** Component for Login form
 *
 * props:
 * - loginUser(): fn to call in parent
 *
 * State: inputValues
 *
 * App -> LoginForm
 */
function LoginForm({ loginUser }) {
    const [inputValues, setInputValues] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    /** updates inputValues. */
    function handleChange(evt) {
        setInputValues(inputValues => ({
            ...inputValues,
            [evt.target.name]: evt.target.value
        }));
    }

    /** Calls fn in parent. */
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await loginUser(inputValues.username, inputValues.password);
            navigate('/');
        } catch (err) {
            setErrors(err);
        }
    }

    return (
        <div className="LoginPage col-9">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name='username'
                    value={inputValues.username}
                    onChange={handleChange}
                    className="LoginPage-input form-control"
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name='password'
                    value={inputValues.password}
                    onChange={handleChange}
                    className="LoginPage-input form-control"
                />
                <button type='submit' className="btn btn-primary LoginPage-btn">
                    Submit
                </button>
            </form>
            {errors.map(e =>
                <Alert key={uuid()} text={e} type='danger' />
            )}
        </div>

    );

}

export default LoginForm;