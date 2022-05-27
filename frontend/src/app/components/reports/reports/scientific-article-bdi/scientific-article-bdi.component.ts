import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportsUtil, ScientificArticleBDI} from "../../reports.util";
import axios, {AxiosRequestConfig} from "axios";
import {RestEndpoints} from "../../../../models/rest.endpoints";
import {Cookies, CookieService} from "../../../../service/cookie.service";
import {UIMessages, UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-scientific-article-bdi',
  templateUrl: './scientific-article-bdi.component.html',
  styleUrls: ['./scientific-article-bdi.component.scss']
})
export class ScientificArticleBdiComponent implements OnInit {
  hierarchyDomains = ReportsUtil.HierarchyDomains;
  international = ReportsUtil.YesNo;
  cnadtcuClassification = ReportsUtil.CnatdcuClassification;
  bdiDatabases = ReportsUtil.BDIDatabases;

  @Input()
  form: ScientificArticleBDI = new ScientificArticleBDI();

  editMode = false;

  loading = false;
  responseMessage = '';

  @Input() readonly = false;
  @Input() updateEmitter!: EventEmitter<ScientificArticleBDI>;
  @Input() deleteEmitter!: EventEmitter<void>;
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

  onUpdateEvent(item: ScientificArticleBDI) {
    this.editMode = true;
    this.form = item;
  }

  onCancel() {
    this.form = new ScientificArticleBDI();
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
      axios.patch(`${RestEndpoints.SCIENTIFIC_ARTICLE_BDI}/${this.form.id}`, this.form, this.config)
        .then(res => {
          this.form = new ScientificArticleBDI();
          this.responseMessage = UIMessages.FORM_UPDATED;
        }).catch(err => {
        this.responseMessage = err.reponse.data;
      }).finally(() => {
        this.loading = false;

        this.refreshEmitter.emit();
      });
      return;
    }

    axios.post(RestEndpoints.SCIENTIFIC_ARTICLE_BDI, this.form, this.config)
      .then(res => {
        this.form = new ScientificArticleBDI();
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
