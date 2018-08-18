import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// 3rd party imports
import { CustomFormsModule } from 'ng2-validation'

// Angular Material Imports
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatComponentsModule } from './modules/mat-components.module';

// Image upload import
import { FileService } from './services/file.service';
import { FileUploadComponent } from './file-upload/file-upload.component';

// Components imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { IdentityComponent } from './identity/identity.component';
import { AdmissionComponent } from './admission/admission.component';
import { PostsComponent } from './posts/posts.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CareersComponent } from './careers/careers.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { NewsComponent } from './news/news.component';
import { FooterComponent } from './footer/footer.component';

// Authorization & Authentications imports
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin-guard';

// Protected Routes
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { UserProfileComponent } from './admin/users/user-profile/user-profile.component';
import { NoAccessComponent } from './no-access/no-access.component';

// Services Imports
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// ThirdParty Directives
import { SwitchControlComponent } from './switch-control/switch-control.component';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    IdentityComponent,
    AdmissionComponent,
    PostsComponent,
    DepartmentsComponent,
    CareersComponent,
    HomeComponent,
    EventsComponent,
    NewsComponent,
    FooterComponent,
    AdminComponent,
    NoAccessComponent,
    UserFormComponent,
    SwitchControlComponent,
    FileUploadComponent,
    UsersComponent,
    UserProfileComponent
  ],
  imports: [
    ShareButtonsModule.forRoot(),
    BrowserAnimationsModule,
    MatComponentsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'identidad', component: IdentityComponent },
      { path: 'admisiones', component: AdmissionComponent },
      { path: 'eventos', component: EventsComponent },
      { path: 'publicaciones', component: NewsComponent },
      { path: 'carreras', component: CareersComponent },
      { path: 'departamentos', component: DepartmentsComponent },
      { path: 'login', component: LoginComponent },

      { path: 'admin/usuarios/nuevo', component: UserFormComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'admin/usuarios', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'admin/perfil/:userId', component: UserProfileComponent, canActivate: [AuthGuard]},
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      { path: 'no-access', component: NoAccessComponent}
    ])
  ],
  entryComponents: [
    UserFormComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    UsersService,
    FileService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
