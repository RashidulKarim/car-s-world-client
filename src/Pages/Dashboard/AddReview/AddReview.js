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
        axios.post('http://localhost:5000/addReview',{
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
        <Box sx={{width:1, textAlign:'center', border:'2px solid gray', height:'650px' }}>
            <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', width:"100%", height:'650px'}}>
            <Typography variant='h5'>
                Add Review
            </Typography>
            <form style={{width:"500px"}} onSubmit={handleSubmit(onSubmit)}>

                    <TextField sx={{width:.5}} {...register("name", { required: true })} label="Name" variant="outlined" /> <br />
                    {errors.name && <span>This field is required</span>} <br />
                    <TextField sx={{width:.5}} {...register("address", { required: true })} label="Address" variant="outlined" /> <br />
                    {errors.address && <span>This field is required</span>} <br />
                    <TextField multiline
                    rows={4} sx={{width:.5}} width='100%' {...register("comment", { required: true })} label="Comment" variant="outlined" /> <br />
                    {errors.comment && <span>This field is required</span>} <br />
                    <TextField sx={{width:.5, mb:2}} onInput={handleImageSubmit}  {...register("image")} label="Image" type='file' id="outlined-required" focused /> 
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
                    <Button sx={{width:.5}} variant='contained' type='submit'>Submit</Button>
                    
            </form>

            </Box>
        </Box>
    );
};

export default AddReview;