import React from 'react'
import {Route} from 'react-router-dom';

import Header from './layout/Header';
import Footer from './layout/Footer';
import AddPerson from './person/AddPerson';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Home from './home/Home';
import Profile from './profile/Profile';
import Flight from './flight/Flight';
import Hotel from './hotel/Hotel';
import Car from './car/Car';

//Define the routing of the webpages
const routes = [
  {
    path: '/',
    exact: true,
    header: () => <Header />,
    content: () => <Home />,
    footer: () => <Footer />
  },
  {
    path: '/person/add',
    content: () => <AddPerson />,
  },
  {
    path: '/login',
    exact: true,
    content: () => <Login />
  },
  {
    path: '/dashboard',
    exact: true,
    header: () => <Header />,
    content: () => <Dashboard />,
    footer: () => <Footer />
  },
  {
    path: '/flight',
    exact: true,
    header: () => <Header />,
    content: () => <Flight />,
    footer: () => <Footer />
  },
  {
    path: '/hotel',
    exact: true,
    header: () => <Header />,
    content: () => <Hotel />,
    footer: () => <Footer />
  },
  {
    path: '/car',
    exact: true,
    header: () => <Header />,
    content: () => <Car />,
    footer: () => <Footer />
  },
  {
    path:'/profile',
    exact: true,
    content: () => <Profile/>
  }

]

const RouterComponent = () => (
    <div>
      <div className="Header">
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.header}
          />
        ))}
      </div>

      <div className="Content">
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.content}
          />
        ))}
      </div>

      <div className="Footer">
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.footer}
          />
        ))}
      </div>
    </div>
)

export default RouterComponent;
