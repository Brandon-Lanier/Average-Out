import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Portfolio from '../Portfolio/Portfolio';
import Market from '../Market/Market';
import Details from '../Details/Details';
import AddCoin from '../AddCoin/AddCoin';
import Calculate from '../Calculate/Calculate';
import Results from '../Results/Results';
import EditCoin from '../EditCoin/EditCoin'
import ActiveOrders from '../ActiveOrders/ActiveOrders';
import OrderDetails from '../OrderDetails/OrderDetails';
import Scenarios from '../Scenarios/Scenarios';
import AboutPage2 from '../AboutPage2/AboutPage2'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';


function App() {

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {user.id && <Nav />}

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>


          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/portfolio" />
              :
              // Otherwise, show the login page
              <LoginPage /> // switched this from landing page
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/portfolio" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/portfolio" /> // switched from user
              :
              // Otherwise, show the Landing page
              <LoginPage />
            }
          </Route>
          <ProtectedRoute path="/portfolio" exact>
            <Portfolio />
          </ProtectedRoute>
          <ProtectedRoute path="/market" exact>
            <Market />
          </ProtectedRoute>
          <ProtectedRoute path="/details/:coinid" exact>
            <Details />
          </ProtectedRoute>
          <ProtectedRoute path="/addcoin/:coinid" exact>
            <AddCoin />
          </ProtectedRoute>
          <ProtectedRoute path="/calculate" exact>
            <Calculate />
          </ProtectedRoute>
          <ProtectedRoute path="/results" exact>
            <Results />
          </ProtectedRoute>
          <ProtectedRoute path="/active" exact>
            <ActiveOrders />
          </ProtectedRoute>
          <ProtectedRoute path="/orders/details/:id" exact>
            <OrderDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path="/scenarios" >
            <Scenarios />
          </ProtectedRoute>
          <ProtectedRoute exact path="/about2" >
            <AboutPage2 />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
