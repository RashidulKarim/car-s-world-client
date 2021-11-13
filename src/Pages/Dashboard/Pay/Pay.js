import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Pay = () => {
    return (
        <Box sx={{width:1, height:"350px", display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Box sx={{ width: 400 }}>
              <Typography variant="h4" sx={{fontWeight:600}}>
                  Pay is coming soon
              </Typography>
            </Box>
            </Box>
    );
};

export default Pay;