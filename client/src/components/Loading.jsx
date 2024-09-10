import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="loading-section">
      <div className="loading-section-container">
        <CgSpinner className="loading" />

        <h2 className="heading-secondary">Loading...</h2>
      </div>
    </div>
  );
};
export default Loading;
