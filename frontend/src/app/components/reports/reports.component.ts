import {Component, EventEmitter, OnInit} from '@angular/core';
import {
  AcademyMember,
  AwardAndNomination,
  Citation, DidacticActivity, EditorialMember,
  ISIProceeding, OrganizedEvent, Patent,
  ReportsUtil, ResearchContract,
  ScientificArticleBDI,
  ScientificArticleISI,
  ScientificBook, ScientificCommunication,
  Translation, WithoutActivity
} from "./reports.util";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../service/util.service";
import {Cookies, CookieService} from "../../service/cookie.service";
import axios, {AxiosRequestConfig} from "axios";
import {RestEndpoints} from "../../models/rest.endpoints";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reports = ReportsUtil.studentReports;
  config: AxiosRequestConfig;

  formsLoading = false;
  formsResponseMessage = '';

  currentSelected = 1;
  scArticlesISIList: ScientificArticleISI[] = [];
  isiProceedingsList: ISIProceeding[] = [];
  scArticleBDIList : ScientificArticleBDI[] = [];
  scBookList: ScientificBook[] = [];
  translationList: Translation[] = [];
  scCommunicationList: ScientificCommunication[] = [];
  patentList: Patent[] = [];
  researchContractList: ResearchContract[] = [];
  citationList: Citation[] = [];
  awardsNominationList: AwardAndNomination[] = [];
  academyMemberList: AcademyMember[] = [];
  editorialMemberList: EditorialMember[] = [];
  organizedEventList: OrganizedEvent[] = [];
  withoutActivityList: WithoutActivity[] = [];
  didacticActivityList: DidacticActivity[] = [];

  updateEmitter = new EventEmitter<any>();
  deleteEmitter = new EventEmitter<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const token = CookieService.readCookie(Cookies.AUTH);

    this.config = {
      headers: {
        'Authorization': token,
      }
    }
  }

  ngOnInit(): void {
    this.onFormsRefresh();
  }

  onSelectChange(event: Event, select: HTMLSelectElement) {
    event.preventDefault();
    const route = select.value;

    this.currentSelected = parseInt(route);
    this.router.navigate([route], {relativeTo: this.activatedRoute});
  }

  toDateStr(date: string | Date) {
    return new Date(date).toLocaleString('ro-RO');
  }

  onFormsRefresh() {
    this.formsLoading = true;
    this.formsResponseMessage = '';
    axios.get(RestEndpoints.FORMS, this.config)
      .then(res => {
        this.scArticlesISIList = res.data.scArticleISI.map((item: any) => {
          return {...item, loading: false};
        });
        this.isiProceedingsList = res.data.isiProceedings.map((item: any) => {
          return {...item, loading: false};
        });
        this.scArticleBDIList = res.data.scArticleBDI.map((item: any) => {
          return {...item, loading: false};
        });
        this.scBookList = res.data.scBook.map((item: any) => {
          return {...item, loading: false};
        });
        this.translationList = res.data.translation.map((item: any) => {
          return {...item, loading: false};
        });
        this.scCommunicationList = res.data.scCommunication.map((item: any) => {
          return {...item, loading: false};
        });
        this.patentList = res.data.patent.map((item: any) => {
          return {...item, loading: false};
        });
        this.researchContractList = res.data.researchContract.map((item: any) => {
          return {...item, loading: false};
        });
        this.citationList = res.data.citation.map((item: any) => {
          return {...item, loading: false};
        });
        this.awardsNominationList = res.data.awardsNomination.map((item: any) => {
          return {...item, loading: false};
        });
        this.academyMemberList = res.data.academyMember.map((item: any) => {
          return {...item, loading: false};
        });
        this.editorialMemberList = res.data.editorialMember.map((item: any) => {
          return {...item, loading: false};
        });
        this.organizedEventList = res.data.organizedEvent.map((item: any) => {
          return {...item, loading: false};
        });
        this.withoutActivityList = res.data.withoutActivity.map((item: any) => {
          return {...item, loading: false};
        });
        this.didacticActivityList = res.data.didacticActivity.map((item: any) => {
          return {...item, loading: false};
        });
      }).catch(err => {
        this.formsResponseMessage = err.response.data;
      }).finally(() => {
        this.formsLoading = false;
      });
  }

  /* Edit */
  onFormEdit(item: any, formCount: number) {
    /** The reason I put this into a promise with a sleep inside is to let the ui update first then
     * to notify the component that the user is updating */
    new Promise(async () => {
      this.currentSelected = formCount;
      this.router.navigate([formCount], {relativeTo: this.activatedRoute});

      /* Let the component load, then emit the update */
      await UtilService.sleep(300);
      this.updateEmitter.emit(item);
    });

  }

  /* Delete */
  onScArticleDelete(item: ScientificArticleISI) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.SCIENTIFIC_ARTICLE_ISI}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
        this.formsResponseMessage = err.response.data;
      }).finally(() => {
        item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
      });
  }

  onIsiProceedingsDelete(item: ISIProceeding) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.ISI_PROCEEDINGS}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onScArticleBDIDelete(item: ScientificArticleBDI) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.SCIENTIFIC_ARTICLE_BDI}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onScBookDelete(item: ScientificBook) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.SCIENTIFIC_BOOK}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onTranslationDelete(item: Translation) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.TRANSLATION}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onScCommunicationDelete(item: ScientificCommunication) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.SCIENTIFIC_COMMUNICATION}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onPatentDelete(item: Patent) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.PATENT}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onResearchContractDelete(item: ResearchContract) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.RESEARCH_CONTRACT}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onCitationDelete(item: Citation) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.CITATION}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onAwardsNominationDelete(item: AwardAndNomination) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.AWARD_AND_NOMINATION}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onAcademyMemberDelete(item: AcademyMember) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.ACADEMY_MEMBER}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onEditorialMemberDelete(item: EditorialMember) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.EDITORIAL_MEMBER}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onOrganizedEventDelete(item: OrganizedEvent) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.ORGANIZED_EVENT}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onWithoutActivityDelete(item: WithoutActivity) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.WITHOUT_ACTIVITY}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

  onDidacticActivityDelete(item: DidacticActivity) {
    item.loading = true;
    this.formsResponseMessage = '';

    axios.delete(`${RestEndpoints.DIDACTIC_ACTIVITY}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
      this.formsResponseMessage = err.response.data;
    }).finally(() => {
      item.loading = false;
      this.deleteEmitter.emit();
      this.onFormsRefresh();
    });
  }

}
