import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateUserPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const {provider,contract}=useAuth();
  const navigate=useNavigate();
  const {account}=useAuth();
  useEffect(()=>{
    if(!account){
      navigate("/");
    }},[]);
  const handleSubmit = async () => {
    try {
      const out = await contract.createUser(username);
      console.log("Created User:",out);
      navigate("/home");
    } catch (err) {
        console.log(err);
    }

    console.log('Username:', username);
    // Implement submission logic here
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
        padding: 2,
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="h4">Create User</Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{width: '50%'}}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default CreateUserPage;
