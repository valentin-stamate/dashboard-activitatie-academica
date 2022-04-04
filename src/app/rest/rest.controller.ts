import {NextFunction, Request, Response} from "express";
import {RestService} from "./rest.service";
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
import {ContentType, ResponseMessage, StatusCode} from "./rest.util";

/** The lowest layer that have access to req & res
 * It uses RestService to handle logic stuff */
export class RestController {
    /************************************************************************************
     *                               Visitor user only
     ***********************************************************************************/
    static async check(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization') as string;

        if (token === undefined) {
            next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.BAD_REQUEST));
            return;
        }

        try {

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
        const key = req.params.key;

        if (key === undefined) {
            next(new ResponseError(ResponseMessage.NO_KEY, StatusCode.BAD_REQUEST));
            return;
        }

        try {
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
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getBaseInformation(user);
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

        const file = req.files.file as UploadedFile;

        if (file === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM));
            return;
        }

        try {
            const rowsCreated = await RestService.importBaseInformation(file);

            res.statusCode = StatusCode.CREATED;

            res.setHeader('Content-Type', 'text/plain');
            res.end(`${rowsCreated}`);
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

    static async sendSemesterActivityEmail(req: Request<any>, res: Response, next: NextFunction) {
        if (!req.files) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = req.files.file as UploadedFile;
        const email = req.body.emailTemplate;
        const subject = req.body.subject;
        const from = req.body.from;
        const recipientExcept = req.body.exceptRecipient;

        let recipientExceptList: string[] = [];
        if (recipientExcept !== undefined) {
            const parsedRecipientExcept = recipientExcept.replace(new RegExp(/ /g), '');
            recipientExceptList = parsedRecipientExcept.split(',');
        }

        if (email === undefined || subject === undefined || from === undefined || file === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const data = await RestService.sendSemesterActivityEmail(email, subject, from, file, recipientExceptList);
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
            res.setHeader('Content-type', ContentType.XLSX);

            res.end(fileBuffer);
        } catch (err) {
            next(err);
        }
    }

    static async faz(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        if (!req.files || body.ignoreStart === undefined || body.ignoreEnd === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const timetableFile = req.files.timetable as UploadedFile;

        if (timetableFile === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const fileBuffer = await RestService.faz(timetableFile, body.ignoreStart, body.ignoreEnd);
            const fileName = `faz_${UtilService.stringDate(new Date())}.zip`;

            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', ContentType.ZIP);
            res.end(fileBuffer);
        } catch (err) {
            next(err);
        }
    }

    static async sendVerbalProcess(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;
        const files = req.files;

        if (files === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        if (files.file === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const file = files.file as UploadedFile;
            const fileBuffer = await RestService.sendVerbalProcess(file);
            const fileName = `proces_verbal_asdasdsad.docx`;

            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', ContentType.DOCX);
            res.end(fileBuffer);
        } catch (err) {
            next(err);
        }
    }

    static async test(req: Request<any>, res: Response) {
        res.end("It's just a test dummy")
    }
}