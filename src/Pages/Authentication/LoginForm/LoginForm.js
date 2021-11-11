import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';

const LoginForm = ({isRegister, method, message}) => {
    const [isPasswordMatched, setIsPasswordMatched] = useState(false)
    const history = useHistory()
    
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
            method(data.email, data.password)
        }
        reset()
      }; 
    
    return (
        <Box>
            <Typography style={{margin:'10px 50px', fontWeight:'700'}} variant='h4'>
                {isRegister ? "Please Register" : "Please Login" }
            </Typography>
            {isPasswordMatched && <Alert sx={{ml:5}} severity="error">Password and confirm password didn't matched</Alert>}
            {message && <Alert sx={{ml:5}} severity="error">{message}</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
            {
                isRegister && <><TextField style={{width:"75%", margin:'20px 50px'}} {...register("name", { required: true })}  label="Full Name" variant="outlined" />
                {errors.name && <span style={{width:"75%", margin:'20px 50px', color:'red'}}>This field is required</span>} </>
            }
            <TextField type="email" style={{width:"75%", margin:'20px 50px'}} {...register("email", { required: true })}  label="Email" variant="outlined" />
            {errors.email && <span style={{width:"75%", margin:'20px 50px', color:'red'}}>This field is required</span>} <br />
            <TextField type='password' style={{width:"75%", margin:'20px 50px'}} {...register("password", { required: true })} label="Password" variant="outlined" />
            {errors.password && <span style={{width:"75%", margin:'20px 50px', color:'red'}}>This field is required</span>} <br />
            {
                isRegister && <><TextField style={{width:"75%", margin:'20px 50px'}} {...register("password2", { required: true })} type="password" label="Confirm your password" variant="outlined" />
                {errors.password2 && <span style={{width:"75%", margin:'20px 50px', color:'red'}}>This field is required</span>} </>
            }
            <Button style={{width:"75%", margin:'20px 50px'}} variant='contained' type='submit'>{isRegister? "Register": "Login"}</Button>
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