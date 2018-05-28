import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { ProjectPage } from '../project/project';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';

import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular';
import { ProjectFormPage } from '../projectForm/projectForm';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  user: any;

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = ProjectFormPage;
  tab4Root = LoginPage;

  constructor(navParams: NavParams) {
    this.user = {user: navParams.get("user")};
  }
}
