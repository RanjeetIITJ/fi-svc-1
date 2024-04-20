import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  borderRadius: "10px",
}));
const Insights = () => {
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [insights, setInsights] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/insights", {
        headers: {
          category: category,
          email: email,
        },
      });
      setTotalAmount(response.data.total_amount);
      setInsights(response.data.insights_data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  const handleReset= ()=>{
    setCategory("");
    setEmail("");
    setInsights([]);
    setTotalAmount(null);
  }
  return (
    <Box className="big-box" sx={{ flexGrow: 1, paddingTop: "100px" }}>
      <Grid
        className="big-grid"
        container
        justifyContent="center"
        sx={{ flexDirection: "column", alignItems: "center" }}
      >
        <Grid item xs={12} sm={6}>
        <Item className="itemmmsss" sx={{ padding: "33px 33px 33px 33px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              label="Category"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ width: "100%", marginBottom: 2 }}
            />
            <TextField
              required
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%", marginBottom: 2 }}
            />
            <Grid className="btn-class" sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Button onClick={handleReset} variant="contained" color="primary">
              Reset
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Get Insights
            </Button>
            </Grid>
          </form>
        </Item>
        </Grid>
        <Grid item sm={6} xs={12}
          className="card-grid"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {totalAmount !== null && <p>Total Spending: {totalAmount}</p>}
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
      </Grid>
    </Box>
  );
};

export default Insights;
