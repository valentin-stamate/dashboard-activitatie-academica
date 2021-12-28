import {User} from "../../database/models";
import {Database} from "../../database/repository/low/database";

const demoUser = new User({
    user_id: 'valentin',
    email: 'valentin@gmail.com',
    password: '123456789',
});

export const queries = {
    hello: async () => {

        await Database.deleteDatabaseTables();
        await Database.createDatabaseTables();

        // console.log(await UserRepository.allUsers());
        // console.log(await UserRepository.addUser(demoUser));
        // console.log(await UserRepository.activateUser(demoUser));
        // console.log(await UserDataRepository.getUserInformation(demoUser));

        return 'Hello!';
    }
}