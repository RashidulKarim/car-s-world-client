import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({product, clientSecret}) => {
    const {user} = useAuth();
    const history = useHistory()
    const [processing, setProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setProcessing(true)
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setErrorMessage(error.message)
      setSuccess(false)
      setProcessing(false)
    } else {
      setErrorMessage("")
      setSuccess(true)
    }
    const {paymentIntent, err} = await stripe.confirmCardPayment(
        clientSecret.clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user.displayName,
              email: user.email
            },
          },
        },
      );
      if(err){
          setErrorMessage(err.message)
          setProcessing(false)
          setSuccess(false)
      }
      if(paymentIntent){
          setProcessing(false)
          setSuccess(true)
          fetch(`https://cars-world-server.herokuapp.com/orderPayment?id=${product._id}`,{
              method:'PUT',
              headers:{
                  'content-type':'application/json'
              },
              body:JSON.stringify({
                  amount: paymentIntent.amount,
                  id: paymentIntent.id,
                  status: paymentIntent.status,
                  date: new Date().toLocaleDateString()
              })
          })
          alert('Payment successful, Thank you.')
          history.push('/dashboard/myOrder')
      }
  };

  return (
    <Box style={{border:'2px solid lightGray', padding:'20px'}}>
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {
          processing ? <CircularProgress /> : <Button sx={{marginTop:'20px', marginX:'auto'}} variant='contained' type="submit" disabled={!stripe || success}>
          Pay
        </Button>
      }
      
      {
          errorMessage && <p style={{textAlign:'center', color:'red'}}>{errorMessage}</p> 
      }
      {
          success && <p style={{textAlign:'center', color:'green'}}>{success}</p> 
      }
    </form>
    </Box>
  );
};

export default CheckoutForm;