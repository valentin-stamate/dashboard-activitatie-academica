import {BorderStyle, convertInchesToTwip, Paragraph, TextRun, WidthType} from "docx";

export class DocxUtils {
    public static borderSize = 1;
    public static borderColor = 'ff0000';

    public static tableMargins = {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
    }

    /* Some configuration */
    public static borderNone = {
        top: {
            style: BorderStyle.NONE,
            size: DocxUtils.borderSize,
            color: DocxUtils.borderColor,
            space: 10,
        },
        bottom: {
            style: BorderStyle.NONE,
            size: DocxUtils.borderSize,
            color: DocxUtils.borderColor,
            space: 10,
        },
        left: {
            style: BorderStyle.NONE,
            size: DocxUtils.borderSize,
            color: DocxUtils.borderColor,
            space: 10,
        },
        right: {
            style: BorderStyle.NONE,
            size: DocxUtils.borderSize,
            color: DocxUtils.borderColor,
            space: 10,
        },
    };

    public static tableFill = {
        size: 100,
        type: WidthType.PERCENTAGE,
    };

    /* Helper function */
    public static customParagraph(text: string, options: any = {}) {
        return new Paragraph({
            children: [new TextRun({text: text, font: 'Calibri', ...options})]
        });
    }

}