import { Component, OnInit } from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../service/cookie.service";
import {RestEndpoints} from "../../models/rest.endpoints";
import {Student} from "../../models/models";
import {
  AcademyMember,
  AwardAndNomination,
  Citation, DidacticActivity, EditorialMember,
  ISIProceeding, OrganizedEvent, Patent, ResearchContract,
  ScientificArticleBDI,
  ScientificArticleISI,
  ScientificBook, ScientificCommunication,
  Translation, WithoutActivity
} from "../reports/reports.util";

@Component({
  selector: 'app-coordinator-students',
  templateUrl: './coordinator-students.component.html',
  styleUrls: ['./coordinator-students.component.scss']
})
export class CoordinatorStudentsComponent implements OnInit {

  formsResponseMessage = '';

  form: any = new ScientificArticleISI();

  currentFormSelected = 0;
  selectedStudentId = 0;

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

  totalForms: number = 0;

  config: AxiosRequestConfig;

  coordinatorStudents: Student[] = [];

  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    this.config = {
      headers: {
        'Authorization': token,
      }
    };
  }

  ngOnInit(): void {
    this.onRefreshStudents();
  }

  onRefreshStudents() {
    axios.get(RestEndpoints.COORDINATOR_STUDENTS, this.config)
      .then(res => {
        this.coordinatorStudents = res.data as Student[];
      }).catch(err => {

      }).finally(() => {

      });
  }

  onGetStudentForms(studentIdentifier: string) {
    axios.get(`${RestEndpoints.COORDINATOR_STUDENT_FORMS}/${studentIdentifier}`, this.config)
      .then(res => {
        this.scArticlesISIList = res.data.scArticleISI;
        this.isiProceedingsList = res.data.isiProceedings;
        this.scArticleBDIList = res.data.scArticleBDI;
        this.scBookList = res.data.scBook;
        this.translationList = res.data.translation;
        this.scCommunicationList = res.data.scCommunication;
        this.patentList = res.data.patent;
        this.researchContractList = res.data.researchContract;
        this.citationList = res.data.citation;
        this.awardsNominationList = res.data.awardsNomination;
        this.academyMemberList = res.data.academyMember;
        this.editorialMemberList = res.data.editorialMember;
        this.organizedEventList = res.data.organizedEvent;
        this.withoutActivityList = res.data.withoutActivity;
        this.didacticActivityList = res.data.didacticActivity;

        if (res.data) {
          const entries = Object.entries(res.data);
          this.totalForms = entries.reduce((pre, curr) => pre + (curr[1] as [] || []).length, 0);
        }

      }).catch(err => {

      }).finally(() => {

    });
  }

  toDateStr(date: string | Date) {
    return new Date(date).toLocaleString('ro-RO');
  }

  onFormSelect(item: any, formType: number) {
    this.form = item;
    this.currentFormSelected = formType;
  }

  onStudentSelect(student: Student) {
    this.currentFormSelected = 0;
    this.selectedStudentId = student.id;

    this.onGetStudentForms(student.identifier);
  }

}
