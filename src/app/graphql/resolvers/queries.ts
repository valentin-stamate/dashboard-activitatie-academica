import {cons} from "../../script/cons";

export const queries = {
    hello: async () => {
        return 'Hello!';
    },
    getStudentsData: async ({user, password}: any) => {

        if (user === 'adriana.bejinariu' && password === 'u^*&9jy8da-02eic-lwvun4') {
            return `http://localhost:8080/${cons.downloadKey}`;
        }

        throw new Error("Invalid credentials");
    }
}