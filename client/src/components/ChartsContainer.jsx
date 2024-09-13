/* eslint-disable react/prop-types */
import { useState } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <p className="charts-heading">Monthly Projects</p>
      <button
        className="charts-button"
        type="button"
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? "View Area Chart" : "View Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
