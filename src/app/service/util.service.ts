
export class UtilService {
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
}