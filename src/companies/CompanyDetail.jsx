import { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingScreen from "../common/LoadingScreen";
import userContext from "../user/userContext";
import ErrorPage from "../common/ErrorPage";
import "./CompanyDetail.css";

/** Component for rendering company information.
 *
 * State:
 * - company: {data: { handle, name, description, numEmployees, logoUrl, jobs }, isLoading}
 * where jobs is [{ id, title, salary, equity }, ...]
 *
 * Props: none
 *
 * RouteList -> Company Detail -> JobCardsList
 */

function CompanyDetail() {
  const [company, setCompany] = useState({
    data: null,
    isLoading: true
  });
  const [errors, setErrors] = useState(null);
  const { user } = useContext(userContext);
  console.log("in rendering CompanyDetail");


  const { handle } = useParams();

  useEffect(function fetchCompanyOnMount() {
    async function fetchCompany() {
      console.log("in useEffect CompanyDetail");
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany({
          data: company,
          isLoading: false
        });
      } catch (err) {
        setErrors(err);
      }

    }
    fetchCompany();
  }, []);

  if (errors) return <ErrorPage errors={errors} />;
  if (company.isLoading) return <LoadingScreen />;

  return (
    <div className="col-9 CompanyDetail">
      <h3>{company.data.name}</h3>
      <h5>{company.data.description}</h5>
      <JobCardList jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetail;
