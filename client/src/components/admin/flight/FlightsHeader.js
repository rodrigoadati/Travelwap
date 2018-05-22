import React from 'react';
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

const FlightHeader = () => {
    return (
        <nav>
            <Link to='/adminFlight/'><FlatButton label="Flights" secondary={true} icon={<FontIcon className="fa fa-plane fa-lg" color={'#0D47A1'} />} /></Link>
            <Link to='/adminFlight/add'><FlatButton label="Add Flight Package" secondary={true} icon={<FontIcon className="fa fa-plus fa-lg" color={'#64DD17'} />} /></Link>
        </nav>
    )
}

export default FlightHeader;