/** Used for getting data asociated to a user. */
import {InformationForm, User} from "../models";
import {QueryDB} from "../connection";

export abstract class UserDataRepository {

    static async getInformation(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_information ui ON u.id = ui.user_id
                       JOIN information r ON r.id = ui.relation_id;`

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new InformationForm(rows[0]);
        }
         catch (e) {
            console.log(e);
        }

        return null;
    }

}