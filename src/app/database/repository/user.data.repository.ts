/** Used for getting data asociated to a user. */
import {InformationForm, User} from "../models";
import {QueryDB} from "../connection";

export abstract class UserDataRepository {

    static async getInformation(user: User) {
        const query = `SELECT i.id, i.full_name, i.marriage_name, i.thesis_coordinator, i.founding, i.completion_date 
                       FROM (SELECT * FROM users WHERE user_id = $1) u 
                       JOIN user_information ui ON u.user_id = ui.user_id
                       JOIN information i ON i.id = ui.form_id;`

        try {
            const {rows} = await QueryDB(query, [user.userId]);

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