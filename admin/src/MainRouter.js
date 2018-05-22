import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './components/Login';
import Flights from './components/Flights/Flights';
import Hotels from './components/Hotels/Hotels';
import Cars from './components/Cars/Cars';
import Vouchers from './components/Vouchers/Vouchers';

const styles = {
    divContainer: {
    },
}

const MainRouter = () => (
    <main>
        <div style={styles.divContainer}>
            <Switch>
                <Route path='/Login/' component={Login} />
                    <Route exact path='/' component={Home} />
                    <Route path='/flights/' component={Flights} />
                    <Route path='/hotels/' component={Hotels} />
                    <Route path='/cars/' component={Cars} />
                    <Route path='/vouchers/' component={Vouchers} />
            </Switch>
        </div>
    </main>
)

export default MainRouter

