import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const styles = {
    appBar: {
        background: '#363636'
    },
    drawer: {
        paddingTop: '100px',
        background: '#00695C'
    },
    link: {
        textDecoration: 'none'
    },
    menuItem: {
        color: '#efefef'
    }
}

class HeaderNav extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div>
                <AppBar title="Travelwap Admin" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={this.handleToggle} style={styles.appBar} />
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})} containerStyle={styles.drawer} >
                    <Link to='/'onClick={this.handleClose} style={styles.link}><MenuItem style={styles.menuItem}>Home</MenuItem></Link>
                    <Divider />
                    <Link to='/flights/' onClick={this.handleClose} style={styles.link}><MenuItem style={styles.menuItem}>Flights</MenuItem></Link>
                    <Divider />
                    <Link to='/hotels/' onClick={this.handleClose} style={styles.link}><MenuItem style={styles.menuItem}>Hotels</MenuItem></Link>
                    <Divider />
                    <Link to='/cars/' onClick={this.handleClose} style={styles.link}><MenuItem style={styles.menuItem}>Cars</MenuItem></Link>
                    <Divider />
                    <Link to='/vouchers/' onClick={this.handleClose} style={styles.link}><MenuItem style={styles.menuItem}>Vouchers</MenuItem></Link>
                    <Divider />
                </Drawer>
            </div>
        )
    }
}

export default HeaderNav;



