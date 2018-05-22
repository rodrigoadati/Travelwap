import React from 'react';
import { Link } from 'react-router-dom'

import FlatButton from 'material-ui/FlatButton';

const CarHeader = () => {
    return (
        <nav>
            <Link to='/cars/'><FlatButton label="Cars" secondary={true} /></Link>
            <Link to='/cars/add'><FlatButton label="Add Car Package" secondary={true} /></Link>
        </nav>
    )
}

export default CarHeader;