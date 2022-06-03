import {CoordinatorModel} from "../database/db.models";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {
    CoordinatorReferentialActivityModel,
    CoordinatorScientificActivityModel
} from "../database/forms/db.coordinator.forms";
import {dbConnection} from "../database/connect";

export class CoordinatorFormsService {

    /** Activitatea științifică a conducatorului de doctorat */
    static async getCoordinatorScientificActivity(coordinator: CoordinatorModel): Promise<CoordinatorScientificActivityModel[]> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinator.id,
            },
            relations: [
                'scientificActivity',
            ]
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        if (existingCoordinator.scientificActivity == null) {
            return [];
        }

        return [existingCoordinator.scientificActivity];
    }

    static async updateCoordinatorScientificActivity(coordinator: CoordinatorModel, data: CoordinatorScientificActivityModel): Promise<void> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
        const scientificActivityRepo = dbConnection.getRepository(CoordinatorScientificActivityModel);

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinator.id,
            },
            relations: ["scientificActivity"],
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const existingScientificActivity = existingCoordinator.scientificActivity;

        if (existingScientificActivity == null) {
            const scientificActivity = CoordinatorScientificActivityModel.fromObject(data);
            await scientificActivityRepo.save(scientificActivity);

            existingCoordinator.scientificActivity = scientificActivity;
            await coordinatorRepo.save(existingCoordinator);
            return;
        }

        existingScientificActivity.update(data);
        await scientificActivityRepo.save(existingScientificActivity);
        return;
    }

    static async deleteCoordinatorScientificActivity(coordinator: CoordinatorModel): Promise<void> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
        const scientificActivityRepo = dbConnection.getRepository(CoordinatorScientificActivityModel);

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinator.id,
            },
            relations: ["scientificActivity"],
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const existingScientificActivity = existingCoordinator.scientificActivity;

        if (existingScientificActivity == null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await scientificActivityRepo.remove(existingScientificActivity);
        return;
    }

    /** Activitatea referențială a conducătorului de doctorat/abilitat de la IOSU-UAIC */
    static async getCoordinatorReferentialActivity(coordinator: CoordinatorModel): Promise<CoordinatorReferentialActivityModel[]> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinator.id,
            },
            relations: ["referentialActivity"],
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        if (existingCoordinator.referentialActivity == null) {
            return [];
        }

        return [existingCoordinator.referentialActivity];
    }

    static async updateCoordinatorReferentialActivity(coordinator: CoordinatorModel, data: CoordinatorReferentialActivityModel): Promise<void> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
        const referentialActivityRepo = dbConnection.getRepository(CoordinatorReferentialActivityModel);

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinator.id,
            },
            relations: ["referentialActivity"],
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const existingReferentialActivity = existingCoordinator.referentialActivity;

        if (existingReferentialActivity == null) {
            const referentialActivity = CoordinatorReferentialActivityModel.fromObject(data);
            await referentialActivityRepo.save(referentialActivity);

            existingCoordinator.referentialActivity = referentialActivity;
            await coordinatorRepo.save(existingCoordinator);
            return;
        }

        existingReferentialActivity.update(data);
        await referentialActivityRepo.save(existingReferentialActivity);
        return;
    }

    static async deleteCoordinatorReferentialActivity(coordinator: CoordinatorModel): Promise<void> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
        const referentialActivityRepo = dbConnection.getRepository(CoordinatorReferentialActivityModel);

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinator.id,
            },
            relations: ["referentialActivity"],
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const existingReferentialActivity = existingCoordinator.referentialActivity;

        if (existingReferentialActivity == null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await referentialActivityRepo.remove(existingReferentialActivity);
        return;
    }

}