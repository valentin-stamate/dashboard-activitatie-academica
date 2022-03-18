import {UtilService} from "./util.service";
import {WorkBook, WorkSheet} from "xlsx";

const XLSX = require("xlsx");

export class XLSXWorkBookService {
    private readonly workBook: WorkBook;

    constructor() {
        this.workBook = XLSX.utils.book_new();
    }

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

    constructor(private columns: string[], public sheetName: string, rows: any[] = []) {
        this.workSheet = XLSX.utils.aoa_to_sheet([
            columns
        ]);

        if (rows.length !== 0) {
            this.insertRows(rows);
        }
    }

    /** Inserts a row into the buffer object */
    public insertRow(row: any) {
        const rowString: any[] = Object.values(row);
        this.insert(rowString);
    }

    public insertRows(rows: any[]) {
        for (let item of rows) {
            console.log(item);
            this.insertRow(item);
        }
    }

    /** Insert the string representation row into the buffer */
    private insert(row: string[]) {
        XLSX.utils.sheet_add_aoa(this.workSheet, [
            row
        ], {origin: -1});
    }

    public getInstance() {
        return this.workSheet;
    }

}

export enum XLSXKeys {
    DAY = 'Ziua',
    NAME = 'Nume',
    IDENTIFIER = 'Nr. Matricol',
    COORDINATOR = 'Coordonator',
    FUNDING = 'Finantare',
    EMAIL = 'Email',
    PROFESSOR_NAME = 'Profesor',
    FROM = 'De la',
    TO = 'Pana la',
}