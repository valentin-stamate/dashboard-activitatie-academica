import {UserService} from "../../../service/user.service";

export const MutationUser = {
    /* Informații */
    getInformation: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getInformation(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateInformation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateInformation(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteInformation: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteInformation(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Articole științifice publicate în extenso în reviste cotate... (ISI) */
    getScientificArticleISI: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getScientificArticleISI(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateScientificArticleISI: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateScientificArticleISI(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteScientificArticleISI: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteScientificArticleISI(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* ISI proceedings */
    getISIProceeding: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getISIProceeding(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateISIProceeding: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateISIProceeding(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteISIProceeding: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteISIProceeding(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Articole științifice publicate în extenso în revi... (BDI) */
    getScientificArticleBDI: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getScientificArticleBDI(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateScientificArticleBDI: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateScientificArticleBDI(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteScientificArticleBDI: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteScientificArticleBDI(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    getScientificBook: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getScientificBook(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateScientificBook: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateScientificBook(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteScientificBook: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteScientificBook(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Traduceri */
    getTranslation: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getTranslation(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateTranslation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateTranslation(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteTranslation: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteTranslation(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Comunicări în manifestări științifice */
    getScientificCommunication: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getScientificCommunication(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateScientificCommunication: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateScientificCommunication(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteScientificCommunication: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteScientificCommunication(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Brevete */
    getPatent: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getPatent(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updatePatent: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updatePatent(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deletePatent: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deletePatent(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Contracte de cercetare */
    getResearchContract: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getResearchContract(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateResearchContract: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateResearchContract(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteResearchContract: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteResearchContract(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Citări */
    getCitation: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getCitation(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateCitation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateCitation(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteCitation: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteCitation(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Premii si nominalizări */
    getAwardAndNomination: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getAwardAndNomination(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateAwardAndNomination: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateAwardAndNomination(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteAwardAndNomination: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteAwardAndNomination(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Membru în academii */
    getAcademyMember: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getAcademyMember(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateAcademyMember: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateAcademyMember(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteAcademyMember: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteAcademyMember(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Membru în echipa editorială */
    getEditorialMember: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getEditorialMember(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateEditorialMember: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateEditorialMember(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteEditorialMember: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteEditorialMember(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Evenimente organizate */
    getOrganizedEvent: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getOrganizedEvent(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateOrganizedEvent: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateOrganizedEvent(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteOrganizedEvent: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteOrganizedEvent(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Fără activitate științifică */
    getWithoutActivity: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getWithoutActivity(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateWithoutActivity: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateWithoutActivity(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteWithoutActivity: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteWithoutActivity(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    /* Activitate didactică */
    getDidacticActivity: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.getDidacticActivity(authToken);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    updateDidacticActivity: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.updateDidacticActivity(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

    deleteDidacticActivity: async ({authToken}: any) => {
        const service = new UserService();

        const response = await service.deleteDidacticActivity(authToken);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

}