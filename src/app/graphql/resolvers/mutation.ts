import {User} from "../../database/models";
import {GqlResponse} from "./types";
import {UserService} from "../../service/user.service";

export const Mutation = {
    addUser: async ({user}: {user: User}) => {
        const service = new UserService();

        const response = await service.addUser(user);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
    },
}