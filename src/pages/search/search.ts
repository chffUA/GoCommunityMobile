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
  query: string;
  results: any[];
  projectPage = ProjectPage;

  constructor(public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

    this.id = navParams.get("id");
    console.log(this.id);
    this.results = [];

  }

  visitProject(p: any) {
    this.nav.push(this.projectPage, {uid: this.id, project: p});
  }

  searchT() {

    let loader = this.loadingCtrl.create({
      content: "Retrieving information..."
    });
    //Show the loading indicator
    loader.present();

    this.results = [];

    let projs = [{endsOn:"2018-06-06",goal:1000.00,progress:245.78,name:"abcdt",description:"test",id:5,milestones:[],createdOn:"2018-04-24",comments:[]},
    {endsOn:"2018-06-06",goal:1000.00,progress:245.78,name:"test",description:"test",id:7,milestones:[],createdOn:"2018-05-23",comments:[]}];
  
    for (let i=0;i<projs.length;i++) {
      if (projs[i].name.includes(this.query)) {
        this.results.push(projs[i]);
      }
    }

    loader.dismiss();
  
  }

}
