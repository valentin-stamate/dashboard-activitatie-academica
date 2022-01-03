import {UserService} from "../../../service/user.service";
import {UserAdminService} from "../../../service/user.admin.service";

export const MutationAdmin = {
    deactivateUser: async ({user}: any) => {
        const service = new UserAdminService();

        const response = await service.deactivateUser(user);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    activateUser: async ({user}: any) => {
        const service = new UserAdminService();

        const response = await service.activateUser(user);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    makeAdminUser: async ({user}: any) => {
        const service = new UserAdminService();

        const response = await service.makeUserAdmin(user);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    removeAdminUser: async ({user}: any) => {
        const service = new UserAdminService();

        const response = await service.removeUserAdmin(user);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    addId: async ({id}: any) => {
        const service = new UserAdminService();

        const response = await service.addId(id);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    removeId: async ({id}: any) => {
        const service = new UserAdminService();

        const response = await service.removeId(id);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    removeUser: async ({user}: any) => {
        const service = new UserAdminService();

        const response = await service.removeUser(user);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },
}