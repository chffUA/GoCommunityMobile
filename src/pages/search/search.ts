import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { HomePage } from '../../pages/home/home';
import { ProjectPage } from '../../pages/project/project';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  id: any;
  user: any;
  query: string;
  error: string;
  results: any[];
  projectPage = ProjectPage;

  constructor(public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

    this.user = navParams.get("user");
    this.id = this.user.id;
    this.error = '';
    this.results = [];

  }

  ionViewWillEnter() {
    this.error = '';
  }


  visitProject(p: any) {
    this.nav.push(this.projectPage, {user: this.user, project: p});
  }

  search() {

    if (this.query==null || this.query==='') {
      this.error = "Please insert a search term.";
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "Retrieving information..."
    });

    loader.present();

    this.results = [];

    this.api.getSearch(this.query).then(
      data => {
        if (data) {
          this.results = data.list;
          this.error = '';
        }
        else this.error = 'Couldn\'t retrieve search results.';
      }
    );

    loader.dismiss();
  }

}
