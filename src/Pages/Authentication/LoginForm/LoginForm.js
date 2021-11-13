import { Alert, Button, TextField, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';

const LoginForm = ({isRegister, method, message}) => {
    const [isPasswordMatched, setIsPasswordMatched] = useState(false)
    const history = useHistory()
    const location = useLocation();
    const theme = useTheme();
    const useStyle = makeStyles({
        formField:{
            [theme.breakpoints.down('sm')]: {
                 width:"100%", margin:'10px 0px'
              },
              [theme.breakpoints.up('sm')]: {
                width:"75%", margin: "10px 0px 10px 50px"
             },
        }
    })
    const {formField} = useStyle()
    let { from } = location.state || { from: { pathname: "/dashboard" } };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();
      
      const onSubmit = (data) => {
        if(isRegister){
            if(data.password === data.password2){
                method(data.email, data.password2, data.name, history)
                setIsPasswordMatched(false)
            }else{
                setIsPasswordMatched(true)
            }
        }else{
            method(data.email, data.password, history, from)
        }
        reset()
      }; 
    
    return (
        <Box sx={{w:1}}>
            <Typography style={{width:300, margin:'20px auto', fontWeight:'700'}} variant='h4'>
                {isRegister ? "Please Register" : "Please Login" }
            </Typography>
            {isPasswordMatched && <Alert sx={{ml:5}} severity="error">Password and confirm password didn't matched</Alert>}
            {message && <Alert sx={{ml:5}} severity="error">{message}</Alert>}
            <form style={{width:"100%"}} onSubmit={handleSubmit(onSubmit)}>
            {
                isRegister && <><TextField className={formField} {...register("name", { required: true })}  label="Full Name" variant="outlined" />
                {errors.name && <span className={formField}  style={{color:'red'}}>This field is required</span>} </>
            }
            <TextField type="email" className={formField} {...register("email", { required: true })}  label="Email" variant="outlined" />
            {errors.email && <span className={formField} style={{color:'red'}}>This field is required</span>} <br />
            <TextField type='password' className={formField}  {...register("password", { required: true })} label="Password" variant="outlined" />
            {errors.password && <span className={formField} style={{color:'red'}}>This field is required</span>} <br />
            {
                isRegister && <><TextField className={formField}  {...register("password2", { required: true })} type="password" label="Confirm your password" variant="outlined" />
                {errors.password2 && <span className={formField}  style={{ color:'red'}}>This field is required</span>} </>
            }
            <Button className={formField} variant='contained' type='submit'>{isRegister? "Register": "Login"}</Button>
      </form>
      {
                isRegister ? <Typography variant='subtitle1' sx={{mt:2, textAlign:'center'}}>
                Already have an account? <Link style={{textDecoration:'none', fontWeight:'600'}} to='/login'>Login</Link>
                </Typography> : <Typography variant='subtitle1' sx={{mt:2, textAlign:'center'}}>
                Don't have an account? <Link style={{textDecoration:'none', fontWeight:'600'}} to='/register'>Register</Link>
                </Typography>
            }
        </Box>
    );
};

export default LoginForm;