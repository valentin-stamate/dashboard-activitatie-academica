import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {
    AcademyMember,
    AwardAndNomination,
    Citation, DidacticActivity, EditorialMember,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook, ScientificCommunication,
    Student, Translation, WithoutActivity
} from "../database/models";
import {StatusCode} from "../services/rest.util";
import {FormService} from "../service/form.service";

export class FormController {
    
    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getScientificArticleISI(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ScientificArticleISI;

            await FormService.addScientificArticleISI(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ScientificArticleISI;
            const formId = req.params.id;

            await FormService.updateScientificArticleISI(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteScientificArticleISI(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** ISI proceedings */
    static async getISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getISIProceeding(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ISIProceeding;

            await FormService.addISIProceeding(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ISIProceeding;
            const formId = req.params.id;

            await FormService.updateISIProceeding(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteISIProceeding(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
    static async getScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getScientificArticleBDI(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ScientificArticleBDI;

            await FormService.addScientificArticleBDI(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ScientificArticleBDI;
            const formId = req.params.id;

            await FormService.updateScientificArticleBDI(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteScientificArticleBDI(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    static async getScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getScientificBook(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ScientificBook;

            await FormService.addScientificBook(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ScientificBook;
            const formId = req.params.id;

            await FormService.updateScientificBook(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteScientificBook(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Traduceri */
    static async getTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getTranslation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as Translation;

            await FormService.addTranslation(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as Translation;
            const formId = req.params.id;

            await FormService.updateTranslation(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteTranslation(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Comunicări în manifestări științifice */
    static async getScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getScientificCommunication(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ScientificCommunication;

            await FormService.addScientificCommunication(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ScientificCommunication;
            const formId = req.params.id;

            await FormService.updateScientificCommunication(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteScientificCommunication(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Brevete */
    static async getPatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getPatent(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addPatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as Patent;

            await FormService.addPatent(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updatePatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as Patent;
            const formId = req.params.id;

            await FormService.updatePatent(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deletePatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deletePatent(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Contracte de cercetare */
    static async getResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getResearchContract(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ResearchContract;

            await FormService.addResearchContract(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as ResearchContract;
            const formId = req.params.id;

            await FormService.updateResearchContract(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteResearchContract(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Citări */
    static async getCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getCitation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as Citation;

            await FormService.addCitation(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as Citation;
            const formId = req.params.id;

            await FormService.updateCitation(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteCitation(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Premii si nominalizări */
    static async getAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getAwardAndNomination(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as AwardAndNomination;

            await FormService.addAwardAndNomination(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as AwardAndNomination;
            const formId = req.params.id;

            await FormService.updateAwardAndNomination(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteAwardAndNomination(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Membru în academii */
    static async getAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getAcademyMember(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as AcademyMember;

            await FormService.addAcademyMember(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as AcademyMember;
            const formId = req.params.id;

            await FormService.updateAcademyMember(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteAcademyMember(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Membru în echipa editorială */
    static async getEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getEditorialMember(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as EditorialMember;

            await FormService.addEditorialMember(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as EditorialMember;
            const formId = req.params.id;

            await FormService.updateEditorialMember(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteEditorialMember(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Evenimente organizate */
    static async getOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getOrganizedEvent(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as OrganizedEvent;

            await FormService.addOrganizedEvent(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as OrganizedEvent;
            const formId = req.params.id;

            await FormService.updateOrganizedEvent(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteOrganizedEvent(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Fără activitate științifică */
    static async getWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getWithoutActivity(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as WithoutActivity;

            await FormService.addWithoutActivity(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as WithoutActivity;
            const formId = req.params.id;

            await FormService.updateWithoutActivity(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteWithoutActivity(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Activitate didactică */
    static async getDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await FormService.getDidacticActivity(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as DidacticActivity;

            await FormService.addDidacticActivity(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const body = req.body as DidacticActivity;
            const formId = req.params.id;

            await FormService.updateDidacticActivity(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;
            const id = req.params.id;

            await FormService.deleteDidacticActivity(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }
    
}