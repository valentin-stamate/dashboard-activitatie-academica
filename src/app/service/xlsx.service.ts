import {UtilService} from "./util.service";
import {WorkBook, WorkSheet} from "xlsx";

const XLSX = require("xlsx");

export class XLSXWorkBookService {
    workBook = XLSX.utils.book_new();

    appendSheet(workSheet: XLSXWorkSheetService) {
        XLSX.utils.book_append_sheet(this.workBook, workSheet.getInstance(), workSheet.sheetName);
    }

    appendSheets(workSheets: XLSXWorkSheetService[]) {
        for (const item of workSheets) {
            this.appendSheet(item);
        }
    }

    public getInstance(): WorkBook {
        return this.workBook;
    }

    public save(path: string) {
        XLSX.writeFile(this.workBook, path);
    }

}

export class XLSXWorkSheetService {
    private readonly workSheet: WorkSheet;

    constructor(private columns: string[], private columnRowMap: Map<string, string>, public sheetName: string) {

        this.workSheet = XLSX.utils.aoa_to_sheet([
            columns
        ]);
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
        XLSX.utils.sheet_add_aoa(this.workSheet, [
            row
        ], {origin:-1});
    }

    public asCSV(): string {
        return XLSX.utils.sheet_to_csv(this.workSheet);
    }

    public getInstance() {
        return this.workSheet;
    }

}