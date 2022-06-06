import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {UploadedFile} from "express-fileupload";
import {AdminEmailService} from "../service/admin.email.service";

export class AdminEmailController {

    static async sendSemesterActivityEmail(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;
        const files = req.files;

        if (files == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        if (files.file == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = files.file as UploadedFile;
        const email = body.emailTemplate;
        const subject = body.subject;
        const from = body.from;
        const recipientExcept = body.exceptRecipient;
        const send = `${body.send}` === 'true';

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
            const data = await AdminEmailService.sendSemesterActivityEmail(email, subject, from, file, recipientExceptList, send);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async sendVerbalProcess(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;
        const files = req.files;

        if (files == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        if (files.file == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = files.file as UploadedFile;
        const email = body.emailTemplate;
        const subject = body.subject;
        const from = body.from;
        const recipientExcept = body.exceptRecipient;
        const send = `${body.send}` === 'true';

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
            const file = files.file as UploadedFile;
            const emailResults = await AdminEmailService.sendVerbalProcess(email, subject, from, file, recipientExceptList, send);

            res.end(JSON.stringify(emailResults));
        } catch (err) {
            next(err);
        }
    }

    static async sendThesisEmailNotification(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;
        const files = req.files;

        if (files == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        if (files.file == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = files.file as UploadedFile;
        const email = body.emailTemplate;
        const from = body.from;
        const subject = body.subject;
        const recipientExcept = body.exceptRecipient;
        const send = `${body.send}` === 'true';

        let recipientExceptList: string[] = [];
        if (recipientExcept !== undefined) {
            const parsedRecipientExcept = recipientExcept.replace(new RegExp(/ /g), '');
            recipientExceptList = parsedRecipientExcept.split(',');
        }

        if (email === undefined || subject === undefined || from === undefined || file === undefined || !body.startDate || !body.endDate) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        if (isNaN(Date.parse(body.startDate)) || isNaN(Date.parse(body.endDate))) {
            next(new ResponseError(ResponseMessage.INVALID_DATE, StatusCode.BAD_REQUEST));
            return;
        }

        const startDate = new Date(body.startDate);
        const endDate = new Date(body.endDate);

        try {
            const data = await AdminEmailService.sendThesisEmailNotification(email, subject, from, file, recipientExceptList, send, startDate, endDate);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

}