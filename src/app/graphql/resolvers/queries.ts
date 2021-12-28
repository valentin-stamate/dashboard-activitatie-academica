import {User} from "../../database/models";
import {DatabaseRepository} from "../../database/repository/crud/database.repository";

const demoUser = new User({
    user_id: 'valentin',
    email: 'valentin@gmail.com',
    password: '123456789',
});

export const queries = {
    hello: async () => {

        await DatabaseRepository.deleteDatabaseTables();
        await DatabaseRepository.createDatabaseTables();

        // console.log(await UserRepository.allUsers());
        // console.log(await UserRepository.addUser(demoUser));
        // console.log(await UserRepository.activateUser(demoUser));
        // console.log(await UserDataRepository.getUserInformation(demoUser));

        return 'Hello!';
    }
}