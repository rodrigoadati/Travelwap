import React from 'react'
import { Switch, Route } from 'react-router-dom';
import FlightsMain from './FlightsMain';
import FlightDetails from './FlightDetails';
import AddFlights from './AddFlights';

const FlightsRouter = () => (
    <Switch>
        <Route exact path='/flights/' component={FlightsMain} />
        <Route path='/flights/details/:id' component={FlightDetails} />
        <Route path='/flights/add' component={AddFlights} />
    </Switch>
)

export default FlightsRouter;
