import { Grid } from '@mui/material';
import React from 'react';
import {
    Link, Route, Switch, useRouteMatch
} from "react-router-dom";
import AddProduct from '../AddProduct/AddProduct';
import AddReview from '../AddReview/AddReview';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import ManageAllOrder from '../ManageAllOrder/ManageAllOrder';
import ManageProduct from '../ManageProduct/ManageProduct';
import MyOrder from '../MyOrder/MyOrder';
import Pay from '../Pay/Pay';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                    <ul>
                        <li><Link to={`${url}/pay`}>Pay</Link></li>
                        <li><Link to={`${url}/myOrder`}>My Order</Link></li>
                        <li><Link to={`${url}/addReview`}>Review</Link></li>
                        <li><Link to={`${url}/manageAllOrders`}>Manage All Orders</Link></li>
                        <li><Link to={`${url}/addProduct`}>Add A Product</Link></li>
                        <li><Link to={`${url}/manageProduct`}>Manage Product</Link></li>
                        <li><Link to={`${url}/makeAdmin`}>Make Admin</Link></li>
                        <li><Link to=''>LogOut</Link></li>
                    </ul>
            </Grid>
            <Grid item xs={9}>
            <Switch>
                <Route exact path={path}>
                <h3>Welcome to dashboard</h3>
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
            </Grid>
        </Grid>
    );
};

export default Dashboard;