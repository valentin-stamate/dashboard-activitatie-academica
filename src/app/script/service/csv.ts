import {FileService} from "./file";

export class CsvFile {

    static appendRow(path: string, payload: any, columnOrder: string[], columnToText: string[][], columnOrderMap: Map<string, number>, delimiter: string = ','): boolean {

        if (FileService.createIfNotExists(path)) {
            let firstRow = '';
            for (const [name, translation] of columnToText) {
                firstRow += `${translation}${delimiter}`;
            }

            firstRow += '\n';
            FileService.append(path, firstRow);
        }

        let columns: string[] = Array(columnOrder.length).fill('');

        const entries = Object.entries(payload);

        for (const [key, value] of entries) {
            const index = columnOrderMap.get(key);

            if (typeof index === typeof '') {
                const i: number = index as number;

                columns[i] = '' + value;
                continue;
            }

            return false;
        }

        let completeRow = '';

        for (const column of columns) {
            const safeColumn = column.replace(new RegExp(`${delimiter}`, 'g'), '');
            completeRow += `${safeColumn}${delimiter}`;
        }

        completeRow += '\n';

        FileService.append(path, completeRow);

        return true;
    }

}
