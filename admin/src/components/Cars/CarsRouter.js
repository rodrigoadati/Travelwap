import React from 'react'
import { Switch, Route } from 'react-router-dom';
import CarsMain from './CarsMain';
import CarDetails from './CarDetails';
import AddCars from './AddCars';

const CarsRouter = () => (
    <Switch>
        <Route exact path='/cars/' component={CarsMain} />
        <Route path='/cars/details/:id' component={CarDetails} />
        <Route path='/cars/add' component={AddCars} />
    </Switch>
)

export default CarsRouter;
