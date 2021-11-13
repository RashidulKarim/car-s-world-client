import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageLink, setImageLink] = useState('')
    const [warning, setWarning] = useState('')
    const [successMessage, setSuccessMassage] = useState('')
  const onSubmit = data => {
    if(imageLink){
        data.image = imageLink
        axios.post('http://localhost:5000/addProduct',{
            body: data
        })
        .then(res => {
            if(res.data.insertedId){
                setSuccessMassage("Product is uploaded successfully.")
                reset()
                setWarning("")
                setImageLink('')
            }}
        )
        
        
    }
    else{
        setWarning("Please Upload a Image")
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
            setSuccessMassage("Upload Complete")
        }
        )      
        }  
    }

    return (
        <Box sx={{textAlign:'center',mt:8}}>
            <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
            <Typography variant='h5' sx={{fontWeight:700}}>
                Add Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>

                    <TextField sx={{width:{xs: '60%', md:'20%'}}} {...register("name", { required: true })} label="Name" variant="standard" /> <br />
                    {errors.name && <span>This field is required</span>} <br />
                    <TextField sx={{width:{xs: '60%', md:'20%', mt:1}}} {...register("price", { required: true })} label="Price" variant="standard" /> <br />
                    {errors.price && <span>This field is required</span>} <br />
                    <TextField sx={{width:{xs: '60%', md:'20%'}, mb:2}} onInput={handleImageSubmit}  {...register("image")} label="Image" type='file' variant="standard" /> <br />
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

export default AddProduct;