import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
const Chart = ({insights,totalAmount}) => {
  return (
    <Grid
      item
      sm={6}
      xs={12}
      className="chart-grid"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {totalAmount !== null && <Typography sx={{fontSize:'20px'}}>Total Spending: {totalAmount}</Typography>}
      <LineChart
        width={500}
        height={300}
        data={insights}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </Grid>
  );
};

export default Chart;
