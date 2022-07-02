import {NextFunction, Request, Response} from "express";
import {CoordinatorStudentFormsService} from "../service/coordinator.student.forms.service";
import {ResponseError} from "../middleware/middleware";
import {ContentType, ResponseMessage, StatusCode} from "../services/rest.util";
import {UtilService} from "../services/util.service";

export class CoordinatorStudentFormsController {

    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        const studentIdentifier = req.params.studentIdentifier;
        const reportId = req.params.reportId;

        if (studentIdentifier == null || reportId == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {

            const buffer = await CoordinatorStudentFormsService.getScientificArticleISI(studentIdentifier, reportId);

            const fileName = `report_${UtilService.stringDate(new Date())}.zip`;

            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', ContentType.DOCX);
            res.end(buffer);
        } catch (err) {
            next(err);
        }
    }

}