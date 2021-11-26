import { Alert, Button, Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import bookingImg from '../../../images/bookingBg.jpg';

const Booking = () => {
    const history = useHistory()
    const {user} = useAuth()
    const [product, setProduct] = useState({})
    const [successfulMessage, setSuccessfulMessage] = useState('')
    const{id} = useParams()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const date = new Date()
    if(successfulMessage){
        setTimeout(
            function() {
              history.push('/dashboard/myOrder')
            }, 5000)
    }

    const onSubmit = data => {  
        setSuccessfulMessage('')  
        const orderDetails = {date: date.toDateString(), name: data.name, email: data.email, carModel: product.name, carPrice: product.price, phone: data.phone, address:data.address ,status:'pending'}
        
        axios.post("https://cars-world-server.herokuapp.com/order",{
            orderDetails
        })
        .then(res => {
            reset()
            setSuccessfulMessage('Order placed successfully. Please complete your payment to confirm order')
        }
        )
    };


    useEffect(()=>{
        fetch(`https://cars-world-server.herokuapp.com/product?id=${id}`)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            })
    },[id])    
    if(product._id === undefined){
        return (
            <Box sx={{width:1, height:"500px", display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Box sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
            </Box>
          );
    }
    // , height:"700px"
    return (
        <Box sx={{backgroundImage:`url(${bookingImg})`, backgroundSize:"cover",backgroundPosition:"center", width:'100%', mt:8,pt:2, pb:3}}>
            <Container>
            <Grid container spacing={2} sx={{display:'flex', justifyContent:"center", alignItems:'center', color:'white',  width:'100%' }}>
                <Grid item xs={12} md={6} sx={{textAlign:'center'}}>
                    <Typography variant='h3' sx={{fontWeight:700, px:5, py:1}}>
                       Confirm Your Booking
                    </Typography>
                    <Typography variant='subtile2'>
                    No matter what device you use, booking is seamless at all times. No matter what device you use, booking is seamless at all times.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                <Box sx={{maxWidth:'300px',bgcolor:'white', color:'black', margin:{xs:'20px 0px',sm:'20px 30px', md:'20px 100px'}, padding:'20px 30px'}} >
                    {
                        successfulMessage && <Alert severity="success">{successfulMessage}</Alert>
                    }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField style={{width:"100%", margin:'10px auto'}} {...register("name", { required: true })}  label="Name" defaultValue={user?.displayName} variant="outlined" />
                    {errors.name && <span>This field is required</span>}
                    <TextField {...register("email", { required: true })} style={{width:"100%", margin:'10px auto'}} id="outlined-basic" 
                    label="Email" variant="outlined" defaultValue={user.email} />
                    {errors.email && <span>This field is required</span>}
                    <TextField {...register("carModel")} style={{width:"100%", margin:'10px auto'}} defaultValue={product.name} InputProps={{
                        readOnly: true,
                    }} id="outlined-basic" label="Car Model" variant="outlined"  />
                    <TextField {...register("carPrice")} InputProps={{
                        readOnly: true,
                    }} style={{width:"100%", margin:'10px auto'}}  defaultValue={`$ ${product.price}`} id="outlined-basic" label="Car Price" variant="outlined" />
                    <TextField {...register("phone", { required: true })} style={{width:"100%", margin:'10px auto'}} id="outlined-basic" label="Phone Number" variant="outlined"  />
                    {errors.phone && <span>This field is required</span>}
                    <TextField {...register("address", { required: true })} style={{width:"100%", margin:'10px auto'}} id="outlined-basic" label="Address" variant="outlined"  />
                    {errors.address && <span>This field is required</span>}
                    
                    <Button sx={{mb:2,mt:1, width:1}} variant='contained' type="submit">Submit</Button>
                </form>
                </Box>
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
};

export default Booking;