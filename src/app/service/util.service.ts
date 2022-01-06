
export class UtilService {
    static mergeArrays(arr: any[][]) {
        let list: any = [];

        for (const item of arr) {
            list = list.concat(item);
        }

        return list;
    }

    static mergeProperties(...args: any): any {
        let merged = {};
        for (let i in args) {
            merged = {...merged, ...args[i]};
        }

        return merged;
    }

    static sleep(ms: number) {
        return new Promise(s => setTimeout(s, ms));
    }

    static generateRandomString(length: number = 64) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    static stringFormat(string: string, args: any[]) {
        return string.replace(/{([0-9]+)}/g, function (match, index) {
            return typeof args[index] == 'undefined' ? match : args[index];
        });
    }
}