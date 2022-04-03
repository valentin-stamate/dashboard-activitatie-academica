import {AlignmentType, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType} from "docx";
import {DocxUtils} from "./docx.utils";
import {UtilService} from "../util.service";

export interface VerbalProcessData {
    name: string;
    coordinatorName: string;
    coordinatorFunction: string;
    presentationDate: Date;
    attendanceYear: number;
    thesisTitle: string;
    rows: VerbalProcessTableRow[];
}

export interface VerbalProcessTableRow {
    number: number;
    coordinatorName: string;
    commission: string;

    /* Those fields are not completed here */
    grade?: number;
    signature?: string;
}

export class VerbalProcessService {

    static async getVerbalProcessDOCXBuffer(data: VerbalProcessData): Promise<Buffer> {
        /* Header */
        const header = new Paragraph({
            children: [
                new TextRun({text: 'UNIVERSITATEA "ALEXANDRU IOAN CUZA" DIN IAŞI', font: 'Calibri', size: 24}),
                new TextRun({text: '                                                           ', font: 'Calibri', size: 24}),
                new TextRun({text: 'Anexa 6', font: 'Calibri', size: 24, color: '#305598'}),
                new TextRun({text: 'Facultatea de Informatică', font: 'Calibri', size: 24, break: 1}),
                new TextRun({text: 'Şcoala Doctorală de Informatică', font: 'Calibri', size: 24, break: 1}),
            ],
        });

        const presentationDate = UtilService.simpleStringDate(data.presentationDate);

        /* Title */
        const title = new Paragraph({
            children: [
                new TextRun({text: 'PROCES-VERBAL', font: 'Calibri', size: 28, bold: true, break: 2}),
                new TextRun({text: '', font: 'Calibri', size: 24, bold: true, break: 1}),
                new TextRun({text: `Din data de ${presentationDate}`, font: 'Calibri', size: 24, break: 1}),
                new TextRun({text: `Privind raportul ştiinţific de doctorat susţinut de`, font: 'Calibri', size: 24, break: 1}),
                new TextRun({text: `Domnul/Doamna`, font: 'Calibri', size: 24, break: 1}),
                new TextRun({text: `${data.name}`, font: 'Calibri', size: 24, break: 1}),
                new TextRun({text: `(Numele şi prenumele doctorandului)`, font: 'Calibri', size: 20, break: 1}),
            ],
            alignment: AlignmentType.CENTER
        });

        const details = new Paragraph({
            children: [
                new TextRun({text: `Înmatriculat la doctorat în anul ${data.attendanceYear}, în domeniul INFORMATICĂ`, font: 'Calibri', size: 24, break: 2}),
                new TextRun({text: `Tema raportului ştiinţific susţinut "${data.thesisTitle}"`, font: 'Calibri', size: 24, break: 1}),
            ],
            alignment: AlignmentType.START,
        });

        const tableRows = VerbalProcessService.getTableRows(data.rows);

        const table = new Table({
            rows: [
                /* Header */
                new TableRow({
                    children: [
                        new TableCell({
                            children: [DocxUtils.customParagraph('Nr. Crt', {size: 24})],
                            width: {size: 4, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            children: [DocxUtils.customParagraph('Comisia de îndrumare', {size: 24})],
                            width: {size: 24, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            children: [DocxUtils.customParagraph('Numele şi prenumele', {size: 24})],
                            width: {size: 24, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            children: [DocxUtils.customParagraph('Calificativul', {size: 24})],
                            width: {size: 24, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            children: [DocxUtils.customParagraph('Semnătura', {size: 24})],
                            width: {size: 24, type: WidthType.PERCENTAGE},
                        }),
                    ]
                }),

                ...tableRows,
            ],
            width: DocxUtils.tableFill,
            margins: DocxUtils.tableMargins,
        });

        const footer = new Paragraph({
            children: [
                new TextRun({text: 'În urma prezentării raportului ştiinţific doctorandul a obţinut calificativul final .......................', font: 'Calibri', size: 24, break: 1}),
                new TextRun({text: 'Observaţii şi recomandări:', font: 'Calibri', size: 24, break: 2}),
                new TextRun({text: '...............................................................................................................................' +
                        '....................................................................................................................................................' +
                        '....................................................................................................................................................' +
                        '....................................................................................................................................................' +
                        '....................................................................................................................................................' +
                        '....................................................................................................................................................' +
                        '....................................................................................................................................................' +
                        '', font: 'Calibri', size: 24}),

                new TextRun({text: `Conducător ştiinţific:`, font: 'Calibri', size: 24, break: 2}),
                new TextRun({text: `${data.coordinatorFunction} ${data.coordinatorName}`, font: 'Calibri', size: 24, break: 1}),
            ],
        });

        /* Creating the document */
        const doc = new Document({
            sections: [
                {
                    children: [
                        header,
                        title,
                        details,
                        DocxUtils.customParagraph('', {size: 24, break: 2}),
                        table,
                        footer,
                    ]
                }
            ]
        });

        return await Packer.toBuffer(doc);
    }

    private static getTableRows(rows: VerbalProcessTableRow[]): TableRow[] {
        const tableRows: TableRow[] = [];

        for (let row of rows) {
            tableRows.push(new TableRow({
                children: [
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.number}`, {size: 24})]
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.commission}`, {size: 24})]
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.coordinatorName}`, {size: 24})]
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(``, {size: 24})]
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(``, {size: 24})]
                    }),
                ],
            }));
        }

        return tableRows;
    }

}