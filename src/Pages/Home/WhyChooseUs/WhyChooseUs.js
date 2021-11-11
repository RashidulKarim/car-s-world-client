import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import offer from '../../../images/png/001-money.png';
import secured from '../../../images/png/002-shield.png';
import trusted from '../../../images/png/003-handshake.png';
import support from '../../../images/png/004-customer-service.png';
const benefits = [
    {
        name:'Highly Secured',
        description: "We are Highly Secured. We used worlds best technology to keep our customer data private. we also used most advance payment method.We are Highly Secured. We used worlds best technology to keep our customer data private. we also used most advance payment method.We are Highly Secured. We used worlds best technology to keep our customer data private. we also used most advance payment method.",
        img: secured
    },
    {
        name:'Trusted Agents',
        description:"We are dealers of several world famous car's brand. So our products are genuine and original. We also provides guarantee of products.We are dealers of several world famous car's brand. So our products are genuine and original. We also provides guarantee of products.We are dealers of several world famous car's brand. So our products are genuine and original. We also provides guarantee of products & guarantee of service. ",
        img: trusted
    },
    {
        name:'Get An Offer',
        description:"We provides markets best price and we also give our customer EMI facilities so that they can fullfil their dreams. Also we provide discount.We provides markets best price and we also give our customer EMI facilities so that they can fullfil their dreams. Also we provide discount.We provides markets best price and we also give our customer EMI facilities so that they can fullfil their dreams. Also we provide discount.",
        img:offer
    },
    {
        name:'Free Support',
        description:"We provides free support to our customer up to 2 years. Our customer can extends support facilities for some money. We believe in our customer.We provides free support to our customer up to 2 years. Our customer can extends support facilities for some money. We believe in our customer.We provides free support to our customer up to 2 years. Our customer can extends support facilities for some money. We believe in our customer.",
        img: support
    }
]
const WhyChooseUs = () => {
    return (
            <Container>
                <Box sx={{my:8}}>
                <Box sx={{textAlign:'center'}}>
                <Typography sx={{fontSize:{xs: 25, sm: 30, md:35, lg: 40}, fontWeight:700, color:'#3DB2FF'}}>
                    WE ARE THE BEST
                </Typography>
                <Typography sx={{maxWidth:{xs:300, sm:350, md:750}, marginX:'auto', fontWeight:'500', fontSize:{xs: 10, sm: 14, md:18, lg: 20}, color:'text.secondary'}}>
                    We are best for our genuine products & Best Customer Service& Best Price.
                </Typography>
                </Box>
                <Grid container spacing={4} sx={{mt:5}}>
                    {
                        benefits.map((benefit, i) => <Grid key={i} item xs={12} sm={6} md={3}>
                        <Card sx={{ maxWidth: 310, mx:'auto', ":hover":{backgroundColor:'#716F81', color:'white'}}} >
                  <Box>
                  <CardMedia
                    component="img"
                    style={{width:'80px', margin:'25px auto 25px', border:'2px dashed #ffb400', padding: '20px', borderRadius:'50%'}}
                    image={benefit.img}
                  />
                  </Box>
                  <CardContent>
                        <Typography sx={{fontSize:25, textAlign:'center', color:'#ff9800'}}>
                                {benefit.name}
                        </Typography>
                        <Typography sx={{fontSize:12, mt:2, textAlign:'justify'}}>
                                {benefit.description}
                        </Typography>
                  </CardContent>
                </Card>
                    </Grid>
                        )
                    }
                </Grid>
        </Box>
            </Container>
    );
};

export default WhyChooseUs;