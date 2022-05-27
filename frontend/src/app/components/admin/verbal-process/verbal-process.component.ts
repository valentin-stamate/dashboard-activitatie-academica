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

  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    this.config = {
      headers: {
        'Authorization': token,
      }
    };
  }

  ngOnInit(): void { }

  preRenderHtml(html: string) {
    return UtilService.preRenderHtml(html);
  }

  onSubmit(event: Event, form: HTMLFormElement, template: HTMLTextAreaElement, preview: HTMLDivElement) {
    event.preventDefault();

    const formData = new FormData(form);
    formData.set('send', `${true}`);
    formData.set('emailTemplate', preview.innerHTML.replace(new RegExp('email-key', 'g'), ''));

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
    formData.set('send', `${false}`);
    formData.set('emailTemplate', preview.innerHTML.replace(new RegExp('email-key', 'g'), ''));

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
