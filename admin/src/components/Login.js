import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider'

const styles = {
    margin: 15,
};




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authData: {
                username: '',
                password: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    authUser(authData) {
        axios.post('http://localhost:4000/api/users/login',
            authData).then(resp => {
                console.log(resp);
                if (resp.status === 200) {
                    console.log("Login successfull");
                    // var uploadScreen = [];
                    // uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
                    // self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                } else {
                    console.log("Username or Password does not match");
                }
            }).catch(err => console.log(err));
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChangeUsername(e) {
        let username = this.state.username;
        username = this.getFieldValue(e.target);

        this.setState({
            username: username
        });
    }

    handleChangePassword(e) {
        let password = this.state.password;
        password = this.getFieldValue(e.target);

        this.setState({
            password: password
        });
    }

    handleChange(e) {
        let authData = this.state.authData;
        authData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            authData: authData
        });
    }

    handleSubmit(e) {
        this.authUser(this.state.authData);
        e.preventDefault();
    }

    render() {
        const { authData } = this.state;
        return (

            <div>
                <form onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>
                    <TextField type="text" name='username' value={authData.username}
                        onChange={this.handleChange} floatingLabelText="Username"
                        style={styles.textField} underlineShow={false} />
                    <Divider />
                    <TextField type="password" name='password' value={authData.password}
                        onChange={this.handleChange} floatingLabelText="Password"
                        style={styles.textField} underlineShow={false} />
                    <Divider />
                    <RaisedButton type="submit" label="Login" primary={true} style={styles.raisedButton}></RaisedButton>
                </form>
            </div>
        );
    }
}

export default Login;