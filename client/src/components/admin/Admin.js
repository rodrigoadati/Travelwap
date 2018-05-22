import React, {Component} from 'react';
import history from '../history';
import Cookies from "universal-cookie";

export default class Admin extends Component{
    constructor(){
        super();

        this.state = {
            cookies: new Cookies()
        }
    }

    componentWillMount(){
        let role = this.state.cookies.get('role');
        if(role !== 'admin')
            history.push('/');
    }
    
    render(){
        return (
            <div>
                <h2>Home</h2>
            </div>
        )    
    }
}
