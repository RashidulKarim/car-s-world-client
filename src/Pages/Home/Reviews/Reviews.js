import { Container, Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import bg from '../../../images/reviewBg.jpg';
import Review from '../Review/Review';
SwiperCore.use([Navigation, Autoplay, Pagination]);


const Reviews = () => {
    const [reviews, retReviews] = useState([]);

  useEffect(()=>{
      fetch('https://enigmatic-ocean-15470.herokuapp.com/reviews')
      .then(res => res.json())
      .then(data => retReviews(data)
      )
  },[])
  
  if(reviews.length===0){
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
        <Box sx={{backgroundImage: `url(${bg})`, backgroundSize:'cover', py:8}}>
            <Box sx={{textAlign:'center'}}>
                <Typography sx={{fontSize:{xs: 25, sm: 30, md:35, lg: 40}, fontWeight:700, color:'white', pt:5}}>
                    OUR TESTIMONIAL
                </Typography>
                <Typography sx={{maxWidth:{xs:300, sm:350, md:750}, marginX:'auto', fontWeight:'400', fontSize:{xs: 10, sm: 14, md:16, lg: 16}, color:'white'}}>
                    We always believe that customer is king. We care our customer and also our customer care us. 
                </Typography>
            </Box>
            <Box sx={{mt:2}}>
            <Container>
            <Grid container spacing={2}>
                    <Swiper
                    breakpoints={{
                        "640": {
                          "slidesPerView": 2,
                          "spaceBetween": 20
                        },
                        "768": {
                          "slidesPerView": 2,
                          "spaceBetween": 30
                        },
                        "1024": {
                          "slidesPerView": 3,
                          "spaceBetween": 40
                        }
                      }}
                    autoplay={true}
                    pagination={true}
                    navigation={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    >
                        
                        {
                        reviews.map((review) => <SwiperSlide key={review._id}><Review review={review}></Review></SwiperSlide>)
                    }
                    
                    </Swiper>
                    </Grid>
            </Container>
            </Box>
        </Box>
    );
};

export default Reviews;