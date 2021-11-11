import { Card, CardContent, CardMedia, Grid, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
const Review = (props) => {
    const{name, image, comment, ratting, address} = props.review
      
    return (
        <Grid sx={{ml:1}} item xs={12} sm={6} md={4}>
        <Card sx={{width:{xs:320, sm: 360}, py:5, mt:3, mx:'auto', height: '380px'}}>
            <Box sx={{width:"100%"}}>
            <CardMedia
                component="img"
                style={{width:'100px',borderRadius:'50%',margin:'0px auto', height:'100px'}}
                image={image}
                alt="green iguana"
            />
            </Box>
            <CardContent sx={{py:5, textAlign:'center'}}>
                <Typography gutterBottom variant="h5" component="div">
                {name}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                {address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {comment}
                </Typography>
            </CardContent>
            <Box sx={{textAlign:"center"}}>
            <Rating  name="read-only" value={ratting} readOnly />
            </Box>
        </Card>
      </Grid>
    );
};

export default Review;