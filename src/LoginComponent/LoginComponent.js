import React from 'react';
import {
    Form,
    FormButton,
    FormInput,
    Grid, GridColumn,
    Header,
    HeaderContent,
    HeaderSubheader,
    Icon,
    Segment
} from 'semantic-ui-react';
import './LoginComponent.css';

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    render() {
        return (
            <Grid id="loginContainer" verticalAlign="middle" centered>
                <GridColumn>
                    <Header as="h2">
                        <Icon name="log out"/>
                        <HeaderContent>
                            NYLT Evaluator
                            <HeaderSubheader>Welcome! Please login below:</HeaderSubheader>
                        </HeaderContent>
                    </Header>
                    <Form size="large">
                        <Segment raised>
                            <FormInput fluid placeholder="Username" icon="user" iconPosition="left"/>
                            <FormInput fluid type="password" icon="lock" iconPosition="left" placeholder="Password"/>
                            <FormButton fluid size="large">Login</FormButton>
                        </Segment>
                    </Form>
                </GridColumn>
            </Grid>
        );
    }
}
