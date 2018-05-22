import React from 'react'
import { Route } from 'react-router-dom';


import HeaderAdmin from './layout/HeaderAdmin';
import Admin from './admin/Admin';
import AdminFlightsHeader from './admin/flight/FlightsHeader';
import AdminFlightMain from './admin/flight/FlightsMain';
import AdminFlightDetails from './admin/flight/FlightDetails';
import AdminAddFlights from './admin/flight/AddFlights';
import AdminHotelsHeader from './admin/hotel/HotelsHeader';
import AdminHotelMain from './admin/hotel/HotelsMain';
import AdminHotelDetails from './admin/hotel/HotelDetails';
import AdminAddHotels from './admin/hotel/AddHotels';
import AdminCruisesHeader from './admin/cruise/CruisesHeader';
import AdminCruiseMain from './admin/cruise/CruisesMain';
import AdminCruiseDetails from './admin/cruise/CruiseDetails';
import AdminAddCruises from './admin/cruise/AddCruises';
import AdminVouchers from './admin/voucher/Vouchers';
import AdminVouchersMain from './admin/voucher/VouchersMain';
import AdminVoucherDetails from './admin/voucher/VoucherDetails';
import AdminAddVouchers from './admin/voucher/AddVouchers';
import AdminPackagesHeader from './admin/package/PackagesHeader';
import AdminPackagesMain from './admin/package/PackagesMain';
import AdminPackageDetails from './admin/package/PackageDetails';
import AdminAddPackages from './admin/package/AddPackages';

import Header from './layout/Header';
import Footer from './layout/Footer';
import AddPerson from './person/AddPerson';
import Login from './login/Login';
import Home from './home/Home';
import Profile from './profile/Profile';
import ResetPassword from './profile/ResetPassword';
import SearchFlights from './flight/SearchFlights';
import SearchFlightDetail from './flight/SearchFlightDetail';
import SearchFlightItemListDetail from './flight/SearchFlightItemListDetail';
import SearchHotels from './hotel/SearchHotels';
import SearchHotelDetail from './hotel/SearchHotelDetail';
import SearchHotelItemListDetail from './hotel/SearchHotelItemListDetail';
import SearchCruises from './cruise/SearchCruise';
import SearchCruiseDetail from './cruise/SearchCruiseDetail';
import SearchCruiseItemListDetail from './cruise/SearchCruiseItemListDetail';

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
  /************************/
  // FLIGHT
  /************************/
  {
    path: '/SearchFlight',
    exact: true,
    header: () => <Header />,
    content: () => <SearchFlights />,
    footer: () => <Footer />
  },
  {
    path: '/SearchFlightDetail/:name/:image',
    exact: true,
    header: () => <Header />,
    content: (props) => <SearchFlightDetail  {...props} />,
    footer: () => <Footer />
  },
  {
    path: '/SearchFlightItemListDetail',
    exact: true,
    header: () => <Header />,
    content: (props) => <SearchFlightItemListDetail  {...props} />,
    footer: () => <Footer />
  },
  /************************/
  // HOTEL
  /************************/
  {
    path: '/SearchHotel',
    exact: true,
    header: () => <Header />,
    content: () => <SearchHotels />,
    footer: () => <Footer />
  },
  {
    path: '/SearchHotelDetail/:name/:image',
    exact: true,
    header: () => <Header />,
    content: (props) => <SearchHotelDetail  {...props} />,
    footer: () => <Footer />
  },
  {
    path: '/SearchHotelItemListDetail',
    exact: true,
    header: () => <Header />,
    content: (props) => <SearchHotelItemListDetail  {...props} />,
    footer: () => <Footer />
  },

  /************************/
  // CRUISE
  /************************/
  {
    path: '/SearchCruise',
    exact: true,
    header: () => <Header />,
    content: () => <SearchCruises />,
    footer: () => <Footer />
  },
  {
    path: '/SearchCruiseDetail/:name/:image',
    exact: true,
    header: () => <Header />,
    content: (props) => <SearchCruiseDetail  {...props} />,
    footer: () => <Footer />
  },
  {
    path: '/SearchCruiseItemListDetail',
    exact: true,
    header: () => <Header />,
    content: (props) => <SearchCruiseItemListDetail  {...props} />,
    footer: () => <Footer />
  },
  
  /************************/
  // PROFILE
  /************************/
  {
    path: '/profile',
    exact: true,
    header: () => <Header/>,
    content: () => <Profile />,
    footer: () => <Footer/>
  },
  {
    path: '/resetPassword/:id',
    exact: true,
    content: (props) => <ResetPassword {...props}/>,
  },
  /************************/
  // ADMIN
  /************************/
  {
    path: '/admin',
    exact: true,
    header: () => <HeaderAdmin />,
    content: () => <Admin />
  },
  /************************/
  // ADMIN FLIGHT
  /************************/
  {
    path: "/adminFlight/",
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminFlightsHeader />,
    content: () => <AdminFlightMain />
  },
  {
    path: '/adminFlight/add',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminFlightsHeader />,
    content: () => <AdminAddFlights />
  },
  {
    path: '/adminFlight/details/:id',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminFlightsHeader />,
    content: (props) => <AdminFlightDetails {...props} />
  },

  /************************/
  // ADMIN HOTEL
  /************************/
  {
    path: "/adminHotel/",
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminHotelsHeader />,
    content: () => <AdminHotelMain />
  },
  {
    path: '/adminHotel/add',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminHotelsHeader />,
    content: () => <AdminAddHotels />
  },
  {
    path: '/adminHotel/details/:id',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminHotelsHeader />,
    content: (props) => <AdminHotelDetails {...props} />
  },
  /************************/
  // ADMIN CRUISE
  /************************/
  {
    path: "/adminCruise/",
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminCruisesHeader />,
    content: () => <AdminCruiseMain />
  },
  {
    path: '/adminCruise/add',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminCruisesHeader />,
    content: () => <AdminAddCruises />
  },
  {
    path: '/adminCruise/details/:id',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminCruisesHeader />,
    content: (props) => <AdminCruiseDetails {...props} />
  },
  /************************/
  // ADMIN VOUCHER
  /************************/
  {
    path: "/adminVoucher/",
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminVouchers />,
    content: () => <AdminVouchersMain />
  },
  {
    path: '/adminVoucher/add',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminVouchers />,
    content: () => <AdminAddVouchers />
  },
  {
    path: '/adminVoucher/details/:id',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminVouchers />,
    content: (props) => <AdminVoucherDetails {...props} />
  },
  /************************/
  // ADMIN PACKAGES
  /************************/
  {
    path: "/adminPackage/",
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminPackagesHeader />,
    content: () => <AdminPackagesMain />
  },
  {
    path: '/adminPackage/add',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminPackagesHeader />,
    content: () => <AdminAddPackages />
  },
  {
    path: '/adminPackage/details/:id',
    exact: true,
    header: () => <HeaderAdmin />,
    headerSub: () => <AdminPackagesHeader />,
    content: (props) => <AdminPackageDetails {...props} />
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

    <div className="Header-sub">
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.headerSub}
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
