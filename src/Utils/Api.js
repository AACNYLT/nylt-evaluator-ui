export default class Api {
    static login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }

    static GetScouts() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 2000)
        })
    }

    static SaveScout(scout) {
        return Promise.resolve();
    }

    static SaveEval(evaluation) {
        return Promise.resolve();
    }
}