import {User} from "../../database/models";

export const Query = {
    hello: async () => {
        return 'Hello!';
    },

    user: async ({id}: any) => {
        return {identifier: 'dassd' + id};
    }
}