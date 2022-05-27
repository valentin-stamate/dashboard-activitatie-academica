import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportsUtil, ScientificCommunication} from "../../reports.util";
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../../../service/cookie.service";
import {RestEndpoints} from "../../../../models/rest.endpoints";
import {UIMessages, UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-scientific-communication',
  templateUrl: './scientific-communication.component.html',
  styleUrls: ['./scientific-communication.component.scss']
})
export class ScientificCommunicationComponent implements OnInit {
  communicationType = ReportsUtil.CommunicationType;
  manifestationType = ReportsUtil.NationalInternationalFem;

  @Input()
  form: ScientificCommunication = new ScientificCommunication();

  editMode = false;

  loading = false;
  responseMessage = '';

  @Input() readonly = false;
  @Input() updateEmitter!: EventEmitter<ScientificCommunication>;
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

  onUpdateEvent(item: ScientificCommunication) {
    this.editMode = true;
    this.form = item;
  }

  onCancel() {
    this.form = new ScientificCommunication();
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
      axios.patch(`${RestEndpoints.SCIENTIFIC_COMMUNICATION}/${this.form.id}`, this.form, this.config)
        .then(res => {
          this.form = new ScientificCommunication();
          this.responseMessage = UIMessages.FORM_UPDATED;
        }).catch(err => {
        this.responseMessage = err.reponse.data;
      }).finally(() => {
        this.loading = false;

        this.refreshEmitter.emit();
      });
      return;
    }

    axios.post(RestEndpoints.SCIENTIFIC_COMMUNICATION, this.form, this.config)
      .then(res => {
        this.form = new ScientificCommunication();
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
