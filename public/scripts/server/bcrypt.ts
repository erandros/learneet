import Promise = require('bluebird');
var bcryptjs: any = require('bcryptjs');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

function promisify<T>(fn): Promise<T> {
    return new Promise<T>(
    function(resolve: (result: T) => any,
             reject: (error: any) => void) {
        fn(function(err, result) {
            if (!isOk(err, reject)) result;
            resolve(result);
        });
    });
}

module bcrypt {
    export function genSalt(size: Number): Promise<string> {
        return promisify<string>(bcryptjs.genSalt.bind(bcryptjs, size))
    }
    export function hash(s: string, salt: string): Promise<string> {
        return promisify<string>(bcryptjs.hash.bind(bcryptjs, s, salt));
    }
    export function compare(key: string, hash: string): Promise<Boolean> {
        return promisify<Boolean>(bcryptjs.compare.bind(bcryptjs, key, hash));
    }
}

export = bcrypt