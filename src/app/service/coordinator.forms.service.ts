import {Coordinator} from "../database/models";
import {CoordinatorReferentialActivity, CoordinatorScientificActivity} from "../database/form.models";

export class CoordinatorFormsService {

    /** Activitatea științifică a conducatorului de doctorat */
    static async getCoordinatorScientificActivity(coordinator: Coordinator): Promise<CoordinatorScientificActivity[]> {
        return [];
    }

    static async addCoordinatorScientificActivity(coordinator: Coordinator, data: CoordinatorScientificActivity): Promise<void> {

    }

    static async updateCoordinatorScientificActivity(coordinator: Coordinator, formId: number, data: CoordinatorScientificActivity): Promise<void> {

    }

    static async deleteCoordinatorScientificActivity(coordinator: Coordinator, formId: number): Promise<void> {

    }

    /** Activitatea referențială a conducătorului de doctorat/abilitat de la IOSU-UAIC */
    static async getCoordinatorReferentialActivity(coordinator: Coordinator): Promise<CoordinatorScientificActivity[]> {
        return [];
    }

    static async addCoordinatorReferentialActivity(coordinator: Coordinator, data: CoordinatorReferentialActivity): Promise<void> {

    }

    static async updateCoordinatorReferentialActivity(coordinator: Coordinator, formId: number, data: CoordinatorReferentialActivity): Promise<void> {

    }

    static async deleteCoordinatorReferentialActivity(coordinator: Coordinator, formId: number): Promise<void> {

    }

}