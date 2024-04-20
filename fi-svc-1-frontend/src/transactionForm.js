import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Snackbar,
  Alert,
  AlertTitle,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  borderRadius: "10px",
}));

const categories = ["Travel", "Food", "Party", "Study"]; // Define your categories here

function TransactionForm() {
  const [formData, setFormData] = useState({
    date: null,
    amount: "",
    category: "",
    description: "",
    email: "",
  });
  const [snackbar, setSnackBar] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState("");
  const [snackbarType, setSnackBarType] = useState("message");

  const handleClose = () => {
    setSnackBar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/transactions", formData);

      setSnackBarMessage("transaction added successfully");
      setSnackBar(true);
      setSnackBarType("success");
      setFormData({
        date: null,
        amount: "",
        category: "",
        description: "",
        email: "",
      });
    } catch (error) {
      setSnackBarMessage("Error adding transaction");
      setSnackBar(true);
      setSnackBarType("error");
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <Box className="big-box" sx={{ flexGrow: 1, paddingTop: "100px" }}>
      <Grid className="big-grid" container justifyContent="center">
        <Item className="itemmmsss" sx={{ padding: "33px 33px 33px 33px" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              required
              type="date"
              variant="outlined"
              value={formData.date || ""}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              sx={{ width: "400px", marginBottom: 2 }}
            />
            <TextField
              required
              label="Amount"
              variant="outlined"
              value={formData.amount || ""}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              sx={{ width: "100%", marginBottom: 2 }}
            />

            <TextField
              required
              select
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              variant="outlined"
              sx={{ width: "100%", marginBottom: 2, textAlign:'left' }}
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              label="Description"
              variant="outlined"
              value={formData.description || ""}
              multiline
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              sx={{ width: "100%", marginBottom: 2 }}
            />
            <TextField
              required
              type="email"
              label="email"
              variant="outlined"
              value={formData.email || ""}
              multiline
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              sx={{ width: "100%", marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Item>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity={snackbarType}
          onClose={handleClose}
          style={{ whiteSpace: "pre-line" }}
        >
          <AlertTitle>{snackbarType}</AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TransactionForm;
