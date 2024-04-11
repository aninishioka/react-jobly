import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** Component informational card about company.
 *
 * State: none
 *
 * Props:
 * { handle, name, description, numEmployees, logoUrl }
 *
 * CompanyCardList -> CompanyCard
 */

function CompanyCard({ company }) {
  console.log("in rendering CompanyCard");

  return (
    <div className="CompanyCard card">
      <Link to={`/companies/${company.handle}`}>
        <div className="card-body">
          <div className="CompanyCard-header">
            <h3 className="card-title">{company.name}
            </h3>
            {company.logoUrl &&
              <img
                src={company.logoUrl}
                alt={`Logo for ${company.name}`}
                className="CompanyCard-img" />}
          </div>
          <p className="CompanyCard-text card-text">{company.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default CompanyCard;;