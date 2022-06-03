import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {StudentModel} from "../database/db.models";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    CitationModel, DidacticActivityModel, EditorialMemberModel,
    ISIProceedingModel, OrganizedEventModel, PatentModel, ResearchContractModel,
    ScientificArticleBDIModel,
    ScientificArticleISIModel,
    ScientificBookModel, ScientificCommunicationModel,
    TranslationModel, WithoutActivityModel
} from "../database/forms/db.student.form.models";
import {StatusCode} from "../services/rest.util";
import {StudentFormService} from "../service/student.form.service";

export class StudentFormController {
    
    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getScientificArticleISI(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ScientificArticleISIModel;

            await StudentFormService.addScientificArticleISI(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ScientificArticleISIModel;
            const formId = req.params.id;

            await StudentFormService.updateScientificArticleISI(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteScientificArticleISI(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** ISI proceedings */
    static async getISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getISIProceeding(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ISIProceedingModel;

            await StudentFormService.addISIProceeding(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ISIProceedingModel;
            const formId = req.params.id;

            await StudentFormService.updateISIProceeding(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteISIProceeding(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
    static async getScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getScientificArticleBDI(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ScientificArticleBDIModel;

            await StudentFormService.addScientificArticleBDI(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ScientificArticleBDIModel;
            const formId = req.params.id;

            await StudentFormService.updateScientificArticleBDI(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteScientificArticleBDI(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    static async getScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getScientificBook(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ScientificBookModel;

            await StudentFormService.addScientificBook(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ScientificBookModel;
            const formId = req.params.id;

            await StudentFormService.updateScientificBook(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteScientificBook(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Traduceri */
    static async getTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getTranslation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as TranslationModel;

            await StudentFormService.addTranslation(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as TranslationModel;
            const formId = req.params.id;

            await StudentFormService.updateTranslation(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteTranslation(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Comunicări în manifestări științifice */
    static async getScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getScientificCommunication(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ScientificCommunicationModel;

            await StudentFormService.addScientificCommunication(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ScientificCommunicationModel;
            const formId = req.params.id;

            await StudentFormService.updateScientificCommunication(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteScientificCommunication(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Brevete */
    static async getPatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getPatent(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addPatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as PatentModel;

            await StudentFormService.addPatent(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updatePatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as PatentModel;
            const formId = req.params.id;

            await StudentFormService.updatePatent(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deletePatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deletePatent(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Contracte de cercetare */
    static async getResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getResearchContract(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ResearchContractModel;

            await StudentFormService.addResearchContract(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as ResearchContractModel;
            const formId = req.params.id;

            await StudentFormService.updateResearchContract(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteResearchContract(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Citări */
    static async getCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getCitation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as CitationModel;

            await StudentFormService.addCitation(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as CitationModel;
            const formId = req.params.id;

            await StudentFormService.updateCitation(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteCitation(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Premii si nominalizări */
    static async getAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getAwardAndNomination(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as AwardAndNominationModel;

            await StudentFormService.addAwardAndNomination(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as AwardAndNominationModel;
            const formId = req.params.id;

            await StudentFormService.updateAwardAndNomination(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteAwardAndNomination(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Membru în academii */
    static async getAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getAcademyMember(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as AcademyMemberModel;

            await StudentFormService.addAcademyMember(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as AcademyMemberModel;
            const formId = req.params.id;

            await StudentFormService.updateAcademyMember(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteAcademyMember(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Membru în echipa editorială */
    static async getEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getEditorialMember(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as EditorialMemberModel;

            await StudentFormService.addEditorialMember(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as EditorialMemberModel;
            const formId = req.params.id;

            await StudentFormService.updateEditorialMember(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteEditorialMember(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Evenimente organizate */
    static async getOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getOrganizedEvent(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as OrganizedEventModel;

            await StudentFormService.addOrganizedEvent(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as OrganizedEventModel;
            const formId = req.params.id;

            await StudentFormService.updateOrganizedEvent(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteOrganizedEvent(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Fără activitate științifică */
    static async getWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getWithoutActivity(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as WithoutActivityModel;

            await StudentFormService.addWithoutActivity(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as WithoutActivityModel;
            const formId = req.params.id;

            await StudentFormService.updateWithoutActivity(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteWithoutActivity(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Activitate didactică */
    static async getDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentFormService.getDidacticActivity(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as DidacticActivityModel;

            await StudentFormService.addDidacticActivity(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const body = req.body as DidacticActivityModel;
            const formId = req.params.id;

            await StudentFormService.updateDidacticActivity(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;
            const id = req.params.id;

            await StudentFormService.deleteDidacticActivity(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }
    
}