import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


const MyOrder = () => {
    const [deleteMessage, setDeleteMessage] = useState('')
    const [orders, setOrders] = useState([])
    const {user} = useAuth();    
    useEffect(()=>{
        axios.get(`https://cars-world-server.herokuapp.com/orders?email=${user.email}`)
        .then(data => setOrders(data.data))
    },[user.email])

    const handleDelete = (id) => {
        setDeleteMessage("")
        const confirmation = window.confirm("Do you want to Delete?")
        if(confirmation){
            fetch(`https://cars-world-server.herokuapp.com/order?id=${id}`,{
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount>0){
                const remainingItem = orders.filter(product => product._id !== id)
                setOrders(remainingItem)
                setDeleteMessage("Order Cancel successfully.")
            }else{
                setDeleteMessage("")
            }
        })
        }
    }
    if(orders.length===0){
        return (
            <Box sx={{width:1, height:"500px", display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Box sx={{ width: 400 }}>
              <Typography variant="h4" sx={{fontWeight:600}}>
                  Sorry, No Order found
              </Typography>
            </Box>
            </Box>
          );
    }
    return (
        <Box>
        <Typography variant='h4' sx={{fontWeight:700, py:3, textAlign:'center'}}>
            My Orders
        </Typography>
        <TableContainer sx={{mb:5, maxWidth:'850px', mx:'auto'}} component={Paper}>
        {
                        deleteMessage && <Alert sx={{mx:'auto',my:1}}  severity="success">{deleteMessage}</Alert>
                    }
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Car Model</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Cancel Order</TableCell>
        <TableCell>Make Payment</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {orders.map((order) => (
        <TableRow
          key={order._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {order.name}
          </TableCell>
          <TableCell>{order.email}</TableCell>
          <TableCell>{order.carModel}</TableCell>
          <TableCell>${order.carPrice}</TableCell>
          <TableCell>{order.date}</TableCell>
          <TableCell sx={{color: 'green', fontWeight: 700}}>{order.status}</TableCell>
          <TableCell><FontAwesomeIcon onClick={()=>handleDelete(order._id)} style={{color:'red', fontSize:'20px',paddingLeft:'20px', cursor:'pointer'}} icon={faTrashAlt} /></TableCell>
          <TableCell>
            {
              order.payment ? <Button variant='contained' disabled>paid</Button>: <Link to={`/pay/${order._id}`} style={{textDecoration:'none'}}><Button variant='contained'>Pay</Button></Link>
            }
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </Box>
    );
};

export default MyOrder;