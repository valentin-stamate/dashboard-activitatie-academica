export class UtilService {

    /* dateA < dateB = true */
    static compareDatesWithoutDay(dateA: Date, dateB: Date): boolean {
        if (dateA.getFullYear() < dateB.getFullYear()) {
            return true;
        }

        if (dateA.getFullYear() > dateB.getFullYear()) {
            return false;
        }

        return dateA.getMonth() < dateB.getMonth();
    }

    static generateRandomString(length: number = 64) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    static stringDate(date: Date) {
        const d = date;
        return `${this.dateNumber(d.getDate())}${this.dateNumber(d.getMonth() + 1)}${d.getFullYear()}_`
            + `${this.dateNumber(d.getHours())}${this.dateNumber(d.getMinutes())}${this.dateNumber(d.getSeconds())}`;
    }

    /* 20.02.2022 */
    static simpleStringDate(date: Date) {
        const d = date;
        return `${this.dateNumber(d.getDate())}.${this.dateNumber(d.getMonth() + 1)}.${d.getFullYear()}`;
    }

    /* 6 -> 06 */
    static dateNumber(number: number):string {
        if (number < 10) {
            return `0${number}`;
        }

        return `${number}`;
    }

    /* Eg: Conf. Prof. Lorem Ipsum -> [Conf. Prof, Lorem Ipsum] */
    static splitProfessorName(fullProfessorName: string) {
        fullProfessorName = fullProfessorName.toUpperCase();
        const lastPointIndex = fullProfessorName.lastIndexOf('.');

        if (lastPointIndex === -1) {
            return ['', fullProfessorName]
        }

        let professorFunction = fullProfessorName.slice(0, lastPointIndex);
        let professorName = fullProfessorName.slice(lastPointIndex + 1);

        if (professorFunction !== '') {
            professorFunction = professorFunction.split('.').join('. ');
            professorFunction += '.';
        }

        return [professorFunction.replace(/ +/g, ' ').trim(), professorName.replace(/ +/g, ' ').trim()];
    }

    /* Eg: CONF. UNIV. PROF, LOREM-IPSUM DOLOR -> Conf. univ. prof. Lorem-Ipsum Dolor */
    static joinProfessorName(rawProfessorName: string, rawProfessorFunction: string) {
        return `${this.capitalizeFirst(rawProfessorName)} ${rawProfessorFunction.split('-').map(item => this.capitalizeAllWords(item)).join('-')}`;
    }

    static daysInMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    static async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static capitalizeFirst(text: string) {
        return text.charAt(1).toUpperCase() + text.slice(1);
    }

    static capitalizeAllWords(text: string) {
        return text.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    }

}