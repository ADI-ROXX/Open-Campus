import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{backgroundColor:"#000000", height:"110px"}}>
        {/* <Typography variant="h6" component="div" className="hover:cursor-pointer font-calligraphic" sx={{ flexGrow: 1 }}>
          QuickLoan
        </Typography> */}
        <p onClick={()=>navigate("/home")} className="hover:cursor-pointer font-calligraphic text-6xl flex-grow ml-[30%]">QuickLoan</p>

        <Typography color="inherit" className="hover:underline hover:cursor-pointer underline-offset-2" onClick={() => navigate('/add')}>
            <p>Add Friend</p>
        </Typography>
        <Typography color="inherit" className="pl-6 pr-6 hover:cursor-pointer hover:underline underline-offset-2" onClick={() => navigate('/quick')}>
          <p>Quick Pay</p>
        </Typography>
        <Typography color="inherit" className=" pr-8 hover:cursor-pointer hover:underline underline-offset-2" onClick={() => navigate('/db')}>
          <p>Remaining</p>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
