import React from 'react';
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

const CruisesHeader = () => {
    return (
        <nav>
            <Link to='/adminCruise/'><FlatButton label="Cruise" secondary={true} icon={<FontIcon className="fa fa-ship fa-lg" color={'#e8002f'} />}/></Link>
            <Link to='/adminCruise/add'><FlatButton label="Add Cruise Package" secondary={true} icon={<FontIcon className="fa fa-plus fa-lg" color={'#64DD17'} />} /></Link>
        </nav>
    )
}

export default CruisesHeader;