import {Information, User} from "../../database/models";
import {DatabaseRepository} from "../../database/repository/crud/database.repository";
import {TablesCrudRepository} from "../../database/repository/crud/tables.crud.repository";
import {UserRepository} from "../../database/repository/user.repository";
import {TablesCrudRelationsRepository} from "../../database/repository/crud/tables.crud.relations.repository";

const userDemo = new User({
    identifier: 'valentin',
    email: 'valentin@gmail.com',
    password: '123456789',
});

const informationDemo: Information = new Information({
    full_name: 'Valentin',
    marriage_name: '-',
    thesis_coordinator: 'somebody',
    founding: 'buget',
    completion_date: '12-12-20',
});

export const queries = {
    hello: async () => {

        // await DatabaseRepository.deleteDatabaseTables();
        // await DatabaseRepository.createDatabaseTables();

        // await TablesCrudRepository.addInformation(informationDemo);
        await UserRepository.addUser(userDemo);

        const user = await UserRepository.getUserByIdentifier('valentin');

        // await TablesCrudRelationsRepository.addUserInformation();

        console.log(await UserRepository.allUsers());

        // console.log(await UserRepository.allUsers());
        // console.log(await UserRepository.addUser(demoUser));
        // console.log(await UserRepository.activateUser(demoUser));
        // console.log(await UserDataRepository.getUserInformation(demoUser));

        return 'Hello!';
    }
}