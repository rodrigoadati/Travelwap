import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import VouchersMain from './VouchersMain';
import VoucherDetails from './VoucherDetails';
import AddVouchers from './AddVouchers';

import FlatButton from 'material-ui/FlatButton';

const styles = {
    routers: {
        background: '#ffffff'
    }
}

const Vouchers = () => {
    return (
        <div style={styles.hotels}>
            <Link to='/vouchers/'><FlatButton label="Vouchers" secondary={true} /></Link>
            <Link to='/vouchers/add'><FlatButton label="Add Vouchers" secondary={true} /></Link>

            <Switch>
                <Route exact path='/vouchers/' component={VouchersMain} />
                <Route path='/vouchers/details/:id' component={VoucherDetails} />
                <Route path='/vouchers/add' component={AddVouchers} />
            </Switch>
        </div>
    )
}

export default Vouchers;