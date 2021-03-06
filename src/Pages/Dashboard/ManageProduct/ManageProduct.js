import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('https://cars-world-server.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data)
        )
    },[])

    const handleDelete = (id) => {
        const confirmation = window.confirm("Do you want to Delete?")
        if(confirmation){
            fetch(`https://cars-world-server.herokuapp.com/product?id=${id}`,{
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount>0){
                const remainingItem = products.filter(product => product._id !== id)
                setProducts(remainingItem)
            }
        })
        }
    }

    if(products.length===0){
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
        <Box>
            <Typography variant='h4' sx={{fontWeight:700, py:3, textAlign:'center'}}>
                Manage Products
            </Typography>
            <TableContainer sx={{mb:5, maxWidth:'600px', mx:"auto"}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">${product.price}</TableCell>
              <TableCell align="right"><FontAwesomeIcon onClick={()=>handleDelete(product._id)} style={{color:'red', fontSize:'20px', cursor:'pointer'}} icon={faTrashAlt} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    );
};

export default ManageProduct;