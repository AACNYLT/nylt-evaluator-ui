export default class Api {
    static login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }
}