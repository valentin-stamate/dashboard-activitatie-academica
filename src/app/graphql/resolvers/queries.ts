import {Information, User} from "../../database/models";
import {TablesCrudRepository} from "../../database/repository/crud/tables.crud.repository";
import {UserRepository} from "../../database/repository/user.repository";

const userDemo = new User({
    identifier: 'valengggtin',
    email: 'valentidsfn@gmail.com',
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
        const uRows = await UserRepository.addUser(userDemo);
        const iRows = await TablesCrudRepository.addInformation(informationDemo);

        const user = new User(uRows[0]);
        const info = new Information(iRows[0]);

        // await TablesCrudRelationsRepository.addUserInformation();

        console.log(await UserRepository.getUserInformation(user));

        // console.log(await UserRepository.allUsers());
        // console.log(await UserRepository.addUser(demoUser));
        // console.log(await UserRepository.activateUser(demoUser));
        // console.log(await UserDataRepository.getUserInformation(demoUser));

        return 'Hello!';
    }
}