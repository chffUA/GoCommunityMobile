import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { ProjectPage } from '../pages/project/project';
import { SearchPage } from '../pages/search/search';
import { AccountFormPage } from '../pages/accountForm/accountForm';
import { ProjectFormPage } from '../pages/projectForm/projectForm';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Api } from '../providers/api';
import { HttpModule } from '@angular/http';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ProjectPage,
    AccountFormPage,
    ProjectFormPage,
    ProgressBarComponent,
    SearchPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ProjectPage,
    AccountFormPage,
    SearchPage,
    ProjectFormPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api
  ]
})
export class AppModule {}
