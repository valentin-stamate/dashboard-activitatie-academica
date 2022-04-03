export enum RestEndpoints {
    /** Check */
    CHECK = '/api/check',

    /** Visitor */
    SIGNUP = '/api/signup',
    LOGIN = '/api/login',
    AUTH = '/api/auth',

    /** User */
    FORMS = `/api/forms`,
    INFORMATION = '/api/information',
    SCIENTIFIC_ARTICLE_ISI = '/api/sc-article-isi',
    ISI_PROCEEDINGS = '/api/isi-proceedings',
    SCIENTIFIC_ARTICLE_BDI = '/api/sc-article-bdi',
    SCIENTIFIC_BOOK = '/api/sc-book',
    TRANSLATION = '/api/translation',
    SCIENTIFIC_COMMUNICATION = '/api/sc-communication',
    PATENT = '/api/patent',
    RESEARCH_CONTRACT = '/api/research-contract',
    CITATION = '/api/citation',
    AWARD_AND_NOMINATION = '/api/award-nomination',
    ACADEMY_MEMBER = '/api/academy-member',
    EDITORIAL_MEMBER = '/api/editorial-member',
    ORGANIZED_EVENT = '/api/organized-event',
    WITHOUT_ACTIVITY = '/api/without-activity',
    DIDACTIC_ACTIVITY = '/api/didactic-activity',

    /** Admin */
    USER = '/api/user',
    BASE_INFORMATION = '/api/base-information',
    TIMETABLE_EMAIL = '/api/timetable-email',
    EXPORT_FORMS = '/api/export-forms',
    FAZ = '/api/faz',
    VERBAL_PROCESS = '/api/verbal-process',

}