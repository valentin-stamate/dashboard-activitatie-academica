import {FAZData, FAZDayActivity, VerbalProcessData, VerbalProcessTableRow} from "./xlsx.models";
import {AlignmentType, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType} from "docx";
import {DocxUtils} from "./docx.utils";
import {UtilService} from "../util.service";

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

export class DocxService {

    /* Faz */
    static async getFazDOCXBuffer(data: FAZData, afterTableNote: string): Promise<Buffer> {
        const font = 'Calibri';
        
        /* Header */
        const headerLeft = new Paragraph({
            children: [
                new TextRun({text: 'Universitatea "Alexandru Ioan Cuza" din Iași', font: font, size: 21}),
                new TextRun({text: 'Facultatea de Informatică', font: font, size: 21, break: 1}),
                new TextRun({text: 'Școala Doctorală', font: font, size: 21, break: 1}),
                new TextRun({text: `Nume și Prenume: ${data.professorName}`, font: font, size: 21, break: 1}),
                new TextRun({text: `Grad didactic: ${data.professorFunction}`, font: font, size: 21, break: 1}),
                new TextRun({text: `Poziția în statul de funcțiuni: ${data.professorFunction}`, font: font, size: 21, break: 1}),
            ],
        });

        const headerRight = new Paragraph({
            children: [
                new TextRun({text: 'Se aprobă,', font: font, size: 21}),
                new TextRun({text: 'Director Școala Doctorală,', font: font, size: 21, break: 1}),
                new TextRun({text: 'Prof. univ. dr. Lenuța Alboaie', font: font, size: 21, break: 1}),
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
                new TextRun({text: 'FIȘA DE ACTIVITATE ZILNICĂ', font: font, size: 36, bold: true, break: 1}),
                new TextRun({text: 'Activități normate în statul de funcții', font: font, size: 21, break: 1}),
                new TextRun({text: `Luna ${monthMap[data.month]} Anul ${data.year}`, font: font, size: 21, break: 1}),
            ],
            alignment: AlignmentType.CENTER
        });

        const fazRows = DocxService.generateFazDOCXTableRows(data.monthlyActivity);

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
                            children: [DocxUtils.customParagraph('Ziua', {size: 16, font: font})],
                            width: {size: 5, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Intervalul Orar', {size: 16, font: font})],
                            width: {size: 15, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Disciplina și specializare', {size: 16, font: font})],
                            width: {size: 25, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Anul', {size: 16, font: font})],
                            width: {size: 5, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 1,
                            columnSpan: 4,
                            children: [DocxUtils.customParagraph('Nivelul de studii și tip de activitate Doctorat', {size: 16, font: font})],
                            width: {size: 40, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [DocxUtils.customParagraph('Număr de ore fizice efectuate pe săptămână', {size: 16, font: font})],
                            width: {size: 10, type: WidthType.PERCENTAGE},
                        }),
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            rowSpan: 1,
                            children: [DocxUtils.customParagraph('Curs (CAD)', {size: 16, font: font})],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [DocxUtils.customParagraph('Seminar (SAD)', {size: 16, font: font})],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [DocxUtils.customParagraph('Îndrumare teza de doctorat (TD)', {size: 16, font: font})],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [DocxUtils.customParagraph('Membru comisie îndrumare doctorat (CSRD)', {size: 16, font: font})],
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
                            children: [DocxUtils.customParagraph('Total ore fizice:', {size: 16, font: font})]
                        }),
                        new TableCell({children: [DocxUtils.customParagraph(totalCADHours !== 0 ? `${totalCADHours} CAD` : '', {size: 16, font: font})]}),
                        new TableCell({children: [DocxUtils.customParagraph(totalSADHours !== 0 ?`${totalSADHours} SAD` : '', {size: 16, font: font})]}),
                        new TableCell({children: [DocxUtils.customParagraph(totalTDHours !== 0 ? `${totalTDHours} TD` : '', {size: 16, font: font})]}),
                        new TableCell({children: [DocxUtils.customParagraph(totalCSRDHours !== 0 ? `${totalCSRDHours} CSRD` : '', {size: 16, font: font})]}),
                        new TableCell({children: [DocxUtils.customParagraph(`${totalHours} TOTAL`, {size: 16, font: font})]}),
                    ]
                }),
            ],
            width: DocxUtils.tableFill,
            margins: DocxUtils.tableMargins,
        });

        const fazNote = DocxUtils.customParagraph(`${afterTableNote}`, {size: 21, font: font});

        const footer = new Paragraph({
            children: [
                new TextRun({text: `${data.professorFunction} ${data.professorName}`, font: font, size: 21, break: 1}),
                new TextRun({text: 'Semnătura', font: font, size: 21, break: 1}),
                new TextRun({text: '_______________', font: font, size: 21, break: 1}),
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

    private static generateFazDOCXTableRows(rows: FAZDayActivity[]): TableRow[] {
        const font = 'Calibri';
        
        const tableRows: TableRow[] = [];

        for (let row of rows) {
            tableRows.push(new TableRow({
                children: [
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.day}`, {size: 16, font: font})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.interval, {size: 16, font: font})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.discipline, {size: 16, font: font})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.year}`, {size: 16, font: font})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.cad, {size: 16, font: font})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.sad, {size: 16, font: font})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.td, {size: 16, font: font})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(row.csrd, {size: 16, font: font})],
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.hours}`, {size: 16, font: font})],
                    }),
                ]
            }));
        }

        return tableRows;
    }

    /* Verbal Process */
    static async getVerbalProcessDOCXBuffer(data: VerbalProcessData): Promise<Buffer> {
        const font = 'Times New Roman';
        
        /* Header */
        const header = new Paragraph({
            children: [
                new TextRun({text: 'UNIVERSITATEA "ALEXANDRU IOAN CUZA" DIN IAŞI', font: font, size: 24}),
                new TextRun({text: '                                    ', font: font, size: 24}),
                new TextRun({text: 'Anexa 6', font: font, size: 24, color: '#305598'}),
                new TextRun({text: 'Facultatea de Informatică', font: font, size: 24, break: 1}),
                new TextRun({text: 'Şcoala Doctorală de Informatică', font: font, size: 24, break: 1}),
            ],
        });

        const presentationDate = UtilService.simpleStringDate(data.presentationDate);

        /* Title */
        const title = new Paragraph({
            children: [
                new TextRun({text: 'PROCES-VERBAL', font: font, size: 28, bold: true, break: 2}),
                new TextRun({text: '', font: font, size: 24, bold: true, break: 2}),
                new TextRun({text: `Din data de ${presentationDate}`, font: font, size: 24, break: 1}),
                new TextRun({text: `Privind raportul ştiinţific de doctorat susţinut de`, font: font, size: 24, break: 1}),
                new TextRun({text: `Domnul/Doamna`, font: font, size: 24, break: 1}),
                new TextRun({text: `${data.name}`, font: font, size: 24, break: 1}),
                new TextRun({text: `(Numele şi prenumele doctorandului)`, font: font, size: 20, break: 1}),
            ],
            alignment: AlignmentType.CENTER
        });

        const details = new Paragraph({
            children: [
                new TextRun({text: `Înmatriculat la doctorat în anul ${data.attendanceYear}, în domeniul INFORMATICĂ`, font: font, size: 24, break: 2}),
                new TextRun({text: `Tema raportului ştiinţific susţinut "${data.reportTitle}"`, font: font, size: 24, break: 2}),
            ],
            alignment: AlignmentType.START,
        });

        const tableRows = DocxService.getVerbalProcessTableRows(data.coordinators);

        const table = new Table({
            rows: [
                /* Header */
                new TableRow({
                    children: [
                        new TableCell({
                            children: [DocxUtils.customParagraph('Nr. Crt', {size: 24, font: font})],
                            width: {size: 4, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            children: [DocxUtils.customParagraph('Comisia de îndrumare', {size: 24, font: font})],
                            width: {size: 24, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            children: [DocxUtils.customParagraph('Numele şi prenumele', {size: 24, font: font})],
                            width: {size: 24, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            children: [DocxUtils.customParagraph('Calificativul', {size: 24, font: font})],
                            width: {size: 24, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            children: [DocxUtils.customParagraph('Semnătura', {size: 24, font: font})],
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
                new TextRun({text: 'În urma prezentării raportului ştiinţific doctorandul a obţinut calificativul final .......................', font: font, size: 24, break: 1}),
                new TextRun({text: 'Observaţii şi recomandări:', font: font, size: 24, break: 2}),
                new TextRun({text: '.................................................................................................................................' +
                        '......................................................................................................................................................' +
                        '......................................................................................................................................................' +
                        '......................................................................................................................................................' +
                        '......................................................................................................................................................' +
                        '......................................................................................................................................................' +
                        '......................................................................................................................................................' +
                        '......................................................................................................................................................' +
                        '......................................................................................................................................................' +
                        '', font: font, size: 24}),

                new TextRun({text: `Conducător ştiinţific:`, font: font, size: 24, break: 2}),
                new TextRun({text: `${data.coordinatorFunction} ${data.coordinatorName}`, font: font, size: 24, break: 1}),
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
                        DocxUtils.customParagraph('', {size: 24, break: 2, font: font}),
                        table,
                        footer,
                    ]
                }
            ]
        });

        return await Packer.toBuffer(doc);
    }

    private static getVerbalProcessTableRows(rows: VerbalProcessTableRow[]): TableRow[] {
        const font = 'Times New Roman';
        
        const tableRows: TableRow[] = [];

        for (let row of rows) {
            tableRows.push(new TableRow({
                children: [
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.number}`, {size: 24, font: font})]
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.commission}`, {size: 24, font: font})]
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(`${row.coordinatorName}`, {size: 24, font: font})]
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(``, {size: 24, font: font})]
                    }),
                    new TableCell({
                        children: [DocxUtils.customParagraph(``, {size: 24, font: font})]
                    }),
                ],
            }));
        }

        return tableRows;
    }

}