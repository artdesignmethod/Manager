import { useLocation, useNavigate } from "react-router-dom";
import { useAllProjectsContext } from "../pages/AllProjects";

// Icons
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const PaginationContainer = () => {
  const {
    data: { totalProjects, numberOfPages, currentPage, projects },
  } = useAllProjectsContext();

  const displayedProjects = projects.length;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber); // ads the page param to the search param 'page=2'
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const previousPage = () => {
    let prevPage = currentPage - 1;
    handlePageChange(prevPage);
  };

  const nextPage = () => {
    let nextPage = currentPage + 1;
    handlePageChange(nextPage);
  };

  return (
    <section className="pagination-section">
      {displayedProjects > 0 && (
        <p className="pagination-text">
          Showing <span>{(currentPage - 1) * displayedProjects + 1}</span> to{" "}
          <span>
            {currentPage === numberOfPages
              ? totalProjects
              : currentPage * displayedProjects}
          </span>{" "}
          of <span>{totalProjects}</span> results
        </p>
      )}

      {displayedProjects > 0 && (
        <div className="pagination-buttons">
          <button
            className="pagination-btn"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            <FaAngleLeft className="pagination-btn-icon" />{" "}
            <span>Previous</span>
          </button>

          <p className="page-numbers">
            Page {currentPage} of {numberOfPages}
          </p>

          <button
            className="pagination-btn"
            onClick={nextPage}
            disabled={currentPage === numberOfPages}
          >
            <span>Next</span>
            <FaAngleRight className="pagination-btn-icon" />
          </button>
        </div>
      )}
    </section>
  );
};
export default PaginationContainer;
