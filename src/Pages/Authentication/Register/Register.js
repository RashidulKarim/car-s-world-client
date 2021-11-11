import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useFirebase from '../../../hooks/useFirebase';
import login from '../../../images/login.png';
import LoginForm from '../LoginForm/LoginForm';
const Register = () => {
    const {signUp, error} = useFirebase();
    
    return (
        <Box sx={{my:5, mx:8}}>
           <Grid container style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Grid item xs={12} sx={{}} md={6}>
                   <Box>
                   <img src={login} width='100%' alt="" />
                   </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                <Box sx={{mt:5}}>
                <LoginForm method={signUp} message={error} isRegister={true}></LoginForm>
                   </Box>
                </Grid>
            </Grid>        
        </Box>
    );
};

export default Register;