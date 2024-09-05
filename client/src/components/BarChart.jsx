/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="98%" height={300}>
      <BarChart margin={{ top: 32 }}>
        <CartesianGrid strokeDasharray="2" />
        <XAxis fontSize="1.5rem" />
        <YAxis allowDecimals={false} />
        <Tooltip contentStyle={{ fontSize: "1.5rem" }} />
        <Bar
          fill="#4f46e5"
          barSize={72}
          name="Projects"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
