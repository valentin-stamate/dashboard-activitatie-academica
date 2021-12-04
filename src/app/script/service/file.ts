import {CsvFile} from "./csv";
import * as fs from "fs";

/* Service that handles files */
export class FileService {

    static createIfNotExists(path: string): boolean {
        try {
            if (!fs.existsSync(path)) {
                const fileDesc = fs.createWriteStream(path, {flags: 'a+'});
                fileDesc.close();
                return true;
            }

        } catch (err) {
            console.log(err);
        }

        return false;
    }

    static read(path: string): string {
        try {
            return fs.readFileSync(path, 'utf8');
        } catch (err) {
            console.log(err);
        }

        return '';
    }

    static write(path: string, content: string) {
        try {
            fs.writeFileSync(path, content, 'utf8');
        } catch (err) {
            console.log(err);
        }
    }

    static append(path: string, content: string) {
        try {
            fs.appendFileSync(path, content, 'utf8');
        } catch (err) {
            console.log(err);
        }
    }

}