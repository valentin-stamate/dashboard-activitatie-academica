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

    addInformation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addInformation(authToken, data);
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

    deleteInformation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteInformation(authToken, data);

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

    addScientificArticleISI: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addScientificArticleISI(authToken, data);
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

    deleteScientificArticleISI: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteScientificArticleISI(authToken, data);

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

    addISIProceeding: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addISIProceeding(authToken, data);
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

    deleteISIProceeding: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteISIProceeding(authToken, data);

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

    addScientificArticleBDI: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addScientificArticleBDI(authToken, data);
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

    deleteScientificArticleBDI: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteScientificArticleBDI(authToken, data);

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

    addScientificBook: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addScientificBook(authToken, data);
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

    deleteScientificBook: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteScientificBook(authToken, data);

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

    addTranslation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addTranslation(authToken, data);
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

    deleteTranslation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteTranslation(authToken, data);

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

    addScientificCommunication: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addScientificCommunication(authToken, data);
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

    deleteScientificCommunication: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteScientificCommunication(authToken, data);

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

    addPatent: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addPatent(authToken, data);
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

    deletePatent: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deletePatent(authToken, data);

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

    addResearchContract: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addResearchContract(authToken, data);
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

    deleteResearchContract: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteResearchContract(authToken, data);

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

    addCitation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addCitation(authToken, data);
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

    deleteCitation: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteCitation(authToken, data);

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

    addAwardAndNomination: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addAwardAndNomination(authToken, data);
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

    deleteAwardAndNomination: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteAwardAndNomination(authToken, data);

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

    addAcademyMember: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addAcademyMember(authToken, data);
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

    deleteAcademyMember: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteAcademyMember(authToken, data);

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

    addEditorialMember: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addEditorialMember(authToken, data);
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

    deleteEditorialMember: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteEditorialMember(authToken, data);

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

    addOrganizedEvent: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addOrganizedEvent(authToken, data);
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

    deleteOrganizedEvent: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteOrganizedEvent(authToken, data);

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

    addWithoutActivity: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addWithoutActivity(authToken, data);
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

    deleteWithoutActivity: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteWithoutActivity(authToken, data);

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

    addDidacticActivity: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.addDidacticActivity(authToken, data);
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

    deleteDidacticActivity: async ({authToken, data}: any) => {
        const service = new UserService();

        const response = await service.deleteDidacticActivity(authToken, data);

        if (!response.succes) {
            throw new Error(response.message);
        }

        return response.payload;
    },

}