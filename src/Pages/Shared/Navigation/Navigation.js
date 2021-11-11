import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
const Navigation = () => {
    const {user, logOut} = useAuth();
    
    return (
         <Box sx={{ flexGrow: 1}}>
         <AppBar position="static">
           <Toolbar>
             <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{ mr: 2 }}
             >
               <MenuIcon />
             </IconButton>
             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               Car's World
             </Typography>
             <Button  color="inherit"><Link  to='/home' style={{textDecoration:'none', color:'white'}}>Home</Link></Button>
             <Button color="inherit"><Link  style={{textDecoration:'none', color:'white'}} to='/allProducts'>All Products</Link></Button>
             {
               user.email ? 
               <>
               <Button color="inherit"><Link  style={{textDecoration:'none', color:'white'}} to='/dashboard'>DashBoard</Link></Button> 
               <Button color="inherit">{user.displayName}</Button> 
               <Button color="inherit"><Link style={{textDecoration:'none', color:'white'}} to='' onClick={logOut} >LogOut</Link></Button>
               </> :<Button color="inherit"><Link  style={{textDecoration:'none', color:'white'}} to='/login'>Login</Link></Button>
             }
           </Toolbar>
         </AppBar>
       </Box>
    );
};

export default Navigation;