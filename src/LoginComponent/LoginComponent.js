import React from 'react';
import {
    Form,
    FormButton,
    FormInput,
    Grid,
    GridColumn,
    Header,
    HeaderContent,
    HeaderSubheader,
    Icon, Loader,
    Message,
    MessageHeader,
    Segment,
    Dimmer
} from 'semantic-ui-react';
import './LoginComponent.css';
import Api from '../Utils/Api';

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', showBadCredentialsMessage: false, loading: false};
        this.updateStateWithString = this.updateStateWithString.bind(this);
        this.loginButtonClick = this.loginButtonClick.bind(this);
        this.badCredentialsMessage = this.badCredentialsMessage.bind(this);
        this.header = this.header.bind(this);
    }

    updateStateWithString(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isLoginDisabled() {
        return this.state.username === '' || this.state.password === '';
    }

    async loginButtonClick() {
        try {
            this.setState({
                loading: true
            });
            await Api.login(this.state.username, this.state.password);
        } catch (e) {
            this.setState({
                showBadCredentialMessage: true
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    header() {
        return <Header as="h2">
            <Icon name="log out"/>
            <HeaderContent>
                NYLT Evaluator
                <HeaderSubheader>Welcome! Please login below:</HeaderSubheader>
            </HeaderContent>
        </Header>
    }

    badCredentialsMessage() {
        return <Message color="yellow">
            <MessageHeader>Unable to Login</MessageHeader>
            Your username or password is incorrect
        </Message>
    }

    loadingSpinner() {
        return <Dimmer active>
            <Loader>Logging in...</Loader>
        </Dimmer>
    }

    render() {
        return (
            <div>
                {this.state.loading ? this.loadingSpinner() : null}
                <Grid id="loginContainer" verticalAlign="middle" centered>
                    <GridColumn>
                        {this.header()}
                        <Form size="large">
                            <Segment raised>
                                <FormInput fluid onChange={this.updateStateWithString} name="username"
                                           placeholder="Username" icon="user" iconPosition="left"/>
                                <FormInput fluid onChange={this.updateStateWithString} name="password" type="password"
                                           icon="lock" iconPosition="left" placeholder="Password"/>
                                <FormButton onClick={this.loginButtonClick} disabled={this.isLoginDisabled()} fluid
                                            size="large">Login</FormButton>
                            </Segment>
                        </Form>
                        {this.state.showBadCredentialMessage
                            ? this.badCredentialsMessage() : null}
                    </GridColumn>
                </Grid>
            </div>
        );
    }
}
