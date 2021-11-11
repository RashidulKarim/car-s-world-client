import { Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import setting from '../../../images/png/001-gear.png';
import gear from '../../../images/png/002-manual-transmission.png';
import fuel from '../../../images/png/003-gas-station.png';
import way from '../../../images/png/004-road.png';
import car from '../../../images/png/005-electric-car.png';
import calender from '../../../images/png/006-calendar.png';

const useStyles = makeStyles({
    root: {
        transition: "transform .40s ease-in-out"
      },
      cardHovered: {
        transform: "scale3d(1.02, 1.02, 1)"
      }
  });

const SingleCar = (props) => {
    const {name, price, image, _id} = props.product
    const classes = useStyles();
    const [state, setState] = useState({
      raised:false,
      shadow:1,
    })


    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 410, mx:'auto' }} className={classes.root} 
    classes={{root: state.raised ? classes.cardHovered : ""}}
    onMouseOver={()=>setState({ raised: true, shadow:3})} 
    onMouseOut={()=>setState({ raised:false, shadow:1 })} 
    raised={state.raised} zdepth={state.shadow}>
      <CardMedia
        component="img"
        height="194"
        image={image}
      />
      <CardContent>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography sx={{fontSize:20, fontWeight: 600, color:'#ffb400'}}>
                    {name?.toUpperCase()}
            </Typography>
            <Typography sx={{fontSize:20, fontWeight: 600, color:'#ffb400'}}>
                    ${price}
            </Typography>
        </Box>
        <Typography sx={{fontSize:10, mt:1, mb:2, fontWeight:600, color:'text.secondary'}}>
            NEW CAR/ AUTOMATIC/ SPORTS
        </Typography>
        <Box sx={{display:'flex', flexWrap: 'wrap'}}>
            <Typography sx={{display:'flex', alignItems:'center', mr:3}}>
                <img src={fuel} alt="" />
                <span style={{marginLeft:'5px', color:"#FFAB4C", fontSize:13, fontWeight:500}}>Petrol</span>
            </Typography>
            <Typography sx={{display:'flex', alignItems:'center', mr:3}}>
                <img src={way} alt="" />
                <span style={{marginLeft:'5px', color:"#FFAB4C", fontSize:13, fontWeight:500}}>4,000 KM</span>
            </Typography>
            <Typography sx={{display:'flex', alignItems:'center'}}>
                <img src={gear} alt="" />
                <span style={{marginLeft:'5px', color:"#FFAB4C", fontSize:13, fontWeight:500}}>Manual</span>
            </Typography>
        </Box>
        <Box sx={{display:'flex', flexWrap: 'wrap', mt:2}}>
            <Typography sx={{display:'flex', alignItems:'center', mr:3}}>
                <img src={car} alt="" />
                <span style={{marginLeft:'5px', color:"#FFAB4C", fontSize:13, fontWeight:500}}>Sport</span>
            </Typography>
            <Typography sx={{display:'flex', alignItems:'center', mr:3}}>
                <img src={setting} alt="" />
                <span style={{marginLeft:'5px', color:"#FFAB4C", fontSize:13, fontWeight:500}}>Blue</span>
            </Typography>
            <Typography sx={{display:'flex', alignItems:'center'}}>
                <img src={calender} alt="" />
                <span style={{marginLeft:'5px', color:"#FFAB4C", fontSize:13, fontWeight:500}}>2019</span>
            </Typography>
        </Box>
        <Link style={{textDecoration:'none'}}  to={`/product/${_id}`}><Button sx={{mt:2, bgcolor:'#FFAB4C'}} variant='contained'>Book Now</Button></Link>
      </CardContent>
    </Card>
        </Grid>
    );
};

export default SingleCar;