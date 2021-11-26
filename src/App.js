import { Box } from '@mui/system';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import AllProducts from './Pages/AllProducts/AllProducts/AllProducts';
import Login from './Pages/Authentication/Login/Login';
import Register from './Pages/Authentication/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import Pay from './Pages/Dashboard/Pay/Pay';
import Booking from './Pages/Home/Booking/Booking';
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Pages/Shared/Footer/Footer';
import Navigation from './Pages/Shared/Navigation/Navigation';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <Box sx={{display:'flex', flexDirection: 'column', minHeight: "100vh"}}>
      <AuthProvider>
     <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <Navigation/>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/home'>
              <Home/>
            </Route>
            <Route path='/allProducts'>
              <AllProducts/>
              </Route>
            <Route path='/login'>
              <Login/>
              </Route>
            <Route path='/register'>
              <Register/>
              </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard/>
              </PrivateRoute>
            <PrivateRoute path='/pay/:id'>
              <Pay></Pay>
              </PrivateRoute>
            <PrivateRoute path='/product/:id'>
              <Booking></Booking>
              </PrivateRoute>
            <Route path='*'>
              <NotFound/>
              </Route>
          </Switch>
        </Box>
     <Footer/>
     </BrowserRouter>
     </AuthProvider>
    </Box>
  );
}

export default App;
