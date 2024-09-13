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

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="98%" height={300}>
      <BarChart data={data} margin={{ top: 32 }}>
        <CartesianGrid strokeDasharray="2" />
        <XAxis dataKey="date" fontSize="1.5rem" />
        <YAxis allowDecimals={false} />
        <Tooltip contentStyle={{ fontSize: "1.5rem" }} />
        <Bar
          dataKey="count"
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
