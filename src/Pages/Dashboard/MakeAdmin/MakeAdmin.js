import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';

const MakeAdmin = () => {
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const emailRef = useRef('');
    const formRef = useRef()
    const handleOnBlur=(e)=>{
        const value = e.target.value
        emailRef.current.value= value;
    }

    const handleSubmit = (e) =>{
        setSuccess('')
        setError('')
        e.preventDefault()
        fetch(`https://cars-world-server.herokuapp.com/users?email=${emailRef.current.value}`,{
            method:"PUT"
        })
        .then(res => res.json())
        .then(data=> {            
            if(data.modifiedCount>0){
                setError('')
                setSuccess(`Congratulation, ${emailRef.current.value} are now admin.`)
                formRef.current.reset();
                emailRef.current.value="";
                
            }
            else if(data.matchedCount>0){
                setError('Already added as a admin.')
                setSuccess("")
            }
            else{
                setError("To make admin, you have to register first.")
                setSuccess('')
            }
        })
        .catch(err => {
            setError(err.message)
            setSuccess('')
        })
    }
    return (
        <Box sx={{width:1,my:8, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Box>
          <Typography variant="h4" sx={{fontWeight:600, textAlign:'center'}}>
              Make Admin
          </Typography>
            {
                        error && <Alert sx={{mt:1}}  severity="error">{error}</Alert>
            }
            {
                        success && <Alert sx={{mt:1}}  severity="success">{success}</Alert>
            }
          <form ref={formRef} onSubmit={handleSubmit}>
          <TextField
          onBlur={handleOnBlur}
          required
          id="outlined-required"
          label="Email"
          ref={emailRef}
          sx={{width:'300px', mt:2}}
        /> <br />
        <Button variant='contained' type='submit' sx={{mt:2, width:'300px'}}>Submit</Button>
          </form>
        </Box>
        </Box>
      );
};

export default MakeAdmin;