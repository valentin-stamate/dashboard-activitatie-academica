import {cons} from "../../script/cons";
import {CsvFile} from "../../script/service/csv";
import {columnOrder, columnOrderMap, columnOrderWithName} from "../../script/util/students_file";

export const queries = {
    hello: async () => {


        if (!CsvFile.appendRow(cons.studentsCSVPath, {studentId: 'vfdgdfgdg'}, columnOrder, columnOrderWithName, columnOrderMap, ';')) {
            throw new Error("Error");
        }

        return 'Hello!';
    },
    getStudentsData: async ({user, password}: any) => {

        if (user === 'adriana.bejinariu' && password === 'u^*&9jy8da-02eic-lwvun4') {
            return `http://localhost:8080/${cons.downloadKey}`;
        }

        throw new Error("Invalid credentials");
    }
}