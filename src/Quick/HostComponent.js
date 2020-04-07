import * as React from 'react';
import LoginComponent from '../LoginComponent/LoginComponent';
import TileListComponent from './TileListComponent';
import ProfileComponent from './ProfileComponent';

export default class HostComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            screen: 'login'
        };
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin() {
        this.setState({
            screen: 'home'
        });
    }

    render() {
        switch (this.state.screen) {
            case 'login':
                return <LoginComponent onLogin={this.onLogin} />;
            case 'home':
                return <TileListComponent />;
            case 'profile':
                return <ProfileComponent />;
            default:
                return <LoginComponent />;
        }
    }
}