import { faFacebookF, faGooglePlus, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFax, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Footer = () => {
    return (
        <Box className="footer-bg">
            <Container sx={{pt:8,pb:5, color:'white'}}>
            <Grid container spacing={4}>
                <Grid sx={{textAlign:'justify'}} item xs={12} sm={8} md={4}>
                    <Typography variant='h4' sx={{fontWeight:700, pb:3, color:"#E5890A"}}>
                        Car's World
                    </Typography>
                    <Typography variant='caption'>
                    At Car's world, our commitment to innovation and iconic customer experiences have made us the nation’s largest retailer of used cars. As the original disruptor of the automotive industry, our “no-haggle” prices transformed car buying and selling from a stressful, dreaded event into the honest, straightforward experience all people deserve.
                    </Typography>
                </Grid>
                <Grid sx={{pl:8}} item xs={12} sm={6} md={3}>
                    <Typography variant='h6' sx={{fontWeight:600, pb:3, pt:1}}>
                        Contract Info
                    </Typography>
                    <Box>
                    <Typography sx={{display:'flex', alignItems:'center'}} variant='subtitle'>
                        <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                    <Box  sx={{ml:1}}>Dhaka, Bangladesh</Box>
                    </Typography>
                    <Typography sx={{display:'flex', alignItems:'center', mt:1}} variant='subtitle'>
                        <span><FontAwesomeIcon icon={faEnvelope} /></span>
                            <Box  sx={{ml:1}}>Rashidul.karim7@gmail.com</Box>
                    </Typography>
                    <Typography sx={{display:'flex', alignItems:'center', mt:1}} variant='subtitle'>
                        <span><FontAwesomeIcon icon={faPhoneAlt} /></span>
                            <Box  sx={{ml:1}}>+88 01915555256</Box>
                    </Typography>
                    <Typography sx={{display:'flex', alignItems:'center', mt:1}} variant='subtitle'>
                        <span><FontAwesomeIcon icon={faFax} /></span>
                            <Box  sx={{ml:1}}>+458 9843 324</Box>
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                    <Typography variant='h6' sx={{fontWeight:700, pb:3, pt:1}}>
                        Useful Links
                    </Typography>
                    <Box>
                    <Typography variant='subtitle2'>
                        >   <Box  sx={{ml:2, display:'inline-block'}}>Home</Box> 
                    </Typography>
                    </Box>
                    <Box>
                    <Typography variant='subtitle2'>
                        >   <Box  sx={{ml:2, display:'inline-block'}}>Contact Us</Box> 
                    </Typography>
                    </Box>
                    <Box>
                    <Typography variant='subtitle2'>
                        >   <Box  sx={{ml:2, display:'inline-block'}}>About Us</Box> 
                    </Typography>
                    </Box>
                    <Box>
                    <Typography variant='subtitle2'>
                        >   <Box  sx={{ml:2, display:'inline-block'}}>Services</Box> 
                    </Typography>
                    </Box>
                    <Box>
                    <Typography variant='subtitle2'>
                        >   <Box  sx={{ml:2, display:'inline-block'}}>Car listing</Box> 
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <Typography variant='h6' sx={{fontWeight:700, pb:3, pt:1}}>
                        Subscribe
                    </Typography>
                <Typography variant='subtitle'>
                    At Car's world, our commitment to innovation and iconic customer experiences.
                </Typography>
                <TextField id="outlined-basic" label="Email Address" variant="filled" sx={{bgcolor:'white', mt:2, width:1}} size="small" />
                <Button sx={{mt:1}} variant='contained'>Submit</Button>
                </Grid>
            </Grid>
            </Container>
            <Container sx={{color:'white', mb:3}}>
            <Box sx={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
                <Box sx={{pt:2}}>
                <Typography variant="subtitle2">
                    &copy; All Right Reserved By Rashidul Karim
                </Typography>
                </Box>
                <Box sx={{pt:2}}>
                    <span><FontAwesomeIcon style={{fontSize:20, paddingRight: 15, cursor:'pointer', color:'#0F52BA'}} icon={faFacebookF} /></span>
                    <span><FontAwesomeIcon style={{fontSize:20, paddingRight: 15, cursor:'pointer', color:"#2F86A6"}} icon={faTwitter} /></span>
                    <span><FontAwesomeIcon style={{fontSize:20, paddingRight: 15, cursor:'pointer', color:'#FF3F00'}} icon={faYoutube} /></span>
                    <span><FontAwesomeIcon style={{fontSize:20, paddingRight: 15, cursor:'pointer', color:'#FF0000'}} icon={faGooglePlus} /></span>
                </Box>
            </Box>
            </Container>
        </Box>
    );
};

export default Footer;