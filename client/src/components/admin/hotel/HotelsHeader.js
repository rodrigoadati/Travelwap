import React from 'react';
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

const HotelHeader = () => {
    return (
        <nav>
            <Link to='/adminHotel/'><FlatButton label="Hotels" secondary={true} icon={<FontIcon className="fa fa-bed fa-lg" color={'#1B5E20'} />} /></Link>
            <Link to='/adminHotel/add'><FlatButton label="Add Hotel Package" secondary={true} icon={<FontIcon className="fa fa-plus fa-lg" color={'#64DD17'} />} /></Link>
        </nav>
    )
}

export default HotelHeader;