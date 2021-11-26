import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckOutForm';

const stripePromise = loadStripe('pk_test_51IeOhPGcru3mCo7NjNTrWo26r4c2BRYWcLLEKH7RsAMD00QVltDuovReht95Ze48is3gj0kZOvNh9Y3eoIoDkvUn00p0tEMElC');

const Pay = () => {
    const [clientSecret, setClientSecret] = useState('')
    const [product, setProduct] = useState();
    const {id} = useParams();
    console.log(product)
    
    useEffect(()=>{
        fetch(`https://cars-world-server.herokuapp.com/order?id=${id}`)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            })
    },[id]) 
    console.log(product)
    
    useEffect(()=>{
        if(product?.carPrice){
            fetch('https://cars-world-server.herokuapp.com/create-payment-intent', {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => setClientSecret(data)
        )
        }
    },[product])
    
    if(product === undefined){
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

    
    return (
        <Box sx={{width:1, height:"350px", display:'flex', justifyContent:'center', alignItems:'center'}}>
            
            <Box sx={{ width: 400 }}>
           {
               clientSecret && 
               <Elements stripe={stripePromise}>
                   <div style={{textAlign:'center'}}>
                   <h2 style={{marginBottom:'0px'}}>Payment for <span style={{color:'orange'}}>{product.carModel}</span></h2>
                   <h4 style={{marginTop:'5px'}}>Payment Amount: ${product.carPrice}</h4>
                   </div>
                    <CheckoutForm product={product} clientSecret={clientSecret}></CheckoutForm>
                </Elements>
           }
            </Box>
            </Box>
    );
};

export default Pay;