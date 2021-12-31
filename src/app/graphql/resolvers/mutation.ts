import {User} from "../../database/models";
import {UserService} from "../../service/user.service";

export const Mutation = {
    signUpUser: async ({user}: {user: User}) => {
        const service = new UserService();

        const response = await service.signUpUser(user);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
    },

    sendAuthKey: async ({user}: {user: User}) => {
        const service = new UserService();

        const response = await service.sendAuthKey(user);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
    },

    logInUser: async ({user, authKey}: {user: User, authKey: string}) => {
        const service = new UserService();

        const response = await service.logInUser(user, authKey);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },
}