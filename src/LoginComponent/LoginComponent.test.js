import { shallow } from 'enzyme';
import LoginComponent from './LoginComponent';
import React from 'react';
import Api from '../Utils/Api';
import sinon from 'sinon';
import { Constants } from '../Utils/Utils';

describe('Login Component tests', () => {
    describe('Layout tests', () => {
        it('should display a header', () => {
            const wrapper = shallow(<LoginComponent/>);
            expect(wrapper.find('Header').length).toBe(1);
            expect(wrapper.find('Header').first().props().as).toBe('h2');
            expect(wrapper.find('Header HeaderContent').length).toBe(1);
            expect(wrapper.find('Header Icon').length).toBe(1);
            expect(wrapper.find('Header HeaderSubheader').length).toBe(1);
            expect(wrapper.find('Header HeaderContent').html()).toContain('NYLT Evaluator');
            expect(wrapper.find('Header HeaderSubheader').html()).toContain('Welcome! Please login below:');
        });

        it('should display a login form', () => {
            const wrapper = shallow(<LoginComponent/>);
            console.log(wrapper.html());
            expect(wrapper.find('Form').length).toBe(1);
            expect(wrapper.find('Form').first().props().size).toBe('large');
            expect(wrapper.find('Form Segment').length).toBe(1);
            expect(wrapper.find('Form Segment').first().props().raised).toBeTruthy();
            expect(wrapper.find('FormInput').length).toBe(2);
            expect(wrapper.find('FormInput').first().props().icon).toBe('user');
            expect(wrapper.find('FormInput').first().props().iconPosition).toBe('left');
            expect(wrapper.find('FormInput').first().props().placeholder).toBe('Username');
            expect(wrapper.find('FormInput').first().props().fluid).toBeTruthy();
            expect(wrapper.find('FormInput').last().props().icon).toBe('lock');
            expect(wrapper.find('FormInput').last().props().iconPosition).toBe('left');
            expect(wrapper.find('FormInput').last().props().placeholder).toBe('Password');
            expect(wrapper.find('FormInput').last().props().fluid).toBeTruthy();
            expect(wrapper.find('FormButton').length).toBe(1);
            expect(wrapper.find('FormButton').first().props().fluid).toBeTruthy();
            expect(wrapper.find('FormButton').first().props().size).toBe('large');
            expect(wrapper.find('FormButton').first().html()).toContain('Login');
            expect(wrapper.find('Grid').length).toBe(1);
            expect(wrapper.find('Grid').first().props().verticalAlign).toBe('middle');
            expect(wrapper.find('Grid').first().props().centered).toBeTruthy();
            expect(wrapper.find('Grid').first().props().id).toBe('loginContainer');
            expect(wrapper.find('GridColumn').length).toBe(1);
        });

        it('should update the state after entering a username and password', () => {
            const wrapper = shallow(<LoginComponent/>);
            wrapper.find('FormInput[name="username"]').first().props().onChange({
                target: {
                    name: 'username',
                    value: 'Hello'
                }
            });
            expect(wrapper.state().username).toBe('Hello');
            wrapper.find('FormInput[name="password"]').first().props().onChange({
                target: {
                    name: 'password',
                    value: 'pass'
                }
            });
            expect(wrapper.state().password).toBe('pass');
        });

        it('should only enable the submit button if there is a value in the username and password fields', () => {
            const wrapper = shallow(<LoginComponent/>);
            expect(wrapper.find('FormButton').first().props().disabled).toBeTruthy();
            wrapper.find('FormInput[name="username"]').first().props().onChange({
                target: {
                    name: 'username',
                    value: 'Hello'
                }
            });
            expect(wrapper.find('FormButton').first().props().disabled).toBeTruthy();
            wrapper.find('FormInput[name="password"]').first().props().onChange({
                target: {
                    name: 'password',
                    value: 'pass'
                }
            });
            expect(wrapper.find('FormButton').first().props().disabled).toBeFalsy();
        });
    });

    describe('Login Invokation Tests', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should invoke login API upon clicking login', () => {
            const loginStub = sinon.stub(Api, 'login').resolves();
            const wrapper = shallow(<LoginComponent/>).setState({
                username: 'someUser',
                password: 'somePass'
            });
            wrapper.find('FormButton').first().simulate('click');
            expect(loginStub.calledWith('someUser', 'somePass')).toBeTruthy();
        });

        it('should show a loading spinner while logging in', done => {
            sinon.stub(Api, 'login').returns(new Promise(resolve => {
                setTimeout(() => resolve(true), 200);
            }));
            const wrapper = shallow(<LoginComponent/>).setState({
                username: 'wrongUser',
                password: 'wrongPass'
            });
            expect(wrapper.find('Message').length).toBe(0);
            wrapper.find('FormButton').first().simulate('click');
            setTimeout(() => {
                expect(wrapper.find('Dimmer').length).toBe(1);
                expect(wrapper.find('Loader').length).toBe(1);
                expect(wrapper.find('Loader').html()).toContain('Logging in...');
                done();
            }, 100);
        });

        it('should set the login fields to an error state if the API returns a bad credentials error', done => {
            sinon.stub(Api, 'login').rejects({type: Constants.LoginResult.BadCredentials});
            const wrapper = shallow(<LoginComponent/>).setState({
                username: 'wrongUser',
                password: 'wrongPass'
            });
            expect(wrapper.find('Message').length).toBe(0);
            wrapper.find('FormButton').first().simulate('click');
            process.nextTick(() => {
                expect(wrapper.find('Message').length).toBe(1);
                expect(wrapper.find('Dimmer').length).toBe(0);
                expect(wrapper.find('Loader').length).toBe(0);
                expect(wrapper.find('Message').props().color).toBe('yellow');
                expect(wrapper.find('MessageHeader').first().html()).toContain('Unable to Login');
                expect(wrapper.find('Message').first().html()).toContain('Your username or password is incorrect');
                done();
            });
        });
    });
});