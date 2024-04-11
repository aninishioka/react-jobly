import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import userContext from "../user/userContext";

/** Navigation bar component.
 *
 * State: none
 *
 * Props:
 * - logOut(): fn to call in parent
 */

function NavBar({ logout }) {
  console.log("in rendering NavBar");
  const { user } = useContext(userContext);

  /** Renders NavBar for logged out user */
  function renderAnonRight() {
    return (
      <div className="NavBar-right">
        <NavLink className="NavBar-link" to="/login">Log In</NavLink>
        <NavLink className="NavBar-link" to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  /** Renders NavBar for logged in user */
  function renderUserRight() {
    return (
      <div className="NavBar-right">
        <NavLink className="NavBar-link" to="/companies">Companies</NavLink>
        <NavLink className="NavBar-link" to="/jobs">Jobs</NavLink>
        <NavLink className="NavBar-link" to="/profile">Profile</NavLink>
        <NavLink className="NavBar-link" to="/" onClick={logout}>Logout {user.username}</NavLink>
      </div>
    );
  }

  return (
    <div className="NavBar navbar navbar-expand-lg bg-primary">
      <div className="NavBar-left">
        <NavLink className="NavBar-link-home" to="/">Jobly</NavLink>
      </div>
      {user
        ? renderUserRight()
        : renderAnonRight()}
    </div>
  );
}

export default NavBar;
