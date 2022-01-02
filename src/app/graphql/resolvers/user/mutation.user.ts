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

    editInformation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editInformation(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editScientificArticleISI: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editScientificArticleISI(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editISIProceeding: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editISIProceeding(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editScientificArticleBDI: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editScientificArticleBDI(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editScientificBook: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editScientificBook(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editTranslation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editTranslation(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editScientificCommunication: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editScientificCommunication(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editPatent: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editPatent(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editResearchContract: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editResearchContract(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editCitation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editCitation(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editAwardAndNomination: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editAwardAndNomination(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editAcademyMember: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editAcademyMember(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editEditorialMember: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editEditorialMember(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editOrganizedEvent: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editOrganizedEvent(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editWithoutActivity: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editWithoutActivity(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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

    editDidacticActivity: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.editDidacticActivity(authToken, data);
        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.message;
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