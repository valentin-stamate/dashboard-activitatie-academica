import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrganizedEvent, ReportsUtil} from "../../reports.util";
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../../../service/cookie.service";
import {RestEndpoints} from "../../../../models/rest.endpoints";
import {UIMessages, UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-organized-event',
  templateUrl: './organized-event.component.html',
  styleUrls: ['./organized-event.component.scss']
})
export class OrganizedEventComponent implements OnInit {
  manifestationType = ReportsUtil.ManifestationType;
  manifestationClassification = ReportsUtil.ManifestationClassification;

  @Input()
  form: OrganizedEvent = new OrganizedEvent();

  editMode = false;

  loading = false;
  responseMessage = '';

  @Input() readonly = false;
  @Input() updateEmitter!: EventEmitter<OrganizedEvent>;
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

  onUpdateEvent(item: OrganizedEvent) {
    this.editMode = true;
    this.form = item;
  }

  onCancel() {
    this.form = new OrganizedEvent();
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
          this.form = new OrganizedEvent();
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
        this.form = new OrganizedEvent();
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
