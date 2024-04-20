import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  MenuItem,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Chart from "./helper/chart";
import ListView from "./helper/list";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  borderRadius: "10px",
}));

const categories = ["Travel", "Food", "Party", "Study"];

const Insights = () => {
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [insights, setInsights] = useState([]);
  const [chartView, setChartView] = useState(false);

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
      const sortedInsights = response.data.insights_data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setInsights(sortedInsights);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  const handleReset = () => {
    setCategory("");
    setEmail("");
    setInsights([]);
    setTotalAmount(null);
  };

  const handleViewChange = (event, newValue) => {
    setChartView(newValue === "chart");
  };

  return (
    <Box className="big-box" sx={{ flexGrow: 1, paddingTop: "80px" }}>
      <Grid container justifyContent="center" flexDirection="column" alignItems='center'>
        <Grid item xs={12} sm={6} sx={{marginBottom:'30px'}}>
          <Item>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      label="Category"
                      select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      labelId="category-label"
                      variant="outlined"
                      sx={{ textAlign: "left" }}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ToggleButtonGroup
                    value={chartView ? "chart" : "list"}
                    exclusive
                    onChange={handleViewChange}
                  >
                    <ToggleButton value="list">List</ToggleButton>
                    <ToggleButton value="chart">Chart</ToggleButton>
                  </ToggleButtonGroup>
                  <Grid item>
                    <Button sx={{marginRight:'5px'}} onClick={handleReset} variant="contained">
                      Reset
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Get Insights
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} sx={{display:'flex', justifyContent:'center'}}>
          {chartView ? (
            <Chart totalAmount={totalAmount} insights={insights}/>
          ) : (
            <ListView totalAmount={totalAmount} insights={insights}/>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Insights;
