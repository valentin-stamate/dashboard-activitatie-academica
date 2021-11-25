import {GqlResponse, responseMessages} from "./types";
import {FileService} from "../../script/service/file_service";
import {cons} from "../../script/cons";

export const mutations = {
    sendForm: async ({form}: any) => {
        const studentId = form.studentId;

        const studentsIds = FileService.read(cons.studentsIds);

        if (studentsIds.includes(studentId)) {
            FileService.appendCSVLine(cons.studentsCSVPath, cons.formNames, form);
        } else {
            throw new Error(`Student id: '${studentId}' is invalid.`);
        }

        return new GqlResponse(responseMessages.OK);
    }
}