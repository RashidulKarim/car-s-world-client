import { Alert, Button, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddReview = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageLink, setImageLink] = useState('')
    const [warning, setWarning] = useState('')
    const [successMessage, setSuccessMassage] = useState('')
    const [ratting, setRatting] = useState(0)
  const onSubmit = data => {
    if(imageLink){
        if(ratting===0){
            setWarning("Please give ratting")
            setSuccessMassage('')
        }else{
        setWarning("")
        data.image = imageLink
        data.ratting = ratting
        axios.post('https://enigmatic-ocean-15470.herokuapp.com/addReview',{
            body: data
        })
        .then(res => {
            if(res.data.insertedId){
                setSuccessMassage("Thank You For Your Review.")
                reset()
                setWarning("")
                setImageLink('')
                setRatting(0)
            }}
        )
        } 
    }
    else{
        setWarning("Please Upload your image.")
        setSuccessMassage('')
    }
    
  };

    const handleImageSubmit = (e) => {  
        setImageLink('')
        setWarning("Image is uploading")
        setSuccessMassage('')
        const file = new FormData();
        if(e.target?.files[0]){
            file.append('image', (e.target?.files[0]), (e.target?.files[0])?.name)
        axios.post("https://api.imgbb.com/1/upload?key=571f6ef43e53c793167ddb2a958d51aa",file)
        .then(res => {
            setImageLink(res.data.data.display_url)
            setWarning("")
            setSuccessMassage("Image upload Complete")
        }
        )      
        }  
    }
    return (
        <Box sx={{textAlign:'center', mt:5, mb:3}}>
            <Box sx={{display:'flex',flexDirection:'column'}}>
            <Typography variant='h5' sx={{mb:2, fontWeight:700}}>
                Add Review
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>

                    <TextField sx={{width:{xs: '60%', md:'20%'}}} {...register("name", { required: true })} label="Your Name" variant="outlined" /> <br />
                    {errors.name && <span>This field is required</span>} <br />
                    <TextField sx={{width:{xs: '60%', md:'20%'}}} {...register("email", { required: true })} label="Your Email" variant="outlined" /> <br />
                    {errors.email && <span>This field is required</span>} <br />
                    <TextField multiline
                    rows={4} sx={{width:{xs: '60%', md:'20%'}}}  {...register("comment", { required: true })} label="Your Comment" variant="outlined" /> <br />
                    {errors.comment && <span>This field is required</span>} <br />
                    <TextField sx={{width:{xs: '60%', md:'20%'}, mb:2}} onInput={handleImageSubmit}  {...register("image")} label="Image" type='file' id="outlined-required" focused /> 
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', mb:1}}> 
                    <Typography component="legend">Ratting:</Typography>
                    <Rating
                        name="simple-controlled"
                        required
                        value={ratting}
                        onChange={(event, newValue) => {
                        setRatting(newValue);
                        }}
                    />
                    </Box>
                                    
                    {
                        warning && <Alert sx={{width:"200px", mx:'auto',my:1}} severity="error">{warning}</Alert>
                    }
                    
                    {
                        successMessage && <Alert sx={{width:"200px", mx:'auto',my:1}}  severity="success">{successMessage}</Alert>
                    }
                    <Button sx={{width:{xs: '60%', md:'20%'}}} variant='contained' type='submit'>Submit</Button>
                    
            </form>

            </Box>
        </Box>
    );
};

export default AddReview;