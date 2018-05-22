import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    appBar: {
        background: '#d32f2f'
    },
    formStyle: {
        padding: '20px'
    },
    raisedButton: {
        margin: '12px',
        background: '#689F38'
    },
    textField: {
        width: '800px'
    }
};

class CarDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carData: {
                title: '',
                description: '',
                category: '',
                
            }, open: false
        };
        this.deleteCar = this.deleteCar.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentDidMount() {
        let carId = this.props.match.params.id;
        axios.get(`http://localhost:4000/api/cars/${carId}`)
            .then(resp => {
                let carResp = {
                    title: resp.data.car.title,
                    description: resp.data.car.description,
                    category: resp.data.car.category,
                }
                this.setState({
                    carData: carResp
                })
                console.log(this.state.carData)
            })
            .catch(console.error);

    };

    updatecar(carData) {
        let carId = this.props.match.params.id;
        axios.post(`http://localhost:4000/api/cars/${carId}`,
            carData)
            .then(resp => {
                this.handleOpen();
                console.log(resp);
            }).catch(err => console.log(err));
    }

    formatDate(date) {
        let d = new Date(date),
            year = d.getFullYear(),
            month = ("0" + (d.getMonth() + 1)).slice(-2),
            day = ("0" + (d.getDate())).slice(-2);
        let dateFormat = year + '-' + month + '-' + day;
        return (dateFormat === null) ? null : new Date(dateFormat);
    }

    deleteCar() {
        let carId = this.props.match.params.id;
        axios.delete(`http://localhost:4000/api/cars/${carId}`)
            .then(resp => {
                console.log(resp);
                this.props.history.push('/cars');
            }).catch(err => console.log(err));
    }

    handleSubmitUpdate(e) {
        this.setState({ actionType: 'update', actionMsg: 'Car Package has been updated.' });
        this.updatecar(this.state.carData);
        e.preventDefault();
    }

    handleSubmitDelete(e) {
        this.setState({ actionType: 'delete', actionMsg: 'Are you sure you want to delete this Car Package?' });
        this.handleOpen();
        e.preventDefault();
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChange(e) {
        let carData = this.state.carData;
        carData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            carData: carData
        });
    }

    handleChangeDate(e, expiry) {
        let carData = this.state.carData;
        carData.expiry = expiry;

        this.setState({
            carData: carData
        })
    }

    clearFields() {
        let carData = this.state.carData;
        carData.title = '';
        carData.description = '';
        carData.category = '';
        
        this.setState({
            carData: carData
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { carData } = this.state;
        const actionType = this.state.actionType;
        const actionMsg = this.state.actionMsg;
        const actions = [
            <Link to='/cars/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} />
            </Link>,
        ];
        const actionsDelete = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton label="Yes" primary={true} onClick={this.deleteCar} />
        ];
        return (
            <Card>
                <AppBar title="Car Package Details" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <form onSubmit={this.handleSubmitUpdate.bind(this)} style={styles.formStyle}>

                        <TextField type="text" name='title' value={carData.title} onChange={this.handleChange} floatingLabelText="Title" style={styles.textField} underlineShow={false} />
                        <Divider />
                        <TextField name="description" value={carData.description} onChange={this.handleChange} floatingLabelText="Description" style={styles.textField} underlineShow={false} />
                        <Divider />
                        <TextField type="text" name="category" value={carData.category} onChange={this.handleChange} floatingLabelText="Category" style={styles.textField} underlineShow={false} />
                        <Divider />
                        
                        <RaisedButton type="submit" label="Update Car Package" primary={true} style={styles.raisedButton}></RaisedButton>
                        <RaisedButton name="delete" label="Delete Car Package" secondary={true} style={styles.raisedButton} onClick={this.handleSubmitDelete.bind(this)}></RaisedButton>
                        <Dialog
                            title="Message"
                            actions={(actionType === 'update') ? actions : actionsDelete}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}>
                            {actionMsg}
                        </Dialog>
                    </form>

                </CardText>
            </Card>
        )
    }
}

export default CarDetails;




