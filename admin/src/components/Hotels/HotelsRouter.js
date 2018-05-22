import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HotelsMain from './HotelsMain';
import HotelDetails from './HotelDetails';
import AddHotels from './AddHotels';

const HotelsRouter = () => (
    <Switch>
        <Route exact path='/hotels/' component={HotelsMain} />
        <Route path='/hotels/details/:id' component={HotelDetails} />
        <Route path='/hotels/add' component={AddHotels} />
    </Switch>
)

export default HotelsRouter;
