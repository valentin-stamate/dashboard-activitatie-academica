import {instanceOf} from "graphql/jsutils/instanceOf";
import {UtilService} from "./util.service";

export class CSVService {
    private buffer: string = ``;

    constructor(private columns: string[],
                private columnRowMap: Map<string, string>,
                private delimiter: string = ';') {
        this.insert(columns);
    }

    /** Inserts a row into the buffer object */
    insertRow(rowObject: any) {
        const objectMap: Map<string, any> = new Map(Object.entries(rowObject));
        const row: any[] = [];

        for (const column of this.columns) {
            const objectIndex = this.columnRowMap.get(column);

            if (objectIndex !== undefined) {
                let value = objectMap.get(objectIndex);

                if (value instanceof Date) {
                    value = UtilService.stringDate(value);
                }

                row.push(value ? `` + value : ``);
                continue;
            }

            row.push('');
        }

        this.insert(row);
    }

    /** Insert the string representation row into the buffer */
    private insert(row: string[]) {
        if (row.length !== this.columns.length) {
            throw new Error('[CSV Service] Row length and columns doesn\'t match');
        }

        row = this.validateRow(row);

        let rowBuffer = ``;
        for (let i = 0; i < row.length - 1; i++) {
            rowBuffer += `${row[i]}${this.delimiter}`;
        }

        rowBuffer += `${row[row.length - 1]}`;
        this.buffer += `${rowBuffer}\n`;
    }

    /** Returns a new valid row */
    private validateRow(row: string[]): string[] {

        const validRow: string[] = [];

        const replaceRegEx: RegExp = new RegExp(`${this.delimiter}`, 'g');
        const replaceWith = ``;

        for (const item of row) {
            validRow.push(item.replace(replaceRegEx, replaceWith));
        }

        return validRow;
    }

    /** Getter for buffer */
    getBuffer(): string {
        return this.buffer;
    }

    /** Clears the buffer */
    clearBuffer(): void {
        this.buffer = ``;
    }
}