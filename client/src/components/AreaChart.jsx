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

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="95%" height={300}>
      <AreaChart margin={{ top: 32 }}>
        <CartesianGrid strokeDasharray="2" />
        <XAxis fontSize="1.5rem" />
        <YAxis allowDecimals={false} />
        <Tooltip contentStyle={{ fontSize: "1.5rem" }} />
        <Area
          type="monotone"
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
