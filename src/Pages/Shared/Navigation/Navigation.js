import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navigation = () => {
    const {user, logOut} = useAuth();
    
    const theme = useTheme();
  const useStyle = makeStyles({
  navIcon: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }},
  navItem:{
      [theme.breakpoints.down('md')]: {
        display: 'none' 
      }
    },
    drawerSize:{
      [theme.breakpoints.down('sm')]: {
        width: 180
      },
      [theme.breakpoints.up('sm')]: {
        width: 200
      },
    },
    nameFont:{
      [theme.breakpoints.down('sm')]: {
        fontSize: 18
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: 30
      }
    }
})
const {navIcon, navItem,drawerSize, nameFont} = useStyle();

const [state, setState] = React.useState(false);

    return (
         <>
         <Box sx={{ flexGrow: 1}}>
         <AppBar position="fixed" sx={{bgcolor:'white', color:"black"}}>
           <Toolbar>
             <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{ mr: 2 }}
               className={navIcon}
               onClick={()=>setState(true)}
             >
               <MenuIcon />
             </IconButton>
             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               <Link className={nameFont} to="/" style={{textDecoration:"none", fontWeight:700, fontFamily:'ArialBlack', color:"black"}}>Car's World</Link>
             </Typography>
             <Box className={navItem}>
                <Button  color="inherit"><Link  to='/home' style={{textDecoration:'none', color:'black'}}>Home</Link></Button>
                <Button color="inherit"><Link  style={{textDecoration:'none', color:'black'}} to='/allProducts'>All Products</Link></Button>
                {
                  user.displayName && <Button color="inherit"><Link style={{textDecoration:'none', color:'black'}} to='/dashboard' >{user.displayName}</Link></Button>
                }
                {
                  user.email ? 
                  <>
                  <Button color="inherit"><Link  style={{textDecoration:'none', color:'black'}} to='/dashboard'>DashBoard</Link></Button>  
                  <Button color="inherit"><Link style={{textDecoration:'none', color:'black'}} to='' onClick={logOut} >LogOut</Link></Button>
                  </> :<Button color="inherit"><Link  style={{textDecoration:'none', color:'black'}} to='/login'>Login</Link></Button>
                }
             </Box>
           </Toolbar>
         </AppBar>
       </Box>
          <div>
              <Drawer
              open={state}
              onClose={()=>setState(false)}
              >
                <Box
                className={drawerSize}
                role="presentation">
                <List>
                    <ListItem button >
                      <ListItemText><Button  color="inherit"><Link  to='/home' style={{textDecoration:'none', color:'black'}}>Home</Link></Button></ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button >
                      <ListItemText> <Button color="inherit"><Link  style={{textDecoration:'none', color:'black'}} to='/allProducts'>All Products</Link></Button> </ListItemText>
                    </ListItem>
                    <Divider />
                    {
                    user.email ? 
                    <>
                    <ListItem button >
                    <ListItemText><Button  color="inherit"><Link  style={{textDecoration:'none', color:'black'}} to='/dashboard'>DashBoard</Link></Button></ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button >
                    <ListItemText><Button color="inherit">{user.displayName}</Button></ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button >
                    <ListItemText><Button  color="inherit"><Link style={{textDecoration:'none', color:'black'}} to='' onClick={logOut} >LogOut</Link></Button></ListItemText>
                    </ListItem>
                    <Divider />
                    </>:
                    <>
                    <ListItem button >
                    <ListItemText><Button  color="inherit"><Link  style={{textDecoration:'none', color:'black'}} to='/login'>Login</Link></Button></ListItemText>
                    </ListItem>
                    <Divider />
                    </>
                    }
                </List>
            </Box>
              </Drawer>
        </div>
         </>
    );
};

export default Navigation;