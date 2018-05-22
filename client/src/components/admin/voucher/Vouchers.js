import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import VouchersMain from './VouchersMain';
import VoucherDetails from './VoucherDetails';
import AddVouchers from './AddVouchers';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    routers: {
        background: '#ffffff'
    }
}

const Vouchers = () => {
    return (
        <div style={styles.hotels}>
            <Link to='/adminVoucher/'><FlatButton label="Vouchers" secondary={true} icon={<FontIcon className="fa fa-tag fa-lg" color={'#EF6C00'} />} /></Link>
            <Link to='/adminVoucher/add'><FlatButton label="Add Vouchers" secondary={true} icon={<FontIcon className="fa fa-plus fa-lg" color={'#64DD17'} />} /></Link>
        </div>
    )
}

export default Vouchers;