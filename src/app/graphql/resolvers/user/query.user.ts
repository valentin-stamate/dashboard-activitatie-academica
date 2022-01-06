import {UserService} from "../../../service/user.service";

export const QueryUser = {
    getAllForms: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getAllForms(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },
}