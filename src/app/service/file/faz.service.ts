import {AlignmentType, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType, Document} from "docx";
import {DocxUtils} from "./docx.utils";

const monthMap = [
  'Ianuarie',
  'Februarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decembrie',
];

export interface FAZDayActivity {
    day: number;
    interval: string;
    discipline: string;
    year: string;
    cad: string;
    sad: string;
    td: string;
    csrd: string;
    hours: number;

    /* Suplimentar */
    weekDay: string;
}

export interface FAZData {
    professorName: string;
    professorPosition: string;
    month: number;
    year: number;
    monthlyActivity: FAZDayActivity[];
}

export class FAZService {
    static async getDOCXBuffer(data: FAZData): Promise<Buffer> {

        /* Header */
        const headerLeft = new Paragraph({
            children: [
                new TextRun({text: 'Universitatea "Alexandru Ioan Cuza" din Iași', font: 'Calibri', size: 21}),
                new TextRun({text: 'Facultatea de Informatică', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Școala Doctorală', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Nume și Prenume: ${data.professorName}`, font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Grad didactic: ${data.professorPosition}`, font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Poziția în statul de funcțiuni: ${data.professorPosition}`, font: 'Calibri', size: 21, break: 1}),
            ],
        });

        const headerRight = new Paragraph({
            children: [
                new TextRun({text: 'Se aprobă,', font: 'Calibri', size: 21}),
                new TextRun({text: 'Director Școala Doctorală,', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Prof. univ. dr. Lenuța Alboaie', font: 'Calibri', size: 21, break: 1}),
            ],
            alignment: AlignmentType.RIGHT,
        });

        const headerTable = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [headerLeft],
                            borders: DocxUtils.borderNone,
                        }),
                        new TableCell({
                            children: [headerRight],
                            borders: DocxUtils.borderNone,
                        })
                    ]
                }),
            ],
            width: DocxUtils.tableFill,
        });

        /* Title */
        const title = new Paragraph({
            children: [
                new TextRun({text: 'FIȘA DE ACTIVITATE ZILNICĂ', font: 'Calibri', size: 36, bold: true, break: 1}),
                new TextRun({text: 'Activități normate în statul de funcții', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Luna ${monthMap[data.month]} Anul ${data.year}`, font: 'Calibri', size: 21, break: 1}),
            ],
            alignment: AlignmentType.CENTER
        });

        const fazRows = FAZService.generateDOCXRows(data.monthlyActivity);

        /* Calculate the total hours in a month */
        let totalCADHours = 0;
        let totalSADHours = 0;
        let totalTDHours = 0;
        let totalCSRDHours = 0;

        for (let row of data.monthlyActivity) {
            if (row.cad !== '') {
                totalCADHours += row.hours;
            }

            if (row.sad !== '') {
                totalSADHours += row.hours;
            }

            if (row.td !== '') {
                totalTDHours += row.hours;
            }

            if (row.csrd !== '') {
                totalCSRDHours += row.hours;
            }
        }

        totalCADHours = parseFloat(totalCADHours.toFixed(2));
        totalSADHours = parseFloat(totalSADHours.toFixed(2));
        totalTDHours = parseFloat(totalTDHours.toFixed(2));
        totalCSRDHours = parseFloat(totalCSRDHours.toFixed(2));

        const totalHours = totalCADHours + totalSADHours + totalTDHours + totalCSRDHours;

        /* Table */
        const fazTable = new Table({
            rows: [
                /* Header */
                new TableRow({
                    children: [
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Ziua', {size: 16})],
                            width: {size: 5, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Intervalul Orar', {size: 16})],
                            width: {size: 15, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Disciplina și specializare', {size: 16})],
                            width: {size: 25, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Anul', {size: 16})],
                            width: {size: 5, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 1,
                            columnSpan: 4,
                            children: [DocxUtils.customParagraph('Nivelul de studii și tip de activitate Doctorat', {size: 16})],
                            width: {size: 40, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Număr de ore fizice efectuate pe săptămână', {size: 16})],
                            width: {size: 10, type: WidthType.PERCENTAGE},
                        }),
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            rowSpan: 1,
                            children: [DocxUtils.customParagraph('Curs (CAD)', {size: 16})],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [DocxUtils.customParagraph('Seminar (SAD)', {size: 16})],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [DocxUtils.customParagraph('Îndrumare teza de doctorat (TD)', {size: 16})],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [DocxUtils.customParagraph('Membru comisie îndrumare doctorat (CSRD)', {size: 16})],
                        }),
                    ]
                }),

                /* The actual rows */
                ...fazRows,

                /* Result */
                new TableRow({
                    children: [
                        new TableCell({
                            columnSpan: 4,
                            children: [DocxUtils.customParagraph('Total ore fizice:', {size: 16})]
                        }),
                        new TableCell({children: [DocxUtils.customParagraph(`${totalCADHours} CAD`, {size: 16})]}),
                        new TableCell({children: [DocxUtils.customParagraph(`${totalSADHours} SAD`, {size: 16})]}),
                        new TableCell({children: [DocxUtils.customParagraph(`${totalTDHours} TD`, {size: 16})]}),
                        new TableCell({children: [DocxUtils.customParagraph(`${totalCSRDHours} CSRD`, {size: 16})]}),
                        new TableCell({children: [DocxUtils.customParagraph(`${totalHours} TOTAL`, {size: 16})]}),
                    ]
                }),
            ],
            width: DocxUtils.tableFill,
            margins: DocxUtils.tableMargins,
        });

        const fazNote = DocxUtils.customParagraph('În semestrul I, anul universitar 2021-2022 datorită virusului COVID-19, activitatea didactică s-a desfășurat în sistem online conform orarului stabilit.');

        const footer = new Paragraph({
            children: [
                new TextRun({text: `${data.professorPosition} ${data.professorName}`, font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Semnătura', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: '_______________', font: 'Calibri', size: 21, break: 1}),
            ],
            alignment: AlignmentType.END
        });

        const doc = new Document({
            sections: [
                {
                    children: [
                        headerTable,
                        title,
                        new Paragraph(''),
                        new Paragraph(''),
                        fazTable,
                        fazNote,
                        new Paragraph(''),
                        footer,
                    ],
                },
            ],
        });

        return await Packer.toBuffer(doc);
    }
    
    private static generateDOCXRows(rows: FAZDayActivity[]): TableRow[] {
        const tableRows: TableRow[] = [];

        for (let row of rows) {
            tableRows.push(new TableRow({
                children: [
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.day}`, {size: 16})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.interval, {size: 16})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.discipline, {size: 16})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.year}`, {size: 16})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.cad, {size: 16})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.sad, {size: 16})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.td, {size: 16})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.csrd, {size: 16})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.hours}`, {size: 16})],
                    }),
                ]
            }));
        }

        return tableRows;
    }

}