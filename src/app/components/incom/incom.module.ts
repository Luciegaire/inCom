import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomComponent } from './incom.component';
import { MenuComponent } from './menu/menu.component'
import {IncomRoutingModule} from './incom-routing.module'
import { PostEditorComponent } from './feed/post-editor/post-editor.component';
import { ProfileCompanyProfileComponent } from './profile/profile-company/profile-company-profile/profile-company-profile.component';
import { ProfileCompanyOffersComponent } from './profile/profile-company/profile-company-offers/profile-company-offers.component';
import { ProfileCompanyAccountsComponent } from './profile/profile-company/profile-company-accounts/profile-company-accounts.component';
import { ProfileCandidateComponent } from './profile/profile-candidate/profile-candidate.component';
import { ProfileCompanyComponent } from './profile/profile-company/profile-company.component';
import { CompanyComponent } from './companies-list/company/company.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './feed/post/post.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { GenerateCvComponent } from './profile/generate-cv/generate-cv.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ProfileInformationsComponent } from './profile/profile-informations/profile-informations.component';
import { ProfilePasswordComponent } from './profile/profile-password/profile-password.component';
import { FeedComponent } from './feed/feed.component';
import {HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { CommentComponent } from './feed/comment/comment.component';
import { ProfileCompanyAccountCreationComponent } from './profile/profile-company/profile-company-account-creation/profile-company-account-creation.component';
import { ProfileCompanyOffersCreationComponent } from './profile/profile-company/profile-company-offers-creation/profile-company-offers-creation.component';
import { ProfileCompanyProfilePersoComponent } from './profile/profile-company/profile-company-profile-perso/profile-company-profile-perso.component';
import { ProfileCompanyOffersEditComponent } from './profile/profile-company/profile-company-offers-edit/profile-company-offers-edit.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { CompanyPageComponent } from './company-page/company-page.component';
import { OfferComponent } from './offers-list/offer/offer.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../../../environments/environment";
import { ProfileOffersComponent } from './profile/profile-offers/profile-offers.component';
import { ProfileCompanyApplyComponent } from './profile/profile-company/profile-company-apply/profile-company-apply.component';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    IncomComponent,
    MenuComponent,
    ProfileComponent,
    FeedComponent,
    PostComponent,
    CompaniesListComponent,
    GenerateCvComponent,
    OffersListComponent,
    ProfileCompanyComponent,
    ProfileCandidateComponent,
    CompanyComponent,
    MenuComponent,
    PostEditorComponent,
    ProfileCompanyProfileComponent,
    ProfileCompanyOffersComponent,
    ProfileCompanyAccountsComponent,
    ProfilePasswordComponent,
    ProfileInformationsComponent,
    ProfilePageComponent,
    CreateOfferComponent,
    CommentComponent,
    ProfileCompanyAccountCreationComponent,
    ProfileCompanyOffersCreationComponent,
    ProfileCompanyProfilePersoComponent,
    ProfileCompanyOffersEditComponent,
    CompanyPageComponent,
    OfferComponent,
    ProfileOffersComponent,
    ProfileCompanyApplyComponent
  ],
  imports: [
    CommonModule,
    IncomRoutingModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LottieModule.forRoot({player: playerFactory}),
    FormsModule,
    NgbDatepickerModule,
    NgxQRCodeModule,
    LottieModule.forRoot({ player: playerFactory }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
  ]
})
export class IncomModule { }
