import {UserAdminService} from "../../../service/user.admin.service";

export const QueryAdmin = {
    allUsers: async ({authToken}: any) => {
        const service = new UserAdminService();

        const response = await service.getAllUsers(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

}