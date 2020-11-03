import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbUserModule,
  NbIconModule,
  NbActionsModule,
  NbSpinnerModule,
  NbContextMenuModule,
  NbMenuModule,
  NbListModule,
  NbCheckboxModule,
  NbToastrModule,
  NbTooltipModule,
  NbRouteTabsetModule,
  NbBadgeModule,
  NbProgressBarModule,
  NbSidebarModule,
  NbSelectModule,
  NbSearchModule,
  NbSidebarService,
  NbMenuService,
  NbDialogModule,
  NbStepperModule 
} from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { MainComponent } from './container/main/main.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './container/footer/footer.component';
import { HeaderComponent } from './container/header/header.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogUpdateComponent } from './container/main/dialogs/dialog-update/dialog-update.component';
import { ErrorInterceptor } from './services/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ContainerComponent,
    FooterComponent,
    HeaderComponent,
    DialogUpdateComponent,
  ],
  imports: [
    NbStepperModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbUserModule,
    NbIconModule,
    NbActionsModule,
    NbSpinnerModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbListModule,
    NbCheckboxModule,
    NbToastrModule.forRoot(),
    NbTooltipModule,
    NbRouteTabsetModule,
    NbBadgeModule,
    NbProgressBarModule,
    NbSidebarModule,
    NbSelectModule,
    NbSearchModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'CSRF-Token',
    }),
    Ng2SmartTableModule,
    NbDialogModule.forRoot()
  ],
  providers: [NbSidebarService, NbMenuService,
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
