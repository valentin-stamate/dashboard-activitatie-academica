import {GqlResponse, responseMessages} from "./types";
import {FileService} from "../../script/service/file";
import {cons} from "../../script/cons";
import {CsvFile} from "../../script/service/csv";
import {columnOrder, columnOrderMap, columnOrderWithName} from "../../script/util/students_file";

export const mutations = {
    sendForm: async ({form}: any) => {
        const studentId = form.studentId;

        console.log(form)

        const idRegex = new RegExp('([0-9]+[A-Z]+[0-9]+)');

        if (!idRegex.test(studentId) && studentId.length < 10) {
            throw new Error(`Invalid format for student id: '${studentId}'.`);
        }

        const studentsIds = FileService.read(cons.studentsIds);

        if (studentsIds.includes(studentId)) {
            CsvFile.appendRow(cons.studentsCSVPath, form, columnOrder, columnOrderWithName, columnOrderMap, ';');
        } else {
            throw new Error(`Student id: '${studentId}' is invalid.`);
        }

        return new GqlResponse(responseMessages.OK);
    }
}