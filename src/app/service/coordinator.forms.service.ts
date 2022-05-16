import {Coordinator} from "../database/models";
import {CoordinatorReferentialActivity, CoordinatorScientificActivity} from "../database/form.models";
import {UtilService} from "../services/util.service";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {
    CoordinatorReferentialActivityModel,
    CoordinatorScientificActivityModel,
    ScientificArticleISIModel
} from "../database/sequelize";

export class CoordinatorFormsService {

    /** Activitatea științifică a conducatorului de doctorat */
    static async getCoordinatorScientificActivity(coordinator: Coordinator): Promise<CoordinatorScientificActivity[]> {
        return (await CoordinatorScientificActivityModel.findAll({
            where: {ownerId: coordinator.id},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addCoordinatorScientificActivity(coordinator: Coordinator, data: CoordinatorScientificActivity): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await CoordinatorScientificActivityModel.create({
            ...data,
            ownerId: coordinator.id,
        });
        return;
    }

    static async updateCoordinatorScientificActivity(coordinator: Coordinator, formId: number, data: CoordinatorScientificActivity): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await CoordinatorScientificActivityModel.findOne({
            where: {
                id: formId,
                ownerId: coordinator.id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteCoordinatorScientificActivity(coordinator: Coordinator, formId: number): Promise<void> {
        const row = await CoordinatorScientificActivityModel.findOne({
            where: {
                id: formId,
                ownerId: coordinator.id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Activitatea referențială a conducătorului de doctorat/abilitat de la IOSU-UAIC */
    static async getCoordinatorReferentialActivity(coordinator: Coordinator): Promise<CoordinatorScientificActivity[]> {
        return (await CoordinatorReferentialActivityModel.findAll({
            where: {ownerId: coordinator.id},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addCoordinatorReferentialActivity(coordinator: Coordinator, data: CoordinatorReferentialActivity): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await CoordinatorReferentialActivityModel.create({
            ...data,
            ownerId: coordinator.id,
        });
        return;
    }

    static async updateCoordinatorReferentialActivity(coordinator: Coordinator, formId: number, data: CoordinatorReferentialActivity): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await CoordinatorReferentialActivityModel.findOne({
            where: {
                id: formId,
                ownerId: coordinator.id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteCoordinatorReferentialActivity(coordinator: Coordinator, formId: number): Promise<void> {
        const row = await CoordinatorReferentialActivityModel.findOne({
            where: {
                id: formId,
                ownerId: coordinator.id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

}