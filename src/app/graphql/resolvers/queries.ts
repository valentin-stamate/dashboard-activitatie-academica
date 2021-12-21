import {User} from "../../database/models";
import {UserDataRepository} from "../../database/repository/user.data.repository";

const demoUser = new User({
    user_id: 'valentin',
    email: 'valentin@gmail.com',
    password: '123456789',
});

export const queries = {
    hello: async () => {

        // console.log(await UserRepository.allUsers());
        // console.log(await UserRepository.addUser(demoUser));
        // console.log(await UserRepository.activateUser(demoUser));
        console.log(await UserDataRepository.getInformation(demoUser));

        return 'Hello!';
    }
}