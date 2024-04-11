import CompanyCard from "./CompanyCard";
import "./CompanyCardList.css";

/** Component to render list of company cards.
 *
 * State: none
 *
 * Props:
 * - companies: [{ handle, name, description, numEmployees, logoUrl }...]
 *
 * CompanyList -> CompanyCardList -> CompanyCard
 */

function CompanyCardList({ companies }) {
  console.log("in rendering CompanyCardList");

  return (
    <div className="CompanyCardList">
      {companies.map((c) =>
        <CompanyCard key={c.handle} company={c} />
      )}
    </div>
  );
}

export default CompanyCardList;