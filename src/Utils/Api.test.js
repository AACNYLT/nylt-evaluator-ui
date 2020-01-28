import Api from './Api';

describe('API tests', () => {
    describe('Login tests', () => {
        it('should return a promise', () => {
            expect(Api.login('user', 'pass').then).toBeTruthy();
            expect(typeof Api.login('user', 'pass').then).toBe('function');
        });
    });
});