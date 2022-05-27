import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportsUtil, ResearchContract} from "../../reports.util";
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../../../service/cookie.service";
import {RestEndpoints} from "../../../../models/rest.endpoints";
import {UIMessages, UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-research-contract',
  templateUrl: './research-contract.component.html',
  styleUrls: ['./research-contract.component.scss']
})
export class ResearchContractComponent implements OnInit {
  contractType = ReportsUtil.NationalInternationalMasc;

  @Input()
  form: ResearchContract = new ResearchContract();

  editMode = false;

  loading = false;
  responseMessage = '';

  @Input() readonly = false;
  @Input() updateEmitter!: EventEmitter<ResearchContract>;
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

  onUpdateEvent(item: ResearchContract) {
    this.editMode = true;
    this.form = item;
  }

  onCancel() {
    this.form = new ResearchContract();
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
      axios.patch(`${RestEndpoints.RESEARCH_CONTRACT}/${this.form.id}`, this.form, this.config)
        .then(res => {
          this.form = new ResearchContract();
          this.responseMessage = UIMessages.FORM_UPDATED;
        }).catch(err => {
        this.responseMessage = err.reponse.data;
      }).finally(() => {
        this.loading = false;

        this.refreshEmitter.emit();
      });
      return;
    }

    axios.post(RestEndpoints.RESEARCH_CONTRACT, this.form, this.config)
      .then(res => {
        this.form = new ResearchContract();
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
