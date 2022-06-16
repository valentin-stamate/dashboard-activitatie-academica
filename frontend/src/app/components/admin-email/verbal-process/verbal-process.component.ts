import { Component, OnInit } from '@angular/core';
import {EmailEndpointResponse, EmailPreview, EmailResponse} from "../../../models/models";
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../../service/cookie.service";
import {UtilService} from "../../../service/util.service";
import {EmailTemplates} from "../email.templates";
import {RestEndpoints} from "../../../models/rest.endpoints";

@Component({
  selector: 'app-verbal-process',
  templateUrl: './verbal-process.component.html',
  styleUrls: ['./verbal-process.component.scss']
})
export class VerbalProcessComponent implements OnInit {
  notificationMessage = '';
  modal = false;
  modalData: EmailResponse[] = [];
  fileStructureModal = false;

  organizationEmailLoading = false;
  organizationEmailFinish = false;

  previewModalData: EmailPreview[] = [];
  previewModal = false;
  previewEmailLoading = false;

  emailFrom = EmailTemplates.FROM;
  emailSubject = EmailTemplates.VERBAL_PROCESS_SUBJECT;
  emailTemplate = EmailTemplates.VERBAL_PROCESS_TEMPLATE;

  filename = '';

  config: AxiosRequestConfig;

  emailToList: string[] = [];

  startMonth: number = 0;
  endMonth: number = 0;
  startYear: number = 2022;
  endYear: number = 2022;

  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    this.config = {
      headers: {
        'Authorization': token,
      }
    };
  }

  ngOnInit(): void { }

  onDeleteEmail(email: string) {
    this.emailToList = this.emailToList.filter(item => item !== email);
  }

  preRenderHtml(html: string) {
    return UtilService.preRenderHtml(html);
  }

  onExtractEmails(event: Event, form: HTMLFormElement, template: HTMLTextAreaElement, preview: HTMLDivElement) {
    event.preventDefault();

    event.preventDefault();

    const formData = new FormData(form);
    formData.set('emailTemplate', preview.innerHTML.replace(new RegExp('email-key', 'g'), ''));
    formData.set('send', 'false');
    formData.set('getEmails', 'true');
    formData.set('emailTo', this.emailToList.join(','));

    const startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(this.startMonth);
    startDate.setFullYear(this.startYear);

    const endDate = new Date();
    endDate.setDate(1);
    endDate.setMonth(this.endMonth);
    endDate.setFullYear(this.endYear);

    formData.set('startDate', `${startDate.getTime()}`);
    formData.set('endDate', `${endDate.getTime()}`);

    axios.post(RestEndpoints.VERBAL_PROCESS, formData, this.config)
      .then(res => {
        this.emailToList = res.data;
      }).catch(err => {
        console.log(err.response.data);

        if (typeof err.response.data === typeof '') {
          this.notificationMessage = err.response.data;
        } else {
          this.notificationMessage = 'Fișier invalid';
        }
      }).finally(() => {

      });

  }

  onSubmit(event: Event, form: HTMLFormElement, template: HTMLTextAreaElement, preview: HTMLDivElement) {
    event.preventDefault();

    const formData = new FormData(form);
    formData.set('emailTemplate', preview.innerHTML.replace(new RegExp('email-key', 'g'), ''));
    formData.set('send', 'true');
    formData.set('getEmails', 'false');
    formData.set('emailTo', this.emailToList.join(','));

    const startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(this.startMonth);
    startDate.setFullYear(this.startYear);

    const endDate = new Date();
    endDate.setDate(1);
    endDate.setMonth(this.endMonth);
    endDate.setFullYear(this.endYear);

    formData.set('startDate', `${startDate.getTime()}`);
    formData.set('endDate', `${endDate.getTime()}`);

    this.organizationEmailLoading = true;
    this.organizationEmailFinish = false;
    this.modalData = [];
    axios.post(RestEndpoints.VERBAL_PROCESS, formData, this.config)
      .then(res => {
        const data = res.data as EmailEndpointResponse;

        this.modalData = data.successfulEmails;
        this.organizationEmailFinish = true;
      }).catch(err => {
        console.log(err);
        this.notificationMessage = err.response.data;
      }).finally(() => {
        this.organizationEmailLoading = false;
      });

  }

  onPreviewEmail(event: Event, form: HTMLFormElement, template: HTMLTextAreaElement, preview: HTMLDivElement) {
    event.preventDefault();

    const formData = new FormData(form);
    formData.set('emailTemplate', preview.innerHTML.replace(new RegExp('email-key', 'g'), ''));
    formData.set('send', 'false');
    formData.set('getEmails', 'false');
    formData.set('emailTo', this.emailToList.join(','));

    const startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(this.startMonth);
    startDate.setFullYear(this.startYear);

    const endDate = new Date();
    endDate.setDate(1);
    endDate.setMonth(this.endMonth);
    endDate.setFullYear(this.endYear);

    formData.set('startDate', `${startDate.getTime()}`);
    formData.set('endDate', `${endDate.getTime()}`);

    this.previewEmailLoading = true;

    axios.post(RestEndpoints.VERBAL_PROCESS, formData, this.config)
      .then(res => {
        const data = res.data as EmailEndpointResponse;

        this.previewModalData = data.emailPreview;
        this.previewModal = true;
      }).catch(err => {
        console.log(err);
        this.notificationMessage = err.response.data;
      }).finally(() => {
        this.previewEmailLoading = false;
      });
  }

  onCloseNotification() {
    this.notificationMessage = '';
  }

  onCloseModal() {
    this.modal = false;
    this.previewModal = false;
    this.fileStructureModal = false;
  }

  onOpenModal() {
    this.modal = true;
  }

  onFileInputChange(input: HTMLInputElement) {
    const filename = UtilService.getFilenameFromInput(input);

    if (filename) {
      this.filename = filename;
    }
  }

  onOpenFileStructureModal() {
    this.fileStructureModal = true;
  }

}
