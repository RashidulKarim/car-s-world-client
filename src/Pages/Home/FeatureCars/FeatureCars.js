import { Container, Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import SingleCar from '../../Shared/SingleCar/SingleCar';

const FeatureCars = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
      fetch('https://enigmatic-ocean-15470.herokuapp.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0,6))
      ).catch(err => console.log(err))
  },[])

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
        <Container>
        <Box sx={{my:5}}>
                <Box sx={{textAlign:'center'}}>
                <Typography sx={{fontSize:{xs: 25, sm: 30, md:35, lg: 40}, fontWeight:700, color:'#3DB2FF'}}>
                    FEATURED CAR
                </Typography>
                <Typography sx={{maxWidth:{xs:300, sm:350, md:750}, marginX:'auto', fontWeight:'500', fontSize:{xs: 10, sm: 14, md:18, lg: 20}, color:'text.secondary'}}>
                    We didn't sell car, we sell dream and our product is market best product.
                </Typography>
                </Box>
                <Grid container spacing={4} sx={{mt:5}}>
                    {
                        products.map((product) => <SingleCar product={product} key={product._id}></SingleCar>)
                    }
                </Grid>
        </Box>
        </Container>
    );
};

export default FeatureCars;