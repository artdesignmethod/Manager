/* eslint-disable react/prop-types */
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="95%" height={300}>
      <AreaChart data={data} margin={{ top: 32 }}>
        <CartesianGrid strokeDasharray="2" />
        <XAxis dataKey="date" fontSize="1.5rem" />
        <YAxis allowDecimals={false} />
        <Tooltip contentStyle={{ fontSize: "1.5rem" }} />
        <Area
          type="monotone"
          dataKey="count"
          name="Projects"
          fill="#e0e7ff"
          stroke="#818cf8"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
