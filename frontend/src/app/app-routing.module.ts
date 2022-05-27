import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/authentication/login/login.component";
import {SignupComponent} from "./components/authentication/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import {ReportsComponent} from "./components/reports/reports.component";
import {AdminComponent} from "./components/admin/admin.component";
import {UsersComponent} from "./components/admin/users/users.component";
import {SemesterActivityComponent} from "./components/admin/semester-activity/semester-activity.component";
import {ExportComponent} from "./components/admin/export/export.component";
import {
  ScientificArticleIsiComponent
} from "./components/reports/reports/scientific-article-isi/scientific-article-isi.component";
import {IsiProceedingsComponent} from "./components/reports/reports/isi-proceedings/isi-proceedings.component";
import {
  ScientificArticleBdiComponent
} from "./components/reports/reports/scientific-article-bdi/scientific-article-bdi.component";
import {ScientificBookComponent} from "./components/reports/reports/scientific-book/scientific-book.component";
import {TranslationComponent} from "./components/reports/reports/translation/translation.component";
import {
  ScientificCommunicationComponent
} from "./components/reports/reports/scientific-communication/scientific-communication.component";
import {PatentComponent} from "./components/reports/reports/patent/patent.component";
import {ResearchContractComponent} from "./components/reports/reports/research-contract/research-contract.component";
import {CitationComponent} from "./components/reports/reports/citation/citation.component";
import {AwardNominationComponent} from "./components/reports/reports/award-nomination/award-nomination.component";
import {AcademyMemberComponent} from "./components/reports/reports/academy-member/academy-member.component";
import {EditorialMemberComponent} from "./components/reports/reports/editorial-member/editorial-member.component";
import {OrganizedEventComponent} from "./components/reports/reports/organized-event/organized-event.component";
import {WithoutActivityComponent} from "./components/reports/reports/without-activity/without-activity.component";
import {DidacticActivityComponent} from "./components/reports/reports/didactic-activity/didactic-activity.component";
import {FazComponent} from "./components/admin/faz/faz.component";
import {UserComponent} from "./components/user/user.component";
import {VerbalProcessComponent} from "./components/admin/verbal-process/verbal-process.component";
import {ActivityNotificationComponent} from "./components/admin/activity-notification/activity-notification.component";
import {CoordinatorActivityComponent} from "./components/coordinator-activity/coordinator-activity.component";
import {CoordinatorStudentsComponent} from "./components/coordinator-students/coordinator-students.component";

const routes: Routes = [
  /** Unknown user */
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},

  /** User */
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'reports', component: ReportsComponent, children: [
      {path: '', component: ScientificArticleIsiComponent},
      {path: '1', component: ScientificArticleIsiComponent},
      {path: '2', component: IsiProceedingsComponent},
      {path: '3', component: ScientificArticleBdiComponent},
      {path: '4', component: ScientificBookComponent},
      {path: '5', component: TranslationComponent},
      {path: '6', component: ScientificCommunicationComponent},
      {path: '7', component: PatentComponent},
      {path: '8', component: ResearchContractComponent},
      {path: '9', component: CitationComponent},
      {path: '10', component: AwardNominationComponent},
      {path: '11', component: AcademyMemberComponent},
      {path: '12', component: EditorialMemberComponent},
      {path: '13', component: OrganizedEventComponent},
      {path: '14', component: WithoutActivityComponent},
      {path: '15', component: DidacticActivityComponent},
    ]},
  {path: 'user', component: UserComponent},

  /** Coordinator */
  {path: 'coordinator-activity', component: CoordinatorActivityComponent},
  {path: 'coordinator-students', component: CoordinatorStudentsComponent},

  /** Admin */
  {path: 'admin', component: AdminComponent, children: [
      {path: 'users', component: UsersComponent},
      {path: 'email', component: SemesterActivityComponent},
      {path: 'verbal-process', component: VerbalProcessComponent},
      {path: 'thesis-notification', component: ActivityNotificationComponent},
      {path: 'faz', component: FazComponent},
      {path: 'export', component: ExportComponent},
    ]},

  /** Not found */
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
