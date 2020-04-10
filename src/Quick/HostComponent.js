import * as React from 'react';
import LoginComponent from '../LoginComponent/LoginComponent';
import TileListComponent from './TileListComponent';
import ProfileComponent from './ProfileComponent';

export default class HostComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'login',
            profileScout: {}
        };
        this.onLogin = this.onLogin.bind(this);
        this.onProfile = this.onProfile.bind(this);
        this.hostedComponent = this.hostedComponent.bind(this);
    }

    onLogin() {
        this.setState({
            screen: 'home'
        });
    }

    onProfile(scout) {
        this.setState({
            screen: 'profile',
            profileScout: scout
        })
    }

    hostedComponent() {
        switch (this.state.screen) {
            case 'login':
                return <LoginComponent onLogin={this.onLogin}/>;
            case 'home':
                return <TileListComponent launchProfile={this.onProfile}/>;
            case 'profile':
                return <ProfileComponent scout={this.state.profileScout} onClose={this.onLogin}/>;
            default:
                return <LoginComponent/>;
        }
    }

    render() {
        return <div>{this.hostedComponent()}</div>
    }
}