import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import userContext from "./userContext";
import Alert from "../common/Alert";
import { v4 as uuid } from 'uuid';
import "./ProfileForm.css";

/** Component for Profile edit form
 *
 * props:
 * - updateUser(): fn to call in parent
 *
 * State: inputValues
 *
 * App -> ProfileForm
 */
function ProfileForm({ updateUser }) {
  const { user } = useContext(userContext);
  const [inputValues, setInputValues] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });
  const [alerts, setAlerts] = useState([]);

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
      await updateUser(inputValues);
      setAlerts([{ text: 'Updated succesfully.', type: 'success' }]);
    } catch (err) {
      setAlerts(err.map(e => ({ text: e, type: 'danger' })));
    }
  }

  return (
    <div className="ProfilePage col-9">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name='username'
          value={inputValues.username}
          disabled
          className="ProfilePage-input form-control"
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name='firstName'
          value={inputValues.firstName}
          onChange={handleChange}
          className="ProfilePage-input form-control"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name='lastName'
          value={inputValues.lastName}
          onChange={handleChange}
          className="ProfilePage-input form-control"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name='email'
          value={inputValues.email}
          onChange={handleChange}
          className="ProfilePage-input form-control"
        />
        <button type="submit" className="btn btn-primary ProfilePage-btn">
          Save Changes
        </button>
      </form>
      {alerts.map(a =>
        <Alert key={uuid()} text={a.text} type={a.type} />
      )}
    </div>
  );
}

export default ProfileForm;
