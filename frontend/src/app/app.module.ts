import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdminUsers } from './components/admin-users/admin-users.component';
import { UsersComponent } from './components/admin-users/users/users.component';
import { SemesterActivityComponent } from './components/admin-email/semester-activity/semester-activity.component';
import { ExportComponent } from './components/admin-files/export/export.component';
import { FormsModule } from "@angular/forms";
import { ScientificArticleIsiComponent } from './components/reports/reports/scientific-article-isi/scientific-article-isi.component';
import { IsiProceedingsComponent } from './components/reports/reports/isi-proceedings/isi-proceedings.component';
import { ScientificArticleBdiComponent } from './components/reports/reports/scientific-article-bdi/scientific-article-bdi.component';
import { ScientificBookComponent } from './components/reports/reports/scientific-book/scientific-book.component';
import { TranslationComponent } from './components/reports/reports/translation/translation.component';
import { ScientificCommunicationComponent } from './components/reports/reports/scientific-communication/scientific-communication.component';
import { PatentComponent } from './components/reports/reports/patent/patent.component';
import { ResearchContractComponent } from './components/reports/reports/research-contract/research-contract.component';
import { CitationComponent } from './components/reports/reports/citation/citation.component';
import { AwardNominationComponent } from './components/reports/reports/award-nomination/award-nomination.component';
import { AcademyMemberComponent } from './components/reports/reports/academy-member/academy-member.component';
import { EditorialMemberComponent } from './components/reports/reports/editorial-member/editorial-member.component';
import { OrganizedEventComponent } from './components/reports/reports/organized-event/organized-event.component';
import { WithoutActivityComponent } from './components/reports/reports/without-activity/without-activity.component';
import { DidacticActivityComponent } from './components/reports/reports/didactic-activity/didactic-activity.component';
import { FazComponent } from './components/admin-files/faz/faz.component';
import { UserComponent } from './components/user/user.component';
import { VerbalProcessComponent } from './components/admin-email/verbal-process/verbal-process.component';
import { ActivityNotificationComponent } from './components/admin-email/activity-notification/activity-notification.component';
import { CoordinatorActivityComponent } from './components/coordinator-activity/coordinator-activity.component';
import { CoordinatorStudentsComponent } from './components/coordinator-students/coordinator-students.component';
import { NoReportComponent } from './components/reports/reports/no-report/no-report.component';
import { CoordinatorsComponent } from './components/admin-users/coordinators/coordinators.component';
import { AdminEmailComponent } from './components/admin-email/admin-email.component';
import { AdminFilesComponent } from './components/admin-files/admin-files.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    ReportsComponent,
    AdminUsers,
    UsersComponent,
    SemesterActivityComponent,
    ExportComponent,
    ScientificArticleIsiComponent,
    IsiProceedingsComponent,
    ScientificArticleBdiComponent,
    ScientificBookComponent,
    TranslationComponent,
    ScientificCommunicationComponent,
    PatentComponent,
    ResearchContractComponent,
    CitationComponent,
    AwardNominationComponent,
    AcademyMemberComponent,
    EditorialMemberComponent,
    OrganizedEventComponent,
    WithoutActivityComponent,
    DidacticActivityComponent,
    FazComponent,
    UserComponent,
    VerbalProcessComponent,
    ActivityNotificationComponent,
    CoordinatorActivityComponent,
    CoordinatorStudentsComponent,
    NoReportComponent,
    CoordinatorsComponent,
    AdminEmailComponent,
    AdminFilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
