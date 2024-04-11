import { useContext, useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import CompanyCardList from "./CompanyCardList";
import LoadingScreen from "../common/LoadingScreen";
import PaginationButton from "../common/PaginationButton";
import userContext from "../user/userContext";
import "./CompanyList.css";

const CARDS_PER_PAGE = 20;

/** Component for searching and rendering list of company cards.
 *
 * State:
 * - companies: {data: [company...], isLoading}
 * - searchQuery
 *
 * Props: none
 *
 * RouteList -> CompanyList -> {CompanyCardsList, SearchForm}
 */

function CompanyList() {
  const [companies, setCompanies] = useState({
    data: null,
    isLoading: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const params = new URL(document.location).searchParams;
  const [searchParams, setSearchParams] = useSearchParams({ page: params.get('page') });
  const [pageNum, setPageNum] = useState(Number(searchParams.get('page')) || 1);
  const { user } = useContext(userContext);

  console.log("in rendering CompanyList");

  useEffect(
    function fetchCompaniesOnMount() {
      fetchCompanies();
      console.log("in useEffect CompanyList");
    },
    []
  );

  /** Takes query string, fetches companies, and set companies. */
  async function fetchCompanies(query = "") {
    const companies = await JoblyApi.getCompanies(query);
    setCompanies({
      data: companies,
      isLoading: false,
    });
    setSearchQuery(query.trim());
  }

  function getPrevPage() {
    setSearchParams({ page: pageNum - 1 });
    setPageNum(pageNum => pageNum - 1);
  }

  function getNextPage() {
    setSearchParams({ page: pageNum + 1 });
    setPageNum(pageNum => pageNum + 1);
  }

  if (companies.isLoading) return <LoadingScreen />;

  return (
    <div className="CompanyList col-10">
      <SearchForm handleSearch={fetchCompanies} />

      <h1 className="CompanyList-header">
        {searchQuery ? `Search Results for '${searchQuery}'` : "All Companies"}
      </h1>

      <div>
        {companies.data.length !== 0 && pageNum <= Math.ceil(companies.data.length / CARDS_PER_PAGE)
          ? <CompanyCardList companies={companies.data.slice(CARDS_PER_PAGE * (pageNum - 1), CARDS_PER_PAGE * pageNum)} />
          : <h3>Sorry, no results found!</h3>}
      </div>
      <div>
        {pageNum > 1 && <PaginationButton getPage={getPrevPage} text='Previous page' />}
        {pageNum < Math.ceil(companies.data.length / CARDS_PER_PAGE) && <PaginationButton getPage={getNextPage} text='Next page' />}
      </div>
    </div>
  );
}

export default CompanyList;
