import AppsIcon from '@mui/icons-material/Apps';
import { Box, Typography, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import {
    Link, Route, Switch, useRouteMatch
} from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import AddProduct from '../AddProduct/AddProduct';
import AddReview from '../AddReview/AddReview';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import ManageAllOrder from '../ManageAllOrder/ManageAllOrder';
import ManageProduct from '../ManageProduct/ManageProduct';
import MyOrder from '../MyOrder/MyOrder';
import Pay from '../Pay/Pay';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    const [state, setState] = React.useState(false);
    const {logOut, user} = useAuth();
    const [userInfo, setUserInfo] = useState({})
    const theme = useTheme()
    const useStyle = makeStyles({
        navItemColor:{
            [theme.breakpoints.down('sm')]: {
                color: 'black',
                textDecoration:'none',
              },
              [theme.breakpoints.up('sm')]: {
                color: 'white',
                textDecoration:'none',
              }
        },
        liStyle:{
            marginBottom: '5px',
            paddingBottom: '5px',
            borderBottom: '2px solid gray'
        },
        navItemNone:{
            [theme.breakpoints.down('sm')]: {
                display:"none"
              },
        },
        navIcon: {
            [theme.breakpoints.up('sm')]: {
              display: 'none'
            }},
        drawerSize:{
              [theme.breakpoints.down('sm')]: {
                width: 180
              },
              [theme.breakpoints.up('sm')]: {
                width: 200
              }},
        dashboardMenuIcon:{
              [theme.breakpoints.down('sm')]: {
                display:'block',
                position: "fixed"
                
              },
              [theme.breakpoints.up('sm')]: {
                display:'none'
              }
            },
            menuRight:{
                [theme.breakpoints.down('sm')]: {
                    flexDirection:'row-reverse'
                  }
            }
        }) 
    const {navItemColor, liStyle, navItemNone, navIcon
        ,drawerSize,dashboardMenuIcon, menuRight} = useStyle();
    useEffect(()=>{
        fetch(`https://blooming-lake-58192.herokuapp.com/users?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
            setUserInfo(data)
        })
    },[user.email])
    
    return (
        <Box className={menuRight} style={{paddingBottom:"0px"}} sx={{mt:8, pb:3 ,minHeight:'500px', display:"flex", width:"100%"}}>
            <Box className={dashboardMenuIcon}>
            <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               className={navIcon}
               onClick={()=>setState(true)}
             >
                 <AppsIcon/>
             </IconButton>
            </Box>
            <Box className={navItemNone} sx={{background: "#222D31", width:'190px', pt:'20px'}}>
                    <ul style={{listStyleType:'none', padding:"0px 20px"}}>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}`}>Dashboard</Link></li>
                        {
                            userInfo.role=== 'user' && 
                            <>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/pay`}>Pay</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/myOrder`}>My Order</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/addReview`}>Add Review</Link></li>
                            </>
                        }
                        {
                            userInfo.role === "admin" && 
                            <>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/manageAllOrders`}>Manage All Orders</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/addProduct`}>Add A Product</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/manageProduct`}>Manage Product</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/makeAdmin`}>Make Admin</Link></li>
                            </>
                        }
                        <li className={liStyle}><Link className={navItemColor} to='' onClick={logOut}>LogOut</Link></li>
                    </ul>
            </Box>
            <Box sx={{flexGrow:1, overflowX:{xs:'auto', md:'none'},borderTop:'2px solid gray'}}>
            <Switch>
                <Route exact path={path}>
                    <Typography sx={{textAlign:'center', mt:5, mb:8}} variant='h4' >
                    <span style={{fontWeight:500}}> {user.displayName} </span> Welcome to dashboard
                    </Typography>
                    <Box>
                    {userInfo.role === "admin"?  <>
                            <Typography sx={{width: '300px', textAlign:'center', fontWeight:600}} variant='h6'>
                                As a Admin, Here You can:
                            </Typography>
                            <ul>
                                <li
                                >Manage all of orders. You can change the status of order.</li>
                                <li>Add a product which is dynamically show on products page. </li>
                                <li>Manage all of your products and if needed you can delete product which is dynamically remove from products page.</li>
                                <li>You can also make a user as a admin. so that the user can enjoy admin feature.</li>
                            </ul>
                                </>
                                : 
                            <>
                                <Typography variant='h6' sx={{ width: '300px', textAlign:'center', fontWeight:600}}>
                                    As a user, Here You can:
                                </Typography>
                                <ul>
                                <li>Get all of yours order information. also get the updated status of your product</li>
                                <li>You can give a review which  is dynamically show on testimonial section on home page.</li>
                                </ul>
                            </>
                    
                        }
                    </Box>
                
                </Route>
                <Route path={`${path}/pay`}>
                    <Pay></Pay>
                </Route>
                <Route path={`${path}/myOrder`}>
                    <MyOrder></MyOrder>
                </Route>
                <Route path={`${path}/addReview`}>
                    <AddReview></AddReview>
                </Route>
                <Route path={`${path}/manageAllOrders`}>
                    <ManageAllOrder></ManageAllOrder>
                </Route>
                <Route path={`${path}/addProduct`}>
                    <AddProduct></AddProduct>
                </Route>
                <Route path={`${path}/manageProduct`}>
                    <ManageProduct></ManageProduct>
                </Route>
                <Route path={`${path}/makeAdmin`}>
                    <MakeAdmin></MakeAdmin>
                </Route>
            </Switch>
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
                <ul style={{listStyleType:'none', padding:"0px 20px"}}>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}`}>Dashboard</Link></li>
                        {
                            userInfo.role=== 'user' && 
                            <>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/pay`}>Pay</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/myOrder`}>My Order</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/addReview`}>Add Review</Link></li>
                            </>
                        }
                        {
                            userInfo.role === "admin" && 
                            <>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/manageAllOrders`}>Manage All Orders</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/addProduct`}>Add A Product</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/manageProduct`}>Manage Product</Link></li>
                        <li className={liStyle}><Link className={navItemColor} to={`${url}/makeAdmin`}>Make Admin</Link></li>
                            </>
                        }
                        <li className={liStyle}><Link className={navItemColor} to='' onClick={logOut}>LogOut</Link></li>
                    </ul>
                </List>
            </Box>
              </Drawer>
        </div>
        </Box>
    );
};

export default Dashboard;