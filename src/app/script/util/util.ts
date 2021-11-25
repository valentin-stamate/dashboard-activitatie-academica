function mergeProperties(...args: any): any {
    let merged = {};
    for (let i in args) {
        merged = {...merged, ...args[i]};
    }

    return merged;
}

function sleep(ms: number) {
    return new Promise(s => setTimeout(s, ms));
}

export {mergeProperties, sleep};