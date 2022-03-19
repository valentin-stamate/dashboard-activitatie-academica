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

    static stringDate(date: Date) {
        const d = date;
        return `${this.dateNumber(d.getDate())}${this.dateNumber(d.getMonth() + 1)}${d.getFullYear()}_`
            + `${this.dateNumber(d.getHours())}${this.dateNumber(d.getMinutes())}${this.dateNumber(d.getSeconds())}`;
    }

    /* 6 -> 06 */
    static dateNumber(number: number):string {
        if (number < 10) {
            return `0${number}`;
        }

        return '' + number;
    }

    static fullTrim(str: string) {
        return str.replace(/\s+/g, ' ').trim();
    }

    static arrayToString(array: any[], delimiter: string = ',') {
        let str = '';

        if (array.length === 0) {
            return str;
        }

        for (let i = 0; i < array.length - 1; i++) {
            str += `${array[i]}${delimiter}`;
        }

        str += `${array[array.length - 1]}`;
        return str;
    }

    static daysInMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }

}