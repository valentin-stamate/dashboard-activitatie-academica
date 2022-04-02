import {AlignmentType, BorderStyle, convertInchesToTwip, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType, Document} from "docx";
import {TimetableHeaders} from "./xlsx.service";

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
        const borderSize = 1;
        const borderColor = 'ff0000';

        /* Some configuration */
        const borderNone = {
            top: {
                style: BorderStyle.NONE,
                size: borderSize,
                color: borderColor,
                space: 10,
            },
            bottom: {
                style: BorderStyle.NONE,
                size: borderSize,
                color: borderColor,
                space: 10,
            },
            left: {
                style: BorderStyle.NONE,
                size: borderSize,
                color: borderColor,
                space: 10,
            },
            right: {
                style: BorderStyle.NONE,
                size: borderSize,
                color: borderColor,
                space: 10,
            },
        };

        const tableMargins = {
            top: convertInchesToTwip(0.05),
            bottom: convertInchesToTwip(0.05),
            right: convertInchesToTwip(0.05),
            left: convertInchesToTwip(0.05),
        }

        const tableFill = {
            size: 100,
            type: WidthType.PERCENTAGE,
        };

        /* Header */
        const headerLeft = new Paragraph({
            children: [
                new TextRun({text: 'Universitatea "Alexandru Ioan Cuza" din Iași', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Facultatea de Informatică', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Școala Doctorală', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Nume și Prenume: ${data.professorName}`, font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Grad didactic: ${data.professorPosition}`, font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Poziția în statul de funcțiuni: ${data.professorPosition}`, font: 'Calibri', size: 21, break: 1}),
            ],
        });

        const headerRight = new Paragraph({
            children: [
                new TextRun({text: 'Se aprobă,', font: 'Calibri', size: 21, break: 1}),
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
                            borders: borderNone,
                        }),
                        new TableCell({
                            children: [headerRight],
                            borders: borderNone,
                        })
                    ]
                }),
            ],
            width: tableFill,
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
                            children: [FAZService.customParagraph('Ziua')],
                            width: {size: 5, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [FAZService.customParagraph('Intervalul Orar')],
                            width: {size: 15, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [FAZService.customParagraph('Disciplina și specializare')],
                            width: {size: 25, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [FAZService.customParagraph('Anul')],
                            width: {size: 5, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 1,
                            columnSpan: 4,
                            children: [FAZService.customParagraph('Nivelul de studii și tip de activitate Doctorat')],
                            width: {size: 40, type: WidthType.PERCENTAGE},
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [FAZService.customParagraph('Număr de ore fizice efectuate pe săptămână')],
                            width: {size: 10, type: WidthType.PERCENTAGE},
                        }),
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            rowSpan: 1,
                            children: [FAZService.customParagraph('Curs (CAD)')],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [FAZService.customParagraph('Seminar (SAD)')],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [FAZService.customParagraph('Îndrumare teza de doctorat (TD)')],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [FAZService.customParagraph('Membru comisie îndrumare doctorat (CSRD)')],
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
                            children: [FAZService.customParagraph('Total ore fizice:')]
                        }),
                        new TableCell({children: [FAZService.customParagraph(`${totalCADHours} CAD`)]}),
                        new TableCell({children: [FAZService.customParagraph(`${totalSADHours} SAD`)]}),
                        new TableCell({children: [FAZService.customParagraph(`${totalTDHours} TD`)]}),
                        new TableCell({children: [FAZService.customParagraph(`${totalCSRDHours} CSRD`)]}),
                        new TableCell({children: [FAZService.customParagraph(`${totalHours} TOTAL`)]}),
                    ]
                }),
            ],
            width: tableFill,
            margins: tableMargins,
        });

        const fazNote = FAZService.customParagraph('În semestrul I, anul universitar 2021-2022 datorită virusului COVID-19, activitatea didactică s-a desfășurat în sistem online conform orarului stabilit.');

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
                        children: [FAZService.customParagraph(`${row.day}`)],
                    }),
                    new TableCell({
                        children: [FAZService.customParagraph(row.interval)],
                    }),
                    new TableCell({
                        children: [FAZService.customParagraph(row.discipline)],
                    }),
                    new TableCell({
                        children: [FAZService.customParagraph(`${row.year}`)],
                    }),
                    new TableCell({
                        children: [FAZService.customParagraph(row.cad)],
                    }),
                    new TableCell({
                        children: [FAZService.customParagraph(row.sad)],
                    }),
                    new TableCell({
                        children: [FAZService.customParagraph(row.td)],
                    }),
                    new TableCell({
                        children: [FAZService.customParagraph(row.csrd)],
                    }),
                    new TableCell({
                        children: [FAZService.customParagraph(`${row.hours}`)],
                    }),
                ]
            }));
        }

        return tableRows;
    }

    /* Helper function */
    private static customParagraph(text: string, options: any = {}) {
        return new Paragraph({
            children: [new TextRun({text: text, font: 'Calibri', ...options})]
        });
    }
}