import { shallow } from 'enzyme';
import LoginComponent from './LoginComponent';
import React from 'react';

describe('Login Component tests', () => {
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
    });

    it('should only enable the submit button if there is a value in the username and password fields', () => {
        const wrapper = shallow(<LoginComponent/>);
        expect(wrapper.find('FormButton').first().props().disabled).toBeTruthy();
        wrapper.find('FormInput').first().simulate('keyPress', {key: 'A'});
        expect(wrapper.find('FormButton').first().props().disabled).toBeTruthy();
        wrapper.find('FormInput').last().simulate('keyPress', {key: 'A'});
        expect(wrapper.find('FormButton').first().props().disabled).toBeFalsy();
    });
});