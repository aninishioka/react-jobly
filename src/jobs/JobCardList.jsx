import JobCard from "./JobCard";
import "./JobCardList.css";

/** Component to render list of job cards.
 *
 * State: none
 *
 * Props:
 * - job: [{ id, title, salary, equity, companyHandle, companyName }...]
 *
 * { JobList, CompanyDetail }-> JobCardList -> JobCard
 */

function JobCardList({ jobs }) {
  console.log("in rendering JobCardList");

  return (
    <div className="JobCardList">
      {jobs.map((j) =>
        <JobCard key={j.id} job={j} />
      )}
    </div>
  );
}

export default JobCardList;
