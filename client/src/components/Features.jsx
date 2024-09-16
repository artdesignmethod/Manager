import { IoSparkles } from "react-icons/io5";
import { HiMiniCalendarDays, HiDocumentCheck } from "react-icons/hi2";

const Features = () => {
  return (
    <div className="feature-section" id="features">
      <h2 className="heading-secondary">Features</h2>

      <div className="features grid grid-cols-3">
        <div className="feature center">
          <HiMiniCalendarDays className="feature-icon" />
          <p className="feature-title">Create Projects</p>

          <p className="feature-text">
            Store project production times, <br /> status and pricing.
          </p>
        </div>

        <div className="feature center">
          <HiDocumentCheck className="feature-icon" />
          <p className="feature-title">Project Management</p>

          <p className="feature-text">
            Perform progress updates <br /> or delete projects.
          </p>
        </div>

        <div className="feature center">
          <IoSparkles className="feature-icon" />
          <p className="feature-title">Statistics</p>
          <p className="feature-text">View monthly stats and overviews.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
