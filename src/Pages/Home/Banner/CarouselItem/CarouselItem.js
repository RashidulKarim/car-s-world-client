import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const CarouselItem = (props) => {
    return (
        <Box>
            <Paper sx={{height:{xs: 250,sm: 350, md:600}}} style={{backgroundImage:`url(${props?.item?.img})`, backgroundPosition:'center', backgroundSize:'100vw', backgroundRepeat:'no-repeat'}}>
            <Box sx={{display:'flex',flexDirection:"column", justifyContent:'center', alignItems:'center', height:1}}>
                <Typography sx={{color:'white', fontWeight:'700', fontSize:{xs: 20, sm: 30, md:45, lg: 60}}}>
                {props.item.name}
                </Typography>
                <Typography sx={{color:'white', fontWeight:'500', fontSize:{xs: 8, sm: 12, md:15, lg: 18}, maxWidth:{xs:200, sm:250, md:400, lg:500}, textAlign:"center"}}>
                {props.item.description}
                </Typography>
            <p></p>
            <Button variant='contained'>
            <Link style={{textDecoration:"none", color:"white"}} to='/allProducts'><Box sx={{fontSize:{xs:6, sm:10, md:12, lg:14}}}>Find More</Box></Link>
            </Button>
            </Box>
        </Paper>
        </Box>
    );
};

export default CarouselItem;