import {NextFunction, Request, Response} from "express";
import {ResponseMessage, RestService, StatusCode} from "./rest.service";
import {UploadedFile} from "express-fileupload";
import {ResponseError} from "./rest.middlewares";
import {JwtService} from "../service/jwt.service";
import {
    AcademyMember,
    AwardAndNomination,
    Citation,
    DidacticActivity,
    EditorialMember,
    ISIProceeding,
    OrganizedEvent,
    Patent,
    ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook,
    ScientificCommunication,
    Translation,
    User,
    WithoutActivity
} from "../database/models";
import {UtilService} from "../service/util.service";
import {AlignmentType} from "docx";

/** The lowest layer that have access to req & res
 * It uses RestService to handle logic stuff */
export class RestController {
    /************************************************************************************
     *                               Visitor user only
     ***********************************************************************************/
    static async check(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;

            if (token === undefined) {
                throw new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.BAD_REQUEST);
            }

            const user = JwtService.verifyToken(token) as User;

            await RestService.check(user);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async signup(req: Request<any>, res: Response, next: NextFunction) {
        try {
            await RestService.signup(req.body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async login(req: Request<any>, res: Response, next: NextFunction) {
        try {
            await RestService.login(req.body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async authenticate(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const key = req.params.key;

            if (key === undefined) {
                throw new ResponseError(ResponseMessage.NO_KEY, StatusCode.BAD_REQUEST);
            }

            const jwt = await RestService.authenticate(key);

            res.end(jwt);
        } catch (err) {
            next(err);
        }
    }

    /************************************************************************************
     *                               User only
     ***********************************************************************************/
    static async getInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getInformation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async getForms(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getForms(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getScientificArticleISI(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificArticleISI;

            await RestService.addScientificArticleISI(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificArticleISI;
            const formId = req.params.id;

            await RestService.updateScientificArticleISI(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteScientificArticleISI(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** ISI proceedings */
    static async getISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getISIProceeding(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ISIProceeding;

            await RestService.addISIProceeding(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ISIProceeding;
            const formId = req.params.id;

            await RestService.updateISIProceeding(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteISIProceeding(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteISIProceeding(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
    static async getScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getScientificArticleBDI(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificArticleBDI;

            await RestService.addScientificArticleBDI(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificArticleBDI;
            const formId = req.params.id;

            await RestService.updateScientificArticleBDI(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificArticleBDI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteScientificArticleBDI(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    static async getScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getScientificBook(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificBook;

            await RestService.addScientificBook(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificBook;
            const formId = req.params.id;

            await RestService.updateScientificBook(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificBook(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteScientificBook(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Traduceri */
    static async getTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getTranslation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as Translation;

            await RestService.addTranslation(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as Translation;
            const formId = req.params.id;

            await RestService.updateTranslation(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteTranslation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteTranslation(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Comunicări în manifestări științifice */
    static async getScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getScientificCommunication(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificCommunication;

            await RestService.addScientificCommunication(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificCommunication;
            const formId = req.params.id;

            await RestService.updateScientificCommunication(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificCommunication(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteScientificCommunication(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Brevete */
    static async getPatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getPatent(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addPatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as Patent;

            await RestService.addPatent(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updatePatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as Patent;
            const formId = req.params.id;

            await RestService.updatePatent(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deletePatent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deletePatent(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Contracte de cercetare */
    static async getResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getResearchContract(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ResearchContract;

            await RestService.addResearchContract(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ResearchContract;
            const formId = req.params.id;

            await RestService.updateResearchContract(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteResearchContract(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteResearchContract(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Citări */
    static async getCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getCitation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as Citation;

            await RestService.addCitation(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as Citation;
            const formId = req.params.id;

            await RestService.updateCitation(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteCitation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteCitation(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Premii si nominalizări */
    static async getAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getAwardAndNomination(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as AwardAndNomination;

            await RestService.addAwardAndNomination(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as AwardAndNomination;
            const formId = req.params.id;

            await RestService.updateAwardAndNomination(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteAwardAndNomination(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteAwardAndNomination(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Membru în academii */
    static async getAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getAcademyMember(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as AcademyMember;

            await RestService.addAcademyMember(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as AcademyMember;
            const formId = req.params.id;

            await RestService.updateAcademyMember(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteAcademyMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteAcademyMember(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Membru în echipa editorială */
    static async getEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getEditorialMember(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as EditorialMember;

            await RestService.addEditorialMember(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as EditorialMember;
            const formId = req.params.id;

            await RestService.updateEditorialMember(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteEditorialMember(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteEditorialMember(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Evenimente organizate */
    static async getOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getOrganizedEvent(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as OrganizedEvent;

            await RestService.addOrganizedEvent(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as OrganizedEvent;
            const formId = req.params.id;

            await RestService.updateOrganizedEvent(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteOrganizedEvent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteOrganizedEvent(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Fără activitate științifică */
    static async getWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getWithoutActivity(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as WithoutActivity;

            await RestService.addWithoutActivity(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as WithoutActivity;
            const formId = req.params.id;

            await RestService.updateWithoutActivity(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteWithoutActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteWithoutActivity(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Activitate didactică */
    static async getDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getDidacticActivity(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as DidacticActivity;

            await RestService.addDidacticActivity(user, body);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async updateDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as DidacticActivity;
            const formId = req.params.id;

            await RestService.updateDidacticActivity(user, formId, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteDidacticActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            await RestService.deleteDidacticActivity(user, id);
            res.end();
        } catch (err) {
            next(err);
        }
    }


    /************************************************************************************
     *                               Admin only
     ***********************************************************************************/
    static async allUsers(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.allUsers(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async deleteUser(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await RestService.deleteUser(id);

            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async getBaseInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await RestService.getBaseInformation();
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }

    }

    static async importBaseInformation(req: Request<any>, res: Response, next: NextFunction) {
        if (!req.files) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const file = req.files.file as UploadedFile;

            if (file === undefined) {
                throw new ResponseError(ResponseMessage.INCOMPLETE_FORM);
            }

            await RestService.importBaseInformation(file);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteBaseInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            await RestService.deleteBaseInformation(id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async sendOrganizationEmail(req: Request<any>, res: Response, next: NextFunction) {
        if (req.files === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = req.files.file as UploadedFile;
        const email = req.body.email;
        const subject = req.body.subject;
        const from = req.body.from;

        if (email === undefined || subject === undefined || from === undefined || file === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const data = await RestService.sendOrganizationEmail(email, subject, from, file);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async exportForms(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const fileBuffer: Buffer = await RestService.exportForms();

            const fileName = `data_${UtilService.stringDate(new Date())}.xlsx`;

            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.end(fileBuffer);
        } catch (err) {
            next(err);
        }
    }

    static async getProfessors(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await RestService.getProfessors();
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async refreshProfessors(req: Request<any>, res: Response, next: NextFunction) {
        if (req.files === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = req.files.file as UploadedFile;

        try {
            const data = await RestService.refreshProfessors(file);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async faz(req: Request<any>, res: Response, next: NextFunction) {
        if (req.files === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const timetableFile = req.files.orar as UploadedFile;

        try {
            const fileBuffer = await RestService.faz(timetableFile);

            const fileName = `faz_${UtilService.stringDate(new Date())}.zip`;

            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', 'application/octet-stream');

            res.end(fileBuffer);
        } catch (err) {
            next(err);
        }
    }

    static async test(req: Request<any>, res: Response, next: NextFunction) {
        const docx = require('docx');
        const { Document, Packer, Paragraph, TextRun, convertInchesToTwip, TextDirection, VerticalAlign, BorderStyle, ShadingType, WidthType, AlignmentType, HeadingLevel, TableRow, TableCell, Table } = docx;

        const professorName = 'Stamate Valentin';
        const position = 'Prof.';
        const anotherPosition = 'Prof.';
        const month = 'Aprilie';
        const year = 2021;




        const borderSize = 1;
        const borderColor = 'ff0000';

        const borderNone = {
            top: {
                style: BorderStyle.NONE,
                size: borderSize,
                color: borderColor,
                space: 10,
            },
            bottom: {
                style: BorderStyle.NONE,
                size: borderSize,
                color: borderColor,
                space: 10,
            },
            left: {
                style: BorderStyle.NONE,
                size: borderSize,
                color: borderColor,
                space: 10,
            },
            right: {
                style: BorderStyle.NONE,
                size: borderSize,
                color: borderColor,
                space: 10,
            },
        };

        const tableFill = {
            size: 100,
            type: WidthType.PERCENTAGE,
        };

        /* Header */
        const headerLeft = new Paragraph({
            children: [
                new TextRun({text: 'Universitatea "Alexandru Ioan Cuza" din Iași', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Facultatea de Informatică', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Școala Doctorală', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Nume și Prenume: ${professorName}`, font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Grad didactic: ${position}`, font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Poziția în statul de funcțiuni: ${anotherPosition}`, font: 'Calibri', size: 21, break: 1}),
            ],
        });

        const headerRight = new Paragraph({
            children: [
                new TextRun({text: 'Se aprobă,', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Director Școala Doctorală,', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Prof. univ. dr. Lenuța Alboaie', font: 'Calibri', size: 21, break: 1}),
            ],
            alignment: AlignmentType.RIGHT,
        });

        const headerTable = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [headerLeft],
                            borders: borderNone,
                        }),
                        new TableCell({
                            children: [headerRight],
                            borders: borderNone,
                        })
                    ]
                }),
            ],
            width: tableFill,
        });

        function customParagraph(text: string, options: any = {}) {
            return new Paragraph({
                children: [new TextRun({text: text, font: 'Calibri', ...options})]
            });
        }

        /* Title */
        const title = new Paragraph({
            children: [
                new TextRun({text: 'FIȘA DE ACTIVITATE ZILNICĂ', font: 'Calibri', size: 36, bold: true, break: 1}),
                new TextRun({text: 'Activități normate în statul de funcții', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: `Luna ${month} Anul ${year}`, font: 'Calibri', size: 21, break: 1}),
            ],
            alignment: AlignmentType.CENTER
        });

        const tableMargins = {
            top: convertInchesToTwip(0.10),
            bottom: convertInchesToTwip(0.10),
            right: convertInchesToTwip(0.10),
            left: convertInchesToTwip(0.10),
        }

        /* Table */
        const fazTable = new Table({
            rows: [
                /* Header */
                new TableRow({
                    children: [
                        new TableCell({
                            rowSpan: 2,
                            children: [customParagraph('Ziua')],
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [customParagraph('Intervalul Orar')],
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [customParagraph('Disciplina și specializare')],
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [customParagraph('Anul')],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            columnSpan: 4,
                            children: [customParagraph('Nivelul de studii și tip de activitate Doctorat')],
                        }),
                        new TableCell({
                            rowSpan: 2,
                            children: [customParagraph('Număr de ore fizice efectuate pe săptămână Din fisierul excel verificat cu orarul')],
                        }),
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            rowSpan: 1,
                            children: [customParagraph('Curs (CAD')],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [customParagraph('Seminar (SAD)')],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [customParagraph('Îndrumare teza de doctorat (TD)')],
                        }),
                        new TableCell({
                            rowSpan: 1,
                            children: [customParagraph('Membru comisie îndrumare doctorat (CSRD')],
                        }),
                    ]
                }),

                /* The actual values */
                new TableRow({
                    children: [
                        new TableCell({
                            children: [customParagraph('12')],
                        }),
                        new TableCell({
                            children: [customParagraph('12-14')],
                        }),
                        new TableCell({
                            children: [customParagraph('Membru comisie îndrumare doctorat')],
                        }),
                        new TableCell({
                            children: [customParagraph('2021')],
                        }),
                        new TableCell({
                            children: [customParagraph('')],
                        }),
                        new TableCell({
                            children: [customParagraph('')],
                        }),
                        new TableCell({
                            children: [customParagraph('')],
                        }),
                        new TableCell({
                            children: [customParagraph('CSRD')],
                        }),
                        new TableCell({
                            children: [customParagraph('1.08')],
                        }),
                    ]
                }),

                /* Result */
                new TableRow({
                    children: [
                        new TableCell({
                            columnSpan: 4,
                            children: [customParagraph('Total ore fizice:')]
                        }),
                        new TableCell({children: [customParagraph('')]}),
                        new TableCell({children: [customParagraph('')]}),
                        new TableCell({children: [customParagraph('')]}),
                        new TableCell({
                            children: [customParagraph('4.32 CSRD')]
                        }),
                        new TableCell({
                            children: [customParagraph('4.32')]
                        }),
                    ]
                }),
            ],
            width: tableFill,
            margins: tableMargins,
        });

        const fazNote = customParagraph('În semestrul I, anul universitar 2021-2022 datorită virusului COVID-19, activitatea didactică s-a desfășurat în sistem online conform orarului stabilit.');

        const footer = new Paragraph({
            children: [
                new TextRun({text: `Functie ${professorName}`, font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: 'Semnătura', font: 'Calibri', size: 21, break: 1}),
                new TextRun({text: '_______________', font: 'Calibri', size: 21, break: 1}),
            ],
            alignment: AlignmentType.END
        });

        const doc = new Document({
            sections: [
                {
                    children: [
                        headerTable,
                        title,
                        new Paragraph(''),
                        new Paragraph(''),
                        fazTable,
                        fazNote,
                        new Paragraph(''),
                        footer,
                    ],
                },
            ],
        });

        const b64string = await Packer.toBase64String(doc);

        res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
        res.send(Buffer.from(b64string, 'base64'));
    }
}