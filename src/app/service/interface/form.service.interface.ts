
export interface FormServiceInterface {
    /** Updates User Information. If the association doesn't exist, it's created. */
    updateInformation(): void;

    /** Adds ScientificArticle. If the association doesn't exist, it's created. */
    updateScientificArticle(): void;

    /** Adds ISIProceeding. If the association doesn't exist, it's created. */
    updateISIProceeding(): void;

    /** Adds ScientificArticleBDI. If the association doesn't exist, it's created. */
    updateScientificArticleBDI(): void;

    /** Adds ScientificBook. If the association doesn't exist, it's created. */
    updateScientificBook(): void;

    /** Adds Translations. If the association doesn't exist, it's created. */
    updateTranslations(): void;

    /** Adds ScientificCommunication. If the association doesn't exist, it's created. */
    updateScientificCommunication(): void;

    /** Adds Paten. If the association doesn't exist, it's created. */
    updatePaten(): void;

    /** Adds ResearchContract. If the association doesn't exist, it's created. */
    updateResearchContract(): void;

    /** Adds Citation. If the association doesn't exist, it's created. */
    updateCitation(): void;

    /** Adds AwardAndNomination. If the association doesn't exist, it's created. */
    updateAwardAndNomination(): void;

    /** Adds AcademyMember. If the association doesn't exist, it's created. */
    updateAcademyMember(): void;

    /** Adds EditorialMember. If the association doesn't exist, it's created. */
    updateEditorialMember(): void;

    /** Adds OrganizedEvent. If the association doesn't exist, it's created. */
    updateOrganizedEvent(): void;

    /** Adds WithoutActivity. If the association doesn't exist, it's created. */
    updateWithoutActivity(): void;

    /** Adds DidacticActivity. If the association doesn't exist, it's created. */
    updateDidacticActivity(): void;
}