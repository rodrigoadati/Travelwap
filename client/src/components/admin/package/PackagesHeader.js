import React from 'react';
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

const HotelHeader = () => {
    return (
        <nav>
            <Link to='/adminPackage/'><FlatButton label="Packages" secondary={true} icon={<FontIcon className="fa fa-file-o fa-lg" color={'#F30827'} />} /></Link>
            <Link to='/adminPackage/add'><FlatButton label="Add Package Package" secondary={true} icon={<FontIcon className="fa fa-plus fa-lg" color={'#64DD17'} />} /></Link>
        </nav>
    )
}

export default HotelHeader;