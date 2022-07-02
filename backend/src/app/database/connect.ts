import {config} from "dotenv";
import { DataSource } from "typeorm";
import {
    AdminModel,
    AllowedStudentModel,
    AuthorizationKeyModel,
    CoordinatorModel,
    FileModel,
    StudentModel
} from "./db.models";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    CitationModel, DidacticActivityModel, EditorialMemberModel,
    ISIProceedingModel, OrganizedEventModel, PatentModel, ResearchContractModel,
    ScientificArticleBDIModel,
    ScientificArticleISIModel,
    ScientificBookModel, ScientificCommunicationModel, TranslationModel, WithoutActivityModel
} from "./forms/db.student.form.models";
import {CoordinatorReferentialActivityModel, CoordinatorScientificActivityModel} from "./forms/db.coordinator.forms";
import {UtilService} from "../services/util.service";
config();

const env = process.env as any;

export const dbConnection = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: 5432,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: true,
    logging: env.DB_LOGGING === 'true',
    entities: [
        AllowedStudentModel, StudentModel, CoordinatorModel, AdminModel, AuthorizationKeyModel,

        /* Files */
        FileModel,

        /* Student forms */
        ScientificArticleISIModel, ISIProceedingModel, ScientificArticleBDIModel, ScientificBookModel,
        TranslationModel, ScientificCommunicationModel, PatentModel, ResearchContractModel, CitationModel,
        AwardAndNominationModel, AcademyMemberModel, EditorialMemberModel, OrganizedEventModel, WithoutActivityModel,
        DidacticActivityModel,

        /* Coordinator forms */
        CoordinatorScientificActivityModel, CoordinatorReferentialActivityModel,
    ],
    subscribers: [],
    migrations: [],
});

export async function populateDatabase() {
    const adminRepo = dbConnection.getRepository(AdminModel);
    const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
    const studentRepo = dbConnection.getRepository(StudentModel);

    const adminModelA = AdminModel.fromObject({
        username: 'adriana.bejinariu',
        email: 'adriana.bejinariu20@gmail.com',
    });

    const adminModelB = AdminModel.fromObject({
        username: 'valentin.stamate',
        email: 'stamatevalentin125@gmail.com',
    });

    const fullProfessorNameA = 'Prof.univ.dr. Lenuța Alboaie';
    const [professorFunctionA, professorNameA] = UtilService.splitProfessorName(fullProfessorNameA);

    const coordinatorModelA = CoordinatorModel.fromObject({
        name: professorNameA,
        function: professorFunctionA,
        email: 'stamatevalentin125@gmail.com',
        password: '12345',
    });

    const studentModelA = StudentModel.fromObject({
        identifier: 'valentin.stamate',
        fullName: 'STAMATE D. VALENTIN',
        email: 'stamatevalentin125@gmail.com',
        alternativeEmail: 'valentin.stamate@info.uaic.ro',
        attendanceYear: 2019,
        coordinatorName: professorNameA,
        coordinatorFunction: professorFunctionA,
        isActive: true,
    });

    const studentModelB = StudentModel.fromObject({
        identifier: '31091020401RSD201007',
        fullName: 'CALANCEA C. CRISTINA-GEORGIANA',
        email: 'geo.calancea@gmail.com',
        alternativeEmail: 'geo.calancea@gmail.com',
        attendanceYear: 2020,
        coordinatorName: professorNameA,
        coordinatorFunction: professorFunctionA,
        isActive: true,
    });

    await adminRepo.save(adminModelA);
    await adminRepo.save(adminModelB);
    await coordinatorRepo.save(coordinatorModelA);
    await studentRepo.save(studentModelA);
    await studentRepo.save(studentModelB);

    console.log('Database populated successfully');
}