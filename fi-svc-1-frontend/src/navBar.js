import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar position='absolute'>
        <Toolbar sx={{justifyContent:'space-around'}}>
        <Button color="inherit" component={Link} to="/">Add an expense</Button>
          <Button color="inherit" component={Link} to="/insights">See your insights</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}