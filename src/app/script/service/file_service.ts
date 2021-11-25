import {CsvFile} from "../util/csv";
import * as fs from "fs";

/* Service that handles files */
export class FileService {

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

    static appendCSVLine(filePath: string, headers: string[], object: any) {
        const csvFile = new CsvFile({
            path: filePath,
            headers: headers,
        });

        csvFile.create([
            object,
        ]).catch(err => {
            console.error(err.stack);
        });
    }
}