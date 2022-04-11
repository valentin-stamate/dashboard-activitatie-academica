/** ENV */
require('dotenv').config();

const env = process.env;
const passwordSecret = env.PASSWORD_SECRET;

export class CryptoUtil {
    static scufflePassword(password: string) {
        return `${passwordSecret}${password}`;
    }
}