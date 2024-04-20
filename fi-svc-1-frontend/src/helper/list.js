import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
const ListView = ({totalAmount,insights}) => {
  return (
    <Grid
      item
      sm={12}
      xs={12}
      className="card-grid"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {totalAmount !== null && <Typography sx={{fontSize:'20px'}}>Total Spending: {totalAmount}</Typography>}
      <Grid container spacing={2} justifyContent="center">
        {insights.map((insight, index) => (
          <Grid item key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Date: {insight.date}</Typography>
                <Typography variant="body1">
                  Amount: {insight.amount}
                </Typography>
                <Typography variant="body2">
                  Category: {insight.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ListView;
