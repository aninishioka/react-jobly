import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import { v4 as uuid } from 'uuid';
import "./SignupForm.css";

const INITIAL_STATE = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

/** Component for Signup form
 *
 * props:
 * - signupUser(): fn to call in parent
 *
 * State: inputValues
 *
 * App -> SignupForm
 */
function SignupForm({ signupUser }) {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  /** updates inputValues. */
  function handleChange(evt) {
    setInputValues((inputValues) => ({
      ...inputValues,
      [evt.target.name]: evt.target.value,
    }));
  }

  /** Calls fn in parent. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signupUser(inputValues);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="SignupPage col-9">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={inputValues.username}
          onChange={handleChange}
          className="SignupPage-input form-control"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleChange}
          className="SignupPage-input form-control"
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleChange}
          className="SignupPage-input form-control"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleChange}
          className="SignupPage-input form-control"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={inputValues.email}
          onChange={handleChange}
          className="SignupPage-input form-control"
        />
        <button type="submit" className="btn btn-primary SignupPage-btn">
          Submit
        </button>
      </form>
      {errors.map((e) => <Alert key={uuid()} text={e} type="danger" />)}
    </div>
  );
}

export default SignupForm;
