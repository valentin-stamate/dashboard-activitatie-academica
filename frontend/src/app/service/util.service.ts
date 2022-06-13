export class UtilService {

  static activeLink(route: string): boolean {
    const url: string = window.location.pathname;

    if (route === '/home') {
      return route === url || url === '/';
    }

    if (route === '/users') {
      return url.includes(route) || url === '/admin-users';
    }

    return url.includes(route);
  }

  static sleep(ms: number) {
    return new Promise(s => setTimeout(s, ms));
  }

  static stringDate(date: Date) {
    const d = date;
    return `${this.dateNumber(d.getDate())}.${this.dateNumber(d.getMonth() + 1)}.${d.getFullYear()} `
      + `${this.dateNumber(d.getHours())}:${this.dateNumber(d.getMinutes())}:${this.dateNumber(d.getSeconds())}`;
  }

  /* 6 -> 06 */
  private static dateNumber(number: number): string {
    if (number < 10) {
      return `0${number}`;
    }

    return '' + number;
  }

  static downloadBuffer(data: any, filename: string) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  }

  /* This function checks if all fields are filled with something */
  static checkFormFields(form: HTMLFormElement): boolean {
    const formObject = Object.fromEntries(new FormData(form));

    for (let [key, value] of Object.entries(formObject)) {
      if (value === '') {
        return false;
      }
    }

    return true;
  }

  static preRenderHtml(html: string): string {
    let keys = html.match(new RegExp(/{{.*?}}/g));

    if (!keys) {
      keys = [];
    }

    for (let key of keys) {
      html = html.replace(new RegExp(`${key}`, 'g'), `<span class="email-key">${key}</span>`);
    }

    return html.replace(/\n/g, '<br>');
  }

  static getFilenameFromInput(input: HTMLInputElement): string | undefined {
    const regex = new RegExp(/(\\|\/)/g);
    const filePath = input.value;

    return filePath.split(regex).pop();
  }

}

export enum UIMessages {
  FORM_CREATED = 'Formular creat cu succes',
  FORM_UPDATED = 'Formular editat cu succes',
  SUCCESS = 'Succes',
}
