import {UserService} from "../../../service/user.service";

export const MutationUnknown = {
    signUpUser: async ({user}: any) => {
        const service = new UserService();

        const response = await service.signUpUser(user);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
    },

    sendAuthKey: async ({user}: any) => {
        const service = new UserService();

        const response = await service.sendAuthKey(user);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
    },

    logInUser: async ({user, authKey}: any) => {
        const service = new UserService();

        const response = await service.logInUser(user, authKey);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },
}