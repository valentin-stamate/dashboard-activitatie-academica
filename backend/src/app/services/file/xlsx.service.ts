import {UploadedFile} from "express-fileupload";
import XLSX from "xlsx";
import {ResponseError} from "../../middleware/middleware";
import {ResponseMessage, StatusCode} from "../rest.util";
import {UtilService} from "../util.service";
import {AllowedStudentModel, CoordinatorModel} from "../../database/db.models";
import {
    FAZData,
    FAZDayActivity,
    SemesterTimetableData,
    SemesterTimetableDataActivity,
    VerbalProcessData
} from "./xlsx.models";
import {
    BaseInformationHeaders, CoordinatorsHeaders,
    ReportsAnnouncementHeaders,
    SemesterTimetableHeaders,
    TimetableHeaders
} from "./xlsx.utils";

/* The comments here will be explained in romaninan because este mai usor sa explic ce se intampla, si fara diacritice */
export class XLSXService {


    /** Se parseaza orarul profesorilor si se genereaza FAZ-ul petru fiecare.
    * Ideea din spate este urmatoarea:
    *   * se separa fiecare profesor astfel incat sa avem activitatea fiecarui profesor intr-o saptamana
    *   * pentru ficare profesor, prin fiecare zi a lunii care nu se afla in intervalul de ignorare,
     *    daca profesorul are activitate in ziua curenta a lunii (Eg. Luni, Marti), se insumeaza toate
     *    activitatile din ziua curenta care au acelasi tip de activitate
     *    * se adauga in lista datele
     *
     *    <b>Only god knows what I did here.</b> */
    static parseFAZ(timetableFile: UploadedFile, month: number, ignoreStart: number, ignoreEnd: number): FAZData[] {
        /* ignoreStart and ignoreEnd are by default -1 if the user doesn't specify a date */

        const fazDataList: FAZData[] = [];

        const timetableWorkBook = XLSX.read(timetableFile.data);
        const timetableSheet = timetableWorkBook.Sheets[timetableWorkBook.SheetNames[0]];

        const timeTablesRows: any[] = XLSX.utils.sheet_to_json(timetableSheet, {raw: false});

        /* This timetable contains a list of rows for evey day of the week  */
        const parsedTimetable: any = {};

        const professorListMap: any = {};

        let lastDay = '';
        for (let row of timeTablesRows) {
            /* This means is a day of the week */
            if (Object.values(row).length === 1) {
                lastDay = row[TimetableHeaders.FROM];
                parsedTimetable[lastDay] = [];
                continue;
            }

            /* Just in case */
            if (lastDay === '') {
                continue;
            }

            let professorName = row[TimetableHeaders.PROFESSOR_NAME];

            if (professorName === undefined || typeof professorName !== "string") {
                console.log('Something went wrong with the row:')
                console.log(row);
                throw new ResponseError(ResponseMessage.INVALID_TIMETABLE, StatusCode.BAD_REQUEST);
            }

            professorName = professorName.trim();
            row[TimetableHeaders.PROFESSOR_NAME] = professorName;

            parsedTimetable[lastDay].push(row);
            professorListMap[professorName] = true;
        }

        /* Just all the professors */
        const professorList = Object.keys(professorListMap);

        /* Here, every professor will have it's own timetable */
        const professorsTimetable: any = {};
        for (let professor of professorList) {
            professorsTimetable[professor] = {};

            /* The day is the form [day, rows[]] */
            for (let day of Object.entries(parsedTimetable)) {
                professorsTimetable[professor][day[0]] = (day[1] as any[]).filter(item => item[TimetableHeaders.PROFESSOR_NAME] === professor);
            }
        }

        const dayMap: any = {
            0: 'Duminica',
            1: 'Luni',
            2: 'Marti',
            3: 'Miercuri',
            4: 'Joi',
            5: 'Vineri',
            6: 'Sambata',
        }

        /* Get the number of days in the current month, month count, current year
        * in order to loop through all the month days. */
        const currentDate = new Date();
        currentDate.setMonth(month);

        const monthDays = UtilService.daysInMonth(currentDate); // 1 - First Day
        const currentMonth = currentDate.getMonth(); // January = 0
        const currentYear = currentDate.getFullYear();

        /* For every professor the hours will be calculated for the full month */
        for (let professor of professorList) {
            const professorWeek = professorsTimetable[professor];

            /* Loop through each day of the month and see if that professor has something to do */
            const monthlyDays: FAZDayActivity[] = [];
            for (let i = 1; i <= monthDays; i++) {
                if (ignoreStart <= i && i <= ignoreEnd) {
                    continue;
                }

                const day = new Date(currentYear, currentMonth, i).getDay();

                if (day === 0 || day === 6) {
                    continue;
                }

                const dayStr = dayMap[day];
                const dayRows: any[] = professorWeek[dayStr];

                for (let dayActivity of dayRows) {
                    const from = dayActivity[TimetableHeaders.FROM];
                    const to = dayActivity[TimetableHeaders.TO];
                    const discipline = dayActivity[TimetableHeaders.ACTIVITY_TYPE];
                    const activityShort = dayActivity[TimetableHeaders.ACTIVITY_SHORTCUT];
                    let fazHours: number = parseFloat(dayActivity[TimetableHeaders.FAZ_HOURS]);

                    if (isNaN(fazHours)) {
                        fazHours = 0;
                    }

                    let cad = activityShort === 'CAD' ? 'CAD' : '';
                    let sad = activityShort === 'SAD' ? 'SAD' : '';
                    let td = activityShort === 'TD' ? 'TD' : '';
                    let csrd = activityShort === 'CSRD' ? 'CSRD' : '';

                    const fazRow: FAZDayActivity = {
                        day: i, interval: `${from} - ${to}`, discipline: discipline, year: 'I',
                        cad: cad, sad: sad, td: td, csrd: csrd, hours: fazHours, weekDay: dayStr,
                    };

                    monthlyDays.push(fazRow);
                }

            }

            const nameItems = UtilService.splitProfessorName(professor);

            const fazProfessorData: FAZData = {
                professorName: nameItems[1],
                professorFunction: nameItems[0],
                month: currentMonth,
                year: currentYear,
                monthlyActivity: monthlyDays,
            };

            fazDataList.push(fazProfessorData);
        }

        return fazDataList;
    }

    /** Se parseaza fisierul cu anuntarea rapoartelor
     * If second algorithm is used, then startDate and endDate must be provided */
    static parseReportAnnouncement(file: UploadedFile, firstAlgorithm: boolean, startDate: Date = new Date(), endDate: Date = new Date()): VerbalProcessData[] {
        const verbalProcessDataList: VerbalProcessData[] = [];

        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];
        const jsonSheet = XLSX.utils.sheet_to_json(sheet, {raw: false}) as any[];

        for (let i = 0; i < jsonSheet.length; i += 3) {
            const firstRow = jsonSheet[i];
            const secondRow = jsonSheet[i + 1];
            const thirdRow = jsonSheet[i + 2];

            const coordinationFuncName = UtilService.splitProfessorName(firstRow[ReportsAnnouncementHeaders.COORDINATOR])
            const year = new Date(firstRow[ReportsAnnouncementHeaders.ATTENDANCE_DATE]).getFullYear();

            /* rnData = [Data Prog., Data.Prez, Title] */
            const r1Data = [new Date(firstRow[ReportsAnnouncementHeaders.R1]), secondRow[ReportsAnnouncementHeaders.R1], thirdRow[ReportsAnnouncementHeaders.R1]];
            const r2Data = [new Date(firstRow[ReportsAnnouncementHeaders.R2]), secondRow[ReportsAnnouncementHeaders.R2], thirdRow[ReportsAnnouncementHeaders.R2]];
            const r3Data = [new Date(firstRow[ReportsAnnouncementHeaders.R3]), secondRow[ReportsAnnouncementHeaders.R3], thirdRow[ReportsAnnouncementHeaders.R3]];

            let lastData = undefined;
            let source = undefined;

            /* If the cell is empty, put undefined, else put the date if it's valid or a date object otherwise */
            r1Data[1] = r1Data[1] === undefined ? undefined : (isNaN(new Date(r1Data[1]) as any) ? new Date() : new Date(r1Data[1]));
            r2Data[1] = r2Data[1] === undefined ? undefined : (isNaN(new Date(r2Data[1]) as any) ? new Date() : new Date(r2Data[1]));
            r3Data[1] = r3Data[1] === undefined ? undefined : (isNaN(new Date(r3Data[1]) as any) ? new Date() : new Date(r3Data[1]));

            if (firstAlgorithm) {
                /* Ia cel mai din stanga raport care nu are o data valida din 'Data Prez.' */
                if (isNaN(r3Data[1])) {
                    lastData = r3Data;
                    source = ReportsAnnouncementHeaders.R3;
                }

                if (isNaN(r2Data[1])) {
                    lastData = r2Data;
                    source = ReportsAnnouncementHeaders.R2;
                }

                if (isNaN(r1Data[1])) {
                    lastData = r1Data;
                    source = ReportsAnnouncementHeaders.R1;
                }
            } else {
                /* Ia data din Data.Prog cea mai din stanga care se afla in interval si care nu are o data completata in Data.Prog */
                const matchDate = (date: Date, startDate: Date, endDate: Date): boolean => {
                    return UtilService.compareDatesWithoutDay(startDate, date) && UtilService.compareDatesWithoutDay(date, endDate);
                };

                if (matchDate(r3Data[0], startDate, endDate) && isNaN(r3Data[1])) {
                    lastData = r3Data;
                    source = ReportsAnnouncementHeaders.R3;
                }

                if (matchDate(r2Data[0], startDate, endDate) && isNaN(r2Data[1])) {
                    lastData = r2Data;
                    source = ReportsAnnouncementHeaders.R2;
                }

                if (matchDate(r1Data[0], startDate, endDate) && isNaN(r1Data[1])) {
                    lastData = r1Data;
                    source = ReportsAnnouncementHeaders.R1;
                }
            }

            /* Don't make the Verbal Process for those who have no date into the 'Data Prez.' */
            if (lastData === undefined || source === undefined) {
                console.log('The fuck');
                continue;
            }

            const data: VerbalProcessData = {
                studentName: firstRow[ReportsAnnouncementHeaders.STUDENT_NAME],
                studentEmail: firstRow[ReportsAnnouncementHeaders.EMAIL],
                coordinatorName: coordinationFuncName[1],
                coordinatorFunction: coordinationFuncName[0],
                coordinatorEmail: firstRow[ReportsAnnouncementHeaders.COORDINATOR_EMAIL],
                presentationDate: lastData[0],
                attendanceYear: year,
                reportTitle: lastData[2],
                report: source,
                coordinators: [
                    {number: 1, coordinatorName: coordinationFuncName.join(' '), commission: 'Conducător ştiinţific'},
                    {number: 2, coordinatorName: firstRow[ReportsAnnouncementHeaders.COMMISSION], commission: 'Membru'},
                    {number: 3, coordinatorName: secondRow[ReportsAnnouncementHeaders.COMMISSION], commission: 'Membru'},
                    {number: 4, coordinatorName: thirdRow[ReportsAnnouncementHeaders.COMMISSION], commission: 'Membru'},
                ],
            }

            verbalProcessDataList.push(data);
        }

        return verbalProcessDataList;
    }

    /** In acest fisier sunt studentii care pot avea cont in aplicatie */
    static parseExistingStudents(file: UploadedFile): AllowedStudentModel[] {
        const baseInformationList: AllowedStudentModel[] = [];

        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        const sheetRows: any = XLSX.utils.sheet_to_json(sheet)

        for (const item of sheetRows) {
            const coordinatorName = UtilService.splitProfessorName(item[BaseInformationHeaders.COORDINATOR]);

            const data: AllowedStudentModel = AllowedStudentModel.fromObject({
                identifier: item[BaseInformationHeaders.IDENTIFIER],
                fullName: item[BaseInformationHeaders.NAME],
                coordinatorName: coordinatorName[1],
                coordinatorFunction: coordinatorName[0],
                attendanceYear: item[BaseInformationHeaders.ATTENDANCE_YEAR],
            });

            baseInformationList.push(data);
        }

        return baseInformationList;
    }

    /** Se parseaza fisierul cu activitatea profesorilor pe semestru. A nu se confunda cu orarul profesorilor. */
    static parseSemesterActivityTimetable(file: UploadedFile): SemesterTimetableData[] {
        const semesterTimetableList: SemesterTimetableData[] = [];

        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        const rows: any[] = XLSX.utils.sheet_to_json(sheet);
        const emailRowsMap = new Map<string, any[]>();

        for (let row of rows) {
            const email = row[SemesterTimetableHeaders.EMAIL];

            const emailRows = emailRowsMap.get(email);

            if (emailRows === undefined) {
                emailRowsMap.set(email, [row]);
                continue;
            }

            emailRows.push(row);
        }

        for (let [email, rows] of emailRowsMap.entries()) {
            const professorActivity: SemesterTimetableDataActivity[] = [];

            for (let row of rows) {
                const activity = row[SemesterTimetableHeaders.ACTIVITY];
                const weekHours = row[SemesterTimetableHeaders.WEEK_HOURS];

                professorActivity.push({
                    activity: activity,
                    weekHours: weekHours,
                })
            }

            const data: SemesterTimetableData = {
                emailTo: email,
                professorActivity: professorActivity,
            }

            semesterTimetableList.push(data);
        }

        return semesterTimetableList;
    }

    /** Se parseaza excelul cu coordonatori */
    static parseCoordinatorsExcel(file: UploadedFile): CoordinatorModel[] {
        const list: CoordinatorModel[] = [];

        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        for (let row of rows) {
            /* Name and the function */
            const fullName = UtilService.splitProfessorName(row[CoordinatorsHeaders.NAME_FUNCTION]);

            list.push(CoordinatorModel.fromObject({
                name: fullName[1],
                function: fullName[0],
                email: row[CoordinatorsHeaders.EMAIL],
                password: '' + row[CoordinatorsHeaders.CODE],
            }));
        }

        return list;
    }

}