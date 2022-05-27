import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportsUtil, ScientificArticleISI} from "../../reports.util";
import axios, {AxiosRequestConfig} from "axios";
import {RestEndpoints} from "../../../../models/rest.endpoints";
import {Cookies, CookieService} from "../../../../service/cookie.service";
import {UIMessages, UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-scientific-article-isi',
  templateUrl: './scientific-article-isi.component.html',
  styleUrls: ['./scientific-article-isi.component.scss']
})
export class ScientificArticleIsiComponent implements OnInit {
  cnadtcuClassification = ReportsUtil.CnatdcuClassification;

  @Input()
  form: ScientificArticleISI = new ScientificArticleISI();

  editMode = false;

  loading = false;
  responseMessage = '';

  @Input() readonly = false;
  @Input() updateEmitter: EventEmitter<ScientificArticleISI> = new EventEmitter();
  @Input() deleteEmitter: EventEmitter<void> = new EventEmitter();
  @Output() refreshEmitter = new EventEmitter();

  config: AxiosRequestConfig;
  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    this.config = {
      headers: {
        'Authorization': token,
      }
    };
  }

  ngOnInit(): void {
    if (this.readonly) {
      return;
    }

    this.updateEmitter.subscribe((data) => {
      this.onUpdateEvent(data);
    });

    this.deleteEmitter.subscribe(() => {
      this.editMode = false;
    });
  }

  onUpdateEvent(item: ScientificArticleISI) {
    this.editMode = true;
    this.form = item;
  }

  onCancel() {
    this.form = new ScientificArticleISI();
    this.editMode = false;
  }

  getDate(input: HTMLInputElement): Date {
    return input.valueAsDate ? input.valueAsDate : new Date();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.loading = true;
    this.responseMessage = '';

    if (this.editMode) {
      axios.patch(`${RestEndpoints.SCIENTIFIC_ARTICLE_ISI}/${this.form.id}`, this.form, this.config)
        .then(res => {
          this.form = new ScientificArticleISI();
          this.responseMessage = UIMessages.FORM_UPDATED;
        }).catch(err => {
          this.responseMessage = err.reponse.data;
      }).finally(() => {
          this.loading = false;

          this.refreshEmitter.emit();
      });
      return;
    }

    axios.post(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, this.form, this.config)
      .then(res => {
        this.form = new ScientificArticleISI();
        this.responseMessage = UIMessages.FORM_CREATED;
      }).catch(err => {
        this.responseMessage = err.reponse.data;
      }).finally(() => {
        this.loading = false;
        this.refreshEmitter.emit();
      });
    return;
  }

  checkForm(form: HTMLFormElement) {
    return UtilService.checkFormFields(form);
  }

}
