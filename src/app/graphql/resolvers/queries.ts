import {Information, User} from "../../database/models";
import {TablesCrudRepository} from "../../database/repository/crud/tables.crud.repository";
import {UserRepository} from "../../database/repository/user.repository";
import {TablesRepository} from "../../database/repository/tables.repository";

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
        const user = new User(uRows[0]);

        await TablesRepository.addInformation({...informationDemo, owner: user.id});

        console.log(await TablesRepository.getInformationByOwner(user));


        return 'Hello!';
    }
}