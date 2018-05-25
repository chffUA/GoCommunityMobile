import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { ProjectPage } from '../project/project';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';

import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  id: any;

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = LoginPage;

  constructor(navParams: NavParams) {
    this.id = {id: navParams.get("id")};
  }
}
