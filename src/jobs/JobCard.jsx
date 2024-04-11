import './JobCard.css';
import { SalaryFormatter } from '../common/utils';

/** Component informational card about job.
 *
 * State: none
 *
 * Props:
 * - job: { id, title, salary, equity, companyHandle, companyName }
 *
 * JobCardList -> JobCard
 */

function JobCard({ job }) {
  console.log("in rendering JobCard");

  return (
    <div className='JobCard card'>
      <div className='card-body'>
        <div className='JobCard-header'>
          <h5 className='card-title'>{job.title}</h5>
          <p className='card-subtitle'>{job.companyName}</p>
        </div>
        <div className="JobCard-bottom">
          {job.salary &&
            <p className='card-text JobCard-text'> {`Salary: ${SalaryFormatter.format(job.salary)}`}</p>}
          <p className='card-text JobCard-text'>Equity: {job.equity}</p>
        </div>
      </div>
    </div>
  );
}

export default JobCard;