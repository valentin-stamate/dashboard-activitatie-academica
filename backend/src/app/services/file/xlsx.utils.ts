export enum AllowedStudentsHeaders {
    IDENTIFIER = 'Matricol',
    NAME = 'Nume și prenume',
    COORDINATOR = 'Conducătorul de doctorat',
    ATTENDANCE_YEAR = 'Anul înmatriculării',
}

export enum TimetableHeaders {
    FROM = 'De la',
    TO = 'Până la',
    ACTIVITY_NAME = 'Disciplina',
    ACTIVITY_TYPE = 'Activitate',
    ACTIVITY_SHORTCUT = 'Prescurtare activitate',
    PROFESSOR_NAME = 'Profesor',
    FAZ_HOURS = 'ore pe saptamana FAZ',
    CLASS_LOCATION = 'Sala',
}

export enum SemesterTimetableHeaders {
    NAME = 'Nume si prenume',
    ACTIVITY = 'Activitate',
    NUMBER_OF_STUDENTS = 'Studenti doctoranzi',
    WEEK_HOURS = 'Ore în orar / saptamana',
    EMAIL = 'Email',
}

export enum CoordinatorsHeaders {
    CODE = 'Marca',
    NAME_FUNCTION = 'Nume prenume conducator de doctorat',
    EMAIL = 'Email',
}

export enum ReportsAnnouncementHeaders {
    // NUMBER = '"Nr. crt"',
    COORDINATOR = 'Conducator de doctorat',
    COORDINATOR_EMAIL = 'Adresa de email coordonator',
    COMMISSION = 'Comisie de indrumare',
    STUDENT_NAME = 'Doctorand',
    EMAIL = 'Adresa de email',
    // PHONE = 'Telefon',
    // FOUNDING = 'Finantare',
    // LEARNING_TYPE = 'Forma de invatam.',
    ATTENDANCE_DATE = 'Data inceperii stagiului',
    // STUDY_YEAR = 'Anul de studii',
    // STUDY_DURATION = 'Durata studiilor',
    // THESIS_STATUS = 'Stadiu teza',
    // OBSERVATIONS = 'Observatii',
    // PATENTS = 'Referate',
    R1 = 'R1',
    R2 = 'R2',
    R3 = 'R3',
}