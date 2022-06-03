import {CryptoUtil} from "../services/crypto.util";
import sha256 from "crypto-js/sha256";
import {config} from "dotenv";
import { DataSource } from "typeorm";
import {AdminModel, AllowedStudentModel, AuthorizationKeyModel, CoordinatorModel, StudentModel} from "./db.models";
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

    const adminModel = AdminModel.fromObject({
        username: 'valentin',
        email: 'stamatevalentin125@gmail.com',
    });

    const coordinatorModel = CoordinatorModel.fromObject({
        name: 'Ion',
        function: 'Prof. univ. dr',
        email: 'stamatevalentin125@gmail.com',
        password: 'admin',
    });

    const studentModel = StudentModel.fromObject({
        identifier: 'valentin',
        fullName: 'Valentin Aioanei',
        email: 'stamatevalentin125@gmail.com',
        alternativeEmail: 'valentin.stamate@info.uaic.ro',
        attendanceYear: 2019,
        coordinatorName: 'Buraza Ion',
        coordinatorFunction: 'Prof. univ. dr',
        isActive: true,
    });

    await adminRepo.save(adminModel);
    await coordinatorRepo.save(coordinatorModel);
    await studentRepo.save(studentModel);

    console.log('Database populated successfully');
}