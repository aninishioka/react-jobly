import Alert from "./Alert";
import {v4 as uuid} from "uuid";

/** Component for rendering error messages
 *
 * Props: errors[]
 * State: none
 *
 * CompanyDetail --> ErrorPage --> Alert
 */
function ErrorPage({errors}) {
  console.log("in rendering NotFound");

  return (
    <div>
      {errors.map(e =>
        <Alert key={uuid()} text={e} type="danger" />)}
    </div>
  );
}

export default ErrorPage;