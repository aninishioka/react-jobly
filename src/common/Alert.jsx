/** Component for alert message.
 *
 * Props:
 * - text
 * - type: danger, success, etc. (match to bootstrap classes)
 *
 * State: none
 *
 * {LoginForm, ProfileForm, SignupForm, ErrorPage} -> Alert
 */
function Alert({text, type}) {
  return <div className={`alert alert-${type}`} role="alert">{text}</div>;
}

export default Alert;
