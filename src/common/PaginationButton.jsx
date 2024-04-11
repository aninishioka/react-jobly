/** Pagination button.
 *
 * Props:
 * - getPage(): fn to call in parent
 * - text: button text
 *
 * State: none
 *
 * {CompanyList, JobList} -> PaginationButton
 */

function PaginationButton({getPage, text}) {
    return (
        <button className="page-link" onClick={getPage}>{text}</button>
    )
}

export default PaginationButton;