import {TablesRepository} from "../database/repository/tables.repository";
import {XLSXWorkBookService, XLSXWorkSheetService} from "../service/xlsx.service";
import {AcademyMember, AwardAndNomination, Citation, DidacticActivity, EditorialMember, Information, ISIProceeding,
    OrganizedEvent, Patent, ResearchContract, ScientificArticleBDI, ScientificArticleISI, ScientificBook,
    ScientificCommunication, Translation, WithoutActivity
} from "../database/models";

export class RestService {
    private static getWorkSheet(rows: any[], headers: string[], headersMap: Map<string, string>, name: string): XLSXWorkSheetService {
        const serv = new XLSXWorkSheetService(headers, headersMap, name);

        for (const item of rows) {
            serv.insertRow(item);
        }

        return serv;
    }

    static async getFormsWorkBook(): Promise<XLSXWorkBookService> {
        const infoSheet = this.getWorkSheet(await TablesRepository.allInformation(), Information.col, Information.columnsMap, Information.sheetName);
        const scISISheet = this.getWorkSheet(await TablesRepository.allScientificArticlesISI(), ScientificArticleISI.col, ScientificArticleISI.columnsMap, ScientificArticleISI.sheetName);
        const ISIprSheet = this.getWorkSheet(await TablesRepository.allISIProceedings(), ISIProceeding.col, ISIProceeding.columnsMap, ISIProceeding.sheetName);
        const scBDISheet = this.getWorkSheet(await TablesRepository.allScientificArticlesBDI(), ScientificArticleBDI.col, ScientificArticleBDI.columnsMap, ScientificArticleBDI.sheetName);
        const scBookSheet = this.getWorkSheet(await TablesRepository.allScientificBooks(), ScientificBook.col, ScientificBook.columnsMap, ScientificBook.sheetName);
        const trSheet = this.getWorkSheet(await TablesRepository.allTranslations(), Translation.col, Translation.columnsMap, Translation.sheetName);
        const scCommSheet = this.getWorkSheet(await TablesRepository.allScientificCommunications(), ScientificCommunication.col, ScientificCommunication.columnsMap, ScientificCommunication.sheetName);
        const patSheet = this.getWorkSheet(await TablesRepository.allPatents(), Patent.col, Patent.columnsMap, Patent.sheetName);
        const resContrSheet = this.getWorkSheet(await TablesRepository.allResearchContracts(), ResearchContract.col, ResearchContract.columnsMap, ResearchContract.sheetName);
        const citSheet = this.getWorkSheet(await TablesRepository.allCitations(), Citation.col, Citation.columnsMap, Citation.sheetName);
        const awardsSheet = this.getWorkSheet(await TablesRepository.allAwardAndNominations(), AwardAndNomination.col, AwardAndNomination.columnsMap, AwardAndNomination.sheetName);
        const acMemSheet = this.getWorkSheet(await TablesRepository.allAcademyMembers(), AcademyMember.col, AcademyMember.columnsMap, AcademyMember.sheetName);
        const edMemSheet = this.getWorkSheet(await TablesRepository.allEditorialMember(), EditorialMember.col, EditorialMember.columnsMap, EditorialMember.sheetName);
        const orgEvSheet = this.getWorkSheet(await TablesRepository.allOrganizedEvents(), OrganizedEvent.col, OrganizedEvent.columnsMap, OrganizedEvent.sheetName);
        const withoutSheet = this.getWorkSheet(await TablesRepository.allWithoutActivities(), WithoutActivity.col, WithoutActivity.columnsMap, WithoutActivity.sheetName);
        const didActSheet = this.getWorkSheet(await TablesRepository.allDidacticActivities(), DidacticActivity.col, DidacticActivity.columnsMap, DidacticActivity.sheetName);

        const sheets: XLSXWorkSheetService[] = [
            infoSheet, scISISheet, ISIprSheet, scBDISheet, scBookSheet, trSheet, scCommSheet, patSheet,
            resContrSheet, citSheet, awardsSheet, acMemSheet, edMemSheet, orgEvSheet, withoutSheet, didActSheet,
        ];

        const sheetBook = new XLSXWorkBookService();
        sheetBook.appendSheets(sheets);

        return sheetBook;
    }
}