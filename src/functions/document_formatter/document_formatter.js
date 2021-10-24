const fs = require('fs');
const path = require('path');
const {print, executeSync} = require("graphql");
const {exec, execSync} = require('child_process');

class DocumentFormatter {

    constructor() {}

    replaceText(text, map) {
        let replaced = text;

        for (const line of map) {
            replaced = replaced.split(`R_${line[0]}`).join(line[1]);
        }

        return replaced;
    }

    getFileContent(filePath) {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (err) {
            console.log(err);
        }

        return undefined;
    }

    createFile(filePath, content) {
        try {
            fs.writeFileSync(filePath, content, 'utf8');
        } catch (err) {
            console.log(err);
        }

        return undefined;
    }

    convertRTFtoPDF(filePath, outdir) {
        try {
            const out = execSync(`soffice --headless --convert-to pdf ${filePath} --outdir ${outdir}`);
            console.log(out.toString());
        } catch (err) {
            console.log(err);
        }
    }

}

async function main() {
    let docForm = new DocumentFormatter();

    const map = [
        ['date', "25.10.2021"],
        ['candidate_name', 'Alexandru Stan'],
        ['year', '2021'],
        ['full_name', 'Alexandru Stan'],
        ['coordinator_name', 'Alboaie Lenuta']
    ];

    const docPath = "doc_template";
    const fileName = "file.rtf";

    const filePath = path.join(docPath, fileName);
    const parsed = path.parse(filePath);

    let content = docForm.getFileContent(filePath);

    let newContent = docForm.replaceText(content, map);

    const newFilePath = path.join(docPath, parsed.name + '_new.rtf');

    docForm.createFile(newFilePath, newContent);
    docForm.convertRTFtoPDF(newFilePath, 'doc_template');

}

main();
