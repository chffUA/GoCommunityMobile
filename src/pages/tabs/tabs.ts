import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { ProjectPage } from '../project/project';
import { HomePage } from '../home/home';

import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  id: any;

  tab1Root = HomePage;
  tab2Root = LoginPage;
  tab3Root = ProjectPage;

  constructor(navParams: NavParams) {
    this.id = {id: navParams.get("id")};
  }
}
