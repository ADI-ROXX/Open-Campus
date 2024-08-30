import { Box } from '@mui/material';
import React from 'react';
import { Audio } from 'react-loader-spinner';

function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'transparent', // Optional background color for the whole page
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 150, // Circle width
          height: 150, // Circle height
          borderRadius: '50%',
          border: '6px solid #3498db', // Border color and thickness
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', // Optional shadow for a nice effect
        }}
      >
        <Audio
          height="80"
          width="80"
          color="#3498db"
          ariaLabel="loading"
          visible={true}
        />
      </Box>
    </Box>
  );
}

export default Loader;
